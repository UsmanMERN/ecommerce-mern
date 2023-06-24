/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import { PORT } from "../../../index";
// antd
import { Checkbox, Radio } from "antd";
import { Prices } from "../../../utils/Prices";
// components
import HeroSection from "../../../components/Frontend/HeroSection";
import Product from "../../../components/Frontend/Product";
// farmer motion
import { motion } from "framer-motion";
function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [productsLoading, setProductsLoading] = useState(false);

  const [filterLoading, setFilterLoading] = useState(false);
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${PORT}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      window.showToast(
        "Something went wrong while getting categories",
        "error"
      );
    }
  };
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${PORT}/api/v1/product/get-products`);
      if (data?.success) {
        setProducts(data?.products);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((categoryId) => categoryId !== id);
    }
    setChecked(all);
  };

  const filterProducts = async () => {
    try {
      setIsLoading(true);
      if (checked.length > 0 || radio.length > 0) {
        const { data } = await axios.post(
          `${PORT}/api/v1/product/filter-products`,
          { checked, radio }
        );
        setIsLoading(false);
        if (data.success) {
          setProducts(data.products);
        }
      }
      setFilterLoading(false);
    } catch (error) {
      setIsLoading(false);
      setFilterLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [checked, radio]);
  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);
  const loadMore = async () => {
    try {
      setProductsLoading(true);
      const { data } = await axios.get(
        `${PORT}/api/v1/product/products-list/${visibleProducts + 6}`
      );
      if (data?.success) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
        setProductsLoading(false);
      }
    } catch (error) {
      setProductsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <HeroSection
        heading={"Welcome to Our Website"}
        page={"Home"}
        style={"home"}
        paragraph={
          "We are dedicated to providing exceptional services that cater to your needs"
        }
      />
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-3 my-3">
            {filterLoading ? (
              <div className="text-center my-5">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <h4 className="text-center text-secondary">
                  Filter By Category
                </h4>
                <hr />
                <div className="d-flex flex-column justify-content-start">
                  <Checkbox.Group
                    style={{
                      width: "100%",
                    }}
                    className="mb-3"
                  >
                    {categories &&
                      categories?.map((category, i) => (
                        <div key={i} className="checkbox-item ps-3">
                          <Checkbox
                            value={category.name}
                            onChange={(e) =>
                              handleFilter(e.target.checked, category?._id)
                            }
                          >
                            {category?.name}
                          </Checkbox>
                        </div>
                      ))}
                  </Checkbox.Group>
                </div>
                {/* price filter */}
                <h4 className="text-center text-secondary">Filter By Price</h4>
                <hr />
                <div className="d-flex flex-column justify-content-start mb-3">
                  <Radio.Group
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                    className="ps-3"
                  >
                    {Prices &&
                      Prices.map((price) => (
                        <div key={price?._id}>
                          <Radio
                            value={price?.array}
                            onChange={(e) => setRadio(e.target.value)}
                          >
                            {price?.name}
                          </Radio>
                        </div>
                      ))}
                  </Radio.Group>
                </div>
                <motion.button
                  whileHover={{ scale: 0.93, transition: { duration: 0.2 } }}
                  className="btn btn-danger my-3 rounded-0 w-100"
                  onClick={() => window.location.reload()}
                >
                  RESET FILTERS
                </motion.button>
              </>
            )}
          </div>
          <div className="col-md-9">
            <h2 className="text-center my-3">All Products</h2>
            {isLoading ? (
              <div className="text-center my-5">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="container-fluid">
                {products && products.length > 0 ? (
                  <div className="row d-flex flex-wrap justify-content-center align-item-center">
                    {products &&
                      products
                        ?.slice(0, visibleProducts)
                        ?.map((product) => (
                          <Product
                            key={product?._id}
                            product={product}
                            PORT={PORT}
                          />
                        ))}
                  </div>
                ) : (
                  <div className="text-center my-5">
                    <h4>OOPS! No products found.</h4>
                  </div>
                )}
              </div>
            )}
            {products && products?.length > visibleProducts && (
              <div className="m-2 p-3 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-danger rounded-0"
                  onClick={loadMore}
                  disabled={productsLoading}
                  style={{ width: "8rem" }}
                >
                  {productsLoading ? (
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
