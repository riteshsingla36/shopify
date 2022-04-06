import { Container } from "@mui/material";
import React from "react";
import Product from "./Product";
import "./products.css";

const Products = ({ products }) => {
  return (
    <Container className="cont" maxWidth="lg" fixed>
      <div className="all-products">
        {products.map((product) => {
          return <Product product={product} key={product._id} />;
        })}
      </div>
    </Container>
  );
};

export default Products;
