import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const get_orders = () => {
    axios
      .get(
        `/cart?user=${
          JSON.parse(localStorage.getItem("user"))._id
        }&active=false`,
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then((data) => {
        setOrders(data.data);
      })
      .catch((err) => alert(err));
  };

  useLayoutEffect(() => {
    // console.log("layout useEffect");
    get_orders();
  }, []);
  return (
    <div className="user-orders">
      <h1>Orders</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Order_id</th>
            <th>Placed Date</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td>{order.razorpay.orderId.split("_")[1]}</td>
                <td>{order.updatedAt.split("T")[0]}</td>
                <td>{order.total}</td>
                <td>
                  <button onClick={() => navigate(`/order/${order._id}`)}>
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
