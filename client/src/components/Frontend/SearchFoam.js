import React, { useState } from "react";
import { useSearchContext } from "../../context/SearchContext";
import axios from "axios";
import { PORT } from "../../index";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [value, setValue] = useSearchContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${PORT}/api/v1/product/search/${value.keyword}`
      );
      setValue({ ...value, result: data.results });
      navigate("/search");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  };

  return (
    <form className="mx-auto d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2 border-0"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setValue({ ...value, keyword: e.target.value })}
      />
      <button
        className="btn btn-outline-success rounded-0 py-0"
        type="submit"
        disabled={loading}
        style={{ width: "6rem" }}
      >
        {loading ? "" : "Search"}
      </button>
    </form>
  );
}
