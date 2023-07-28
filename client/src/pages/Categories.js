import React from "react";
import Layouts from "../components/Layout/Layouts";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layouts title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories?.map((cat) => (
            <div key={cat._id} className="col-md-6 mt-5 mb-5 gx-3 gy-3">
              <Link className="btn btn-primary" to={`/category/${cat.slug}`}>
                {" "}
                {cat.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layouts>
  );
};

export default Categories;
