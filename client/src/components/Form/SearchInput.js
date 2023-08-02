import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="d-flex search-form" onSubmit={handleSearch} role="search">
      <input
        className="form-control me-2"
        type="search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
