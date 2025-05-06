import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./utils/Global";
import AuthContextProvider from "./context/AuthContext";
import SearchContextProvider from "./context/SearchContext";
import CartContextProvider from "./context/cartContext";
// export const PORT = "https://ecommerce-server-obiq.onrender.com";
export const PORT = "http://localhost:8000";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <CartContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchContextProvider>
    </CartContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
