import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Products from "./Products";
import { get_cart_items } from "../Redux/cart/actions";
import { Container } from "@mui/material";

const Home = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const getAllProducts = () => {
    axios
      .get("/user/product/all")
      .then((data) => {
        setProducts(data.data);
        axios
          .get(`/item?cart=${JSON.parse(localStorage.getItem("cart"))}`)
          .then((data) => {
            sessionStorage.setItem("items", JSON.stringify(data.data));
            dispatch(get_cart_items(data.data));
          });
      })
      .catch((err) => alert(err.message));
  };

  useLayoutEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Container className="home">
      <Products products={products} />
    </Container>
  );
};

export default Home;
