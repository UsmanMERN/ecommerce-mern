import React from "react";
import { Route, Routes } from "react-router-dom";

// pages
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Policy from "./Policy";
import NoPage from "./NoPage";
import Category from "./Category";
import GetSingleProduct from "./Home/GetSingleProduct";
import SearchProducts from "./Home/SearchProducts";
import SingleCategoryProducts from "./Home/SingleCategoryProducts";
import CartPage from "./Home/CartPage";

function index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:slug" element={<SingleCategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/search" element={<SearchProducts />} />
        <Route path="/get-product/:slug" element={<GetSingleProduct />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default index;
