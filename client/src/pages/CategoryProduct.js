import React, { useEffect, useState } from "react";
import Layouts from "../components/Layout/Layouts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProductStyles.css";

const CategoryProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params?.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true)
    if (params?.slug) getProductByCategory();
    setLoading(false)
  }, [params?.slug]);
  return (
    <Layouts title={"Category Product Page"}>
      {loading ? (
        <>
        
          <div className="text-center">
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
              <span role="status">Loading...</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="container mt-3 category">
            <h4 className="text-center">Category - '{category?.name}'</h4>
            <h6 className="text-center">"{products?.length}" result found</h6>
            <div className="row">
              <div className="col-md-9 offset-1">
                <div className="d-flex flex-wrap">
                  {products?.map((product) => (
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
                        <div className="card-name-price">
                          <h5 className="card-title">{product.name}</h5>
                          <h5 className="card-title card-price">
                            {product.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </h5>
                        </div>

                        <p className="card-text ">
                          {product.description.substring(0, 60)}...
                        </p>
                        <div className="card-name-price">
                          <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            More Details
                          </button>
                          <button className="btn btn-secondary ms-1">
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layouts>
  );
};

export default CategoryProduct;
