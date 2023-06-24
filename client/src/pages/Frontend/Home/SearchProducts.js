import React, { useState, useEffect } from "react";
import { useSearchContext } from "../../../context/SearchContext";
import Layout from "../../../components/Frontend/Layout";
import Product from "../../../components/Frontend/Product";

export default function SearchProducts() {
  const [values] = useSearchContext();
  const [loading, setLoading] = useState(true);

  const title = "Search Products - TrendBlend";
  const description =
    "Search for trendy fashion apparel, accessories, and home decor on TrendBlend. Find the perfect products to enhance your personal style and elevate your living space.";
  const keywords =
    "search products, trendy fashion, home decor, clothing, accessories, online store";
  const author = "Usman";

  const products = values.result || [];

  useEffect(() => {
    setLoading(false);
  }, [values.result]);

  return (
    <>
      <Layout
        title={title}
        description={description}
        keywords={keywords}
        author={author}
      >
        <div className="container">
          {loading ? (
            <div className="text-center mt-5">
              <div className="loader"></div>{" "}
            </div>
          ) : products && products.length === 0 ? (
            <div className="text-center mt-5">
              <h3>OOPs! No products found.</h3>
            </div>
          ) : (
            <div className="row d-flex justify-content-center align-items-center my-3">
              <h3 className="text-center display-5">Search Results</h3>
              <p className="my-3 text-center">Found {products.length}</p>
              {products.map((product) => (
                <Product key={product?._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
