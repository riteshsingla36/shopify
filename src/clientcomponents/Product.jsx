import axios from "axios";
import React, { useEffect, useState } from "react";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { get_cart_items } from "../Redux/cart/actions";
import DeleteIcon from "@mui/icons-material/Delete";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cartReducer.cartItems);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    var items = cartItems.find((item) => item.product._id === product._id);
    if (items) {
      setCheck(true);
    }
  }, [cartItems]);

  function getallItems() {
    axios
      .get(`/item?cart=${JSON.parse(localStorage.getItem("cart"))}`)
      .then((data) => {
        sessionStorage.setItem("items", JSON.stringify(data.data));
        dispatch(get_cart_items(data.data));
      });
  }

  const addToCart = (id) => {
    axios
      .post(`/item`, {
        cart: JSON.parse(localStorage.getItem("cart")),
        product: id,
      })
      .then(() => {
        getallItems();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="single-product">
      <img src={product.image} alt="product images" />
      <h4>{product.name}</h4>
      <p>Brand: {product.brand}</p>
      <span>Rs. {product.price}</span>
      <br />
      {check ? (
        <span className="btns">
          <button disabled>Added To Cart</button>
          
        </span>
      ) : (
        <span className="btns">
          <button onClick={() => addToCart(product._id)}>Add To Cart</button>
        </span>
      )}
    </div>
  );
};

export default Product;
