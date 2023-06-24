import React, { useEffect, useState } from "react";
import Layout from "../../../components/Frontend/Layout";
import HeroSection from "../../../components/Frontend/HeroSection";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PORT } from "../../../index";
import Product from "../../../components/Frontend/Product";

export default function GetSingleProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${PORT}/api/v1/product/product-category/${params?.slug}`
      );

      if (data?.success) {
        const productData = data.products;
        const categoryData = data.category;
        setProduct(productData);
        setCategory(categoryData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params?.slug]);

  const pageTitle = isLoading ? "Loading..." : ` ${category?.slug}`;
  const pageDescription = isLoading
    ? "Loading product information..."
    : `Learn more about ${category?.name} at TrendBlend.`;
  const pageKeywords = product
    ? `${category?.name}, TrendBlend, e-commerce, product`
    : "";

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      keyword={pageKeywords}
      author="Usman"
    >
      <HeroSection
        page={pageTitle}
        paragraph={isLoading ? "Loading..." : ` ${category?.slug}`}
        heading={isLoading ? "" : category?.slug}
        style="other"
      />
      <div className="container">
        <div className="row">
          <div className="col-12 text-center my-3">
            <h2 className="my-3 text-uppercase ">{category?.name}</h2>
            <p className="my-3 text-uppercase ">
              {product?.length} Product Found
            </p>
          </div>
          <div className="row d-flex justify-content-center align-items-center my-3">
            {product &&
              product.map((product) => (
                <Product product={product} PORT={PORT} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
