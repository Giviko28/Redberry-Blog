import Home from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogForm from "./pages/BlogForm";
import React from "react";
import axiosClient from "./axios-client";
import BlogPost from "./pages/BlogPost";
import { getCategories, getPosts } from "./helper";
import { filterBlogsByDate } from "./helper";

export default function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("IS_LOGGED_IN") === "true",
  );
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("CATEGORIES")) ?? [],
  );
  const [blogs, setBlogs] = useState(
    filterBlogsByDate(JSON.parse(localStorage.getItem("BLOGS"))) ?? [],
  );

  useEffect(() => {
    if (!token) {
      axiosClient.get("/token").then((response) => {
        setToken(response.data.token);
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
      });
    }
    getCategories(setCategories);
    getPosts(setBlogs);
  }, [refreshFlag]);

  function forceRefresh() {
    setRefreshFlag((prevFlag) => !prevFlag);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogs}
              categories={categories}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/blog/:id"
          element={
            <BlogPost
              blogs={blogs}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/add-blog"
          element={
            <BlogForm
              forceRefresh={forceRefresh}
              categories={categories}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
