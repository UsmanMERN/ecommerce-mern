/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import contactImg from "../../../assets/images/contact-gb5d6bed1c_1280.jpg";
import HeroSection from "../../../components/Frontend/HeroSection";

const initialState = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Form validation
    if (!name || name.length < 3 || !email || !message || message.length < 10) {
      window.showToast(
        "Please fill in all fields and meet the requirements.",
        "error"
      );
      return;
    } else {
      setFormData(initialState);
      return window.showToast("Message sent successfully.", "success");
    }
  };
  return (
    <>
      <HeroSection
        heading={"Contact - trendBlend"}
        paragraph={
          "Get in touch with the TrendBlend team. Contact us for any inquiries, feedback, or support."
        }
        page={"Contact Us"}
        style={"other"}
      />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <img
              src={contactImg}
              alt="Contact Form"
              className="img-fluid rounded-2"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="contact-form ">
              <h2 className="text-center py-3 bg-dark text-white">
                Contact Us
              </h2>
              <form
                action="https://formspree.io/f/mwkjdkod"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 my-3">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Your Message"
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-12 text-center my-3">
                  <button
                    type="submit"
                    className="btn btn-outline-dark rounded-0"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
