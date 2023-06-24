import React from "react";
import about from "../../../assets/images/AboutUs.png";
import HeroSection from "../../../components/Frontend/HeroSection";

function About() {
  return (
    <>
      <HeroSection
        heading={"About - trendBlend"}
        paragraph={
          "TrendBlend is an innovative and stylish e-commerce store that brings together the latest trends and timeless classics."
        }
        page={"About"}
        style={"other"}
      />
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            <img
              src={about}
              alt="about us"
              className="img-fluid rounded-2"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="col-12 col-lg-6 ">
            <h2 className="text-center py-3 bg-dark text-white">About Us</h2>
            <div className="text-center py-4">
              <p className="text-start fs-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                fugiat exercitationem nostrum voluptatibus nobis expedita.
                Impedit ab repellat voluptas consectetur nulla veritatis
                expedita laboriosam quis quaerat consequatur minima, aliquid
                magnam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
