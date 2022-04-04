import axios from "axios";
import React, { useEffect, useState } from "react";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { get_cart_items } from "../Redux/cart/actions";

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

  const addToCart = (id) => {
    axios
      .post(`/item`, {
        cart: JSON.parse(localStorage.getItem("cart")),
        product: id,
      })
      .then(() => {
        alert("added to cart");
        axios
          .get(`/item?cart=${JSON.parse(localStorage.getItem("cart"))}`)
          .then((data) => dispatch(get_cart_items(data.data)));
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
        <>
          <button disabled>Added To Cart</button>
        </>
      ) : (
        <>
          <button onClick={() => addToCart(product._id)}>Add To Cart</button>
        </>
      )}
    </div>
  );
};

export default Product;
