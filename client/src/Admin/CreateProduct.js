import React, { useEffect, useState } from "react";
import Layouts from "../components/Layout/Layouts";
import AdminMenu from "../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layouts title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />{" "}
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1">
              <Select
                placeholder="Select a category"
                bordered={false}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._ic} value={c.name}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateProduct;
