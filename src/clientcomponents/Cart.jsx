import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_cart_items } from "../Redux/cart/actions";

const Cart = () => {
  const cartItems = useSelector((store) => store.cartReducer.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var [total, setTotal] = useState(0);
  useEffect(() => {
    getallItems();
  }, []);

  function calculate(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i].quantity * arr[i].product.price;
    }
    setTotal(sum);
  }

  function getallItems() {
    axios
      .get(`/item?cart=${JSON.parse(localStorage.getItem("cart"))}`)
      .then((data) => {
        dispatch(get_cart_items(data.data));
        calculate(data.data);
      });
  }

  function updateQty(id, qty) {
    if (qty === 0) {
      axios
        .delete(`/item/${id}`)
        .then(() => getallItems())
        .catch((err) => alert(err.message));
    } else {
      axios
        .patch(`/item/${id}`, { quantity: qty }, { new: true })
        .then(() => getallItems())
        .catch((err) => alert(err.message));
    }
  }

  return (
    <div>
      <table border="1" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Change Qty.</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.product.image}
                    alt=""
                    width={"100"}
                    height={"100"}
                  />
                </td>
                <td>
                  <span>{item.product.name}</span>
                </td>
                <td>
                  <span>{item.quantity}</span>
                </td>
                <td>
                  <button
                    onClick={() => updateQty(item._id, item.quantity + 1)}
                  >
                    Inc
                  </button>
                  <button
                    onClick={() => updateQty(item._id, item.quantity - 1)}
                  >
                    Dec
                  </button>
                </td>
                <td>
                  <span>{item.product.price}</span>
                </td>
                <td>
                  <span>{item.quantity * item.product.price}</span>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="5">Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={() => {
          navigate("/address");
          sessionStorage.setItem("total", JSON.stringify(total));
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
