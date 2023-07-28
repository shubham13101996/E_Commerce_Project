import React from "react";
import Layouts from "../../components/Layout/Layouts";
import { useSearch } from "../../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layouts>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found"
              : `Found "${values?.results.length}" Products`}
          </h6>

          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((product) => (
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

export default Search;
