import React, { useEffect, useState } from "react";
import Layouts from "../components/Layout/Layouts";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/ProductDetailStyles.css'
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layouts title={"Page - Product Detail "}>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product.name}
            height={"300px"}
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center"> Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : ${product.price}</h6>
          <h6>category : {product.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4 className="">Similar Products ➡️</h4>
        {relatedProduct.length < 1 && (
          <p className="text-center"> No Similar Product Found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProduct?.map((product) => (
            <div
              className="card m-2"
              key={product._id}
              style={{ width: "18rem" }}
            >
              <img
                src={`/api/v1/product/product-photo/${product?._id}`}
                className="card-img-top"
                alt="product-photo"
              />
              <div className="card-body">
              <div className="card-name-price">
                  <h5 className="card-title">{product.name}</h5>
                  <h5 className="card-title card-price">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text">
                  {product.description.substring(0, 30)}...
                </p>
<div className="card-name-price">
                <button
                  className="btn btn-info ms-1"
                  onClick={() => navigate(`/product/${product?.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layouts>
  );
};

export default ProductDetails;
