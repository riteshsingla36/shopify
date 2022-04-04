import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import "./products.css";
import { get_cart_items } from "../Redux/cart/actions";

const Products = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const getAllProducts = () => {
    axios
      .get("/user/product/all")
      .then((data) => {
        setProducts(data.data);
        axios
          .get(`/item?cart=${JSON.parse(localStorage.getItem("cart"))}`)
          .then((data) => dispatch(get_cart_items(data.data)));
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container className="cont" maxWidth="lg" fixed>
      <div className="all-products">
        {products.map((product) => {
          return <Product product={product} key={product._id} />;
        })}
      </div>
    </Container>
  );
};

export default Products;
