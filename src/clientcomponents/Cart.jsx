import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_cart_items } from "../Redux/cart/actions";

const Cart = () => {
  const cartItems = useSelector((store) => store.cartReducer.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/item?cart=${JSON.parse(localStorage.getItem("cart"))}`)
      .then((data) => dispatch(get_cart_items(data.data)));
  }, []);
  return (
    <div>
      {cartItems.map((item) => {
        return <p>{item.product.name}</p>;
      })}
    </div>
  );
};

export default Cart;
