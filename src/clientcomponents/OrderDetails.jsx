import { Container } from "@mui/material";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./orderdetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({});

  const get_order = () => {
    axios
      .get(`/cart/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((data) => {
        setProducts(data.data.products);
        setTotal(data.data.total);
        setAddress(data.data.address);
      });
  };
  useLayoutEffect(() => {
    get_order();
  }, []);
  return (
    <Container>
      <h1>OrderDetails</h1>

      <div className="user-order-details-inner">
        <table border="1">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => {
              return (
                <tr key={prod._id}>
                  <td>
                    <img
                      src={prod.product.image}
                      alt=""
                      width={"50"}
                      height={"50"}
                    />
                  </td>
                  <td>{prod.product.name}</td>
                  <td>{prod.quantity}</td>
                  <td>{prod.product.price}</td>
                  <td>{prod.quantity * prod.product.price}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={"4"}>Total: </td>
              <td>
                <b>Rs.</b> {total}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            border: "1px solid silver",
            width: "fit-content",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>Delivered To: {address.name}</h3>
          <p>
            <b>Address: </b>
            {address.flat_no + " " + address.area}
          </p>
          <p>State: {address.state}</p>
          <p>Pincode: {address.pincode}</p>
          <p>Mobile: {address.mobile}</p>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetails;
