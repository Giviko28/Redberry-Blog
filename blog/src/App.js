import Home from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogForm from "./pages/BlogForm";
import React from "react";
import axiosClient from "./axios-client";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("IS_LOGGED_IN") === "true",
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!token) {
      axiosClient.get("/token").then((response) => {
        setToken(response.data.token);
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
      });
    }
    axiosClient
      .get("/categories")
      .then((response) => setCategories(response?.data?.data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              categories={categories}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/add-blog"
          element={<BlogForm categories={categories} isLoggedIn={isLoggedIn} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
