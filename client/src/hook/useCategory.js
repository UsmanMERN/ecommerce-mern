import axios from "axios";
import { useEffect, useState } from "react";
import { PORT } from "../index";
export default function useCategory() {
  const [category, setCategory] = useState([]);
  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${PORT}/api/v1/category/get-category`);
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.error(error);
      window.showToast(
        "Something went wrong while getting categories",
        "error"
      );
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return category;
}
