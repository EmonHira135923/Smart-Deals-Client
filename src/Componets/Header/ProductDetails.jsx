import React from "react";
import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const productdata = useLoaderData();
  console.log(productdata);
  return (
    <div>
      <h1>Product Details</h1>
    </div>
  );
};

export default ProductDetails;
