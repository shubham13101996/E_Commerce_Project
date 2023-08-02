import React, { useEffect, useState } from "react";
import AdminMenu from "../components/Layout/AdminMenu";
import Layouts from "../components/Layout/Layouts";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layouts title={"Dashboard - All products"} className="container">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
              <Link
                className="product-link"
                to={`/dashboard/admin/product/${product.slug}`}
              >
                <div
                  className="card m-2"
                  key={product._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt="product-photo"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Product;
