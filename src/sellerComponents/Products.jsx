import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get(
        `/seller/product/all-products?seller=${
          JSON.parse(localStorage.getItem("seller"))._id
        }`,
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => alert(err.message));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/seller/product/delete-product/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then(() => {
        alert("Successfully Deleted Product");
        getProducts();
      });
  };
  return (
    <div className="products">
      <table border="1" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>Rs. {product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/seller/edit-product/${product._id}`);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
