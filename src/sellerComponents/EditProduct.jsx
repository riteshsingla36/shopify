import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = (id) => {
    axios
      .get(`/seller/product/single-product/${id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((data) => {
        setName(data.data.name);
        setPrice(data.data.price);
        setCategory(data.data.category);
        setBrand(data.data.brand);
      })
      .catch((err) => alert("error getting product"));
  };

  const patchProduct = (id) => {
    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }
    let seller = JSON.parse(localStorage.getItem("seller"))._id;
    axios
      .patch(
        `/seller/product/edit-product/${id}`,
        { name, price, category, brand, seller },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then(() => {
        alert("successfully updated product");
        navigate("/seller");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="edit-product">
      <h1>EditProduct</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />
      {error && !name && <span>name is required</span>}
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter product price"
      />
      {error && !price && <span>price is required</span>}
      <input
        type="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter product category"
      />
      {error && !category && <span>category is required</span>}
      <input
        type="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Enter product brand"
      />
      {error && !brand && <span>brand is required</span>}

      <button onClick={() => patchProduct(id)}>Edit Product</button>
    </div>
  );
};

export default EditProduct;
