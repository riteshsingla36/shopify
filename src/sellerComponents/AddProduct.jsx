import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleaddproduct = () => {
    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }
    let seller = JSON.parse(localStorage.getItem("seller"))._id;
    axios
      .post(
        "/seller/product/add",
        { name, price, category, brand, seller },
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then(() => {
        if (window.confirm("Do you want to add more product?")) {
          setName("");
          setPrice(0);
          setCategory("");
          setBrand("");
        } else {
          navigate("/seller");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="add-product">
      <h1>Add Product</h1>
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

      <button onClick={() => handleaddproduct()}>Add Product</button>
    </div>
  );
};

export default AddProduct;
