import React from "react";
import Contact from "./Contact";
import Layout from "../../../components/Frontend/Layout";

function index() {
  return (
    <>
      <Layout
        title="Contact Us - E-commerce app trendBlend"
        description="Get in touch with the TrendBlend team. Contact us for any inquiries, feedback, or support. We are here to assist you and provide exceptional customer service."
        keyword="E-commerce web app, contact us, customer support, feedback"
        author="Usman"
      >
        <Contact />
      </Layout>
    </>
  );
}

export default index;
