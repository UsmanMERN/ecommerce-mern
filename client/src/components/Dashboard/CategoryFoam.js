import React, { useState } from "react";
import axios from "axios";
import { PORT } from "../../index";

export default function CategoryForm({ getAllCategories }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.length < 3) {
      return window.showToast("Enter Name Carefully", "success");
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${PORT}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        setName("");
        getAllCategories();
        setLoading(false);
        return window.showToast(`${name} ${data.message}`, "success");
      } else {
        setLoading(false);
        return window.showToast(`${data.message}`, "error");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      return window.showToast("Something went wrong adding category", "error");
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <button
        type="submit"
        className={`btn btn-primary `}
        style={{ height: "50px", width: "150px" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <div
              className="spinner-grow spinner-border-sm text-danger"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </form>
  );
}
