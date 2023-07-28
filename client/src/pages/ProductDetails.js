import React, { useEffect, useState } from "react";
import Layouts from "../components/Layout/Layouts";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layouts>
      <div className="row container mt-3">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"400px"}
            width={"300px"}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center"> Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : ${product.price}</h6>
          <h6>category : {product.category.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row"> Similar Product</div>
    </Layouts>
  );
};

export default ProductDetails;
