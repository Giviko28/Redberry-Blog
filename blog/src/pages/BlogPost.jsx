import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Login from "../components/Home/Login";
import { Navigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Content from "../components/BlogPost/Content";

export default function BlogPost({ isLoggedIn, setIsLoggedIn, blogs }) {
  const [showLogin, setShowLogin] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const curBlog = blogs.find((b) => Number(b.id) === Number(id));

  if (!curBlog) return <Navigate to="/" />;

  const similarBlogs = blogs.filter((blog) =>
    blog.categories.some((blogCategory) =>
      curBlog.categories.some(
        (selectedCategory) => selectedCategory.id === blogCategory.id && curBlog.id !== blog.id,
      ),
    ),
  );

  function handleShowLogin() {
    setShowLogin((showLogin) => !showLogin);
  }

  return (
    <>
      <BackButton />
      {showLogin && (
        <Login
          showLogin={showLogin}
          onShowLogin={handleShowLogin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      <Header isLoggedIn={isLoggedIn} onShowLogin={handleShowLogin} />
      <Content blogs={similarBlogs} blog={curBlog} />
    </>
  );
}
