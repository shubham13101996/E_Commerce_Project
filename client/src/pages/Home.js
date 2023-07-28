import React, { useEffect, useState } from "react";
import Layouts from "../components/Layout/Layouts";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <div className="row mt-3">
        <div className="col-md-2">
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
          <div className="d-flex flex-column m-2">
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
                style={{ width: "18rem" }}
              >
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt="product-photo"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}
                  </p>
                  <p className="card-text">$ {product.price}</p>

                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading..." : "loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Home;
