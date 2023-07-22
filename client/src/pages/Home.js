import React, { useEffect, useState } from "react";
import Layouts from "../components/Layout/Layouts";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

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
  }, []);

  // get product
  const getAllProducts = async () => {
    const { data } = await axios.get("api/v1/product/get-product");
    setProducts(data.products);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Home;
