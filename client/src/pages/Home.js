import React, { useEffect, useState } from "react";
import Layouts from "../components/Layout/Layouts";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { AiOutlineReload } from "react-icons/ai";

import { toast } from "react-hot-toast";
const Home = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
    }
    getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  // filter the product on the basis of category

  const handleFilter = (value, id) => {
    let checkedproduct = [...checked];
    if (value) {
      checkedproduct.push(id);
    } else {
      checkedproduct = checkedproduct.filter((c) => c !== id);
    }
    setChecked(checkedproduct);
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/product/product-count");
      setLoading(false);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // loadmore functionality
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layouts title={"Best Offer - shop now!!"}>
       <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
     
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center"> Filter By Category</h4>
          <div className="d-flex flex-column ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
{/* filter product by price/category  */}

          <h4 className="text-center mt-4"> Filter By Price</h4>
          <div className="d-flex flex-column ">
            {
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            }
          </div>
          <div className="d-flex flex-column ">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
              <div
                className="card m-2"
                key={product._id}
                
              >
                <img
                  src={`/api/v1/product/product-photo/${product?._id}`}
                  className="card-img-top"
                  alt={product.name}
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
                    onClick={() => navigate(`/product/${product?.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item Added to Cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (   <>
              <div className="text-center">
             <button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-sm" aria-hidden="true" />
  <span role="status">Loading...</span>
</button>


              </div>
            </>) : <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Home;
