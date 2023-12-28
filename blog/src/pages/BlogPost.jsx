import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Login from "../components/Home/Login";
import { Navigate, useParams } from "react-router-dom";
import Category from "../components/Home/Category";
import Blog from "../components/Home/Blog";
import arrowR from "../images/rightArrow.svg";
import Slider from "react-slick";
import BackButton from "../components/BackButton";

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
        (selectedCategory) => selectedCategory.id === blogCategory.id,
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

function Content({ blogs, blog }) {
  return (
    <div className="content">
      <div className="blogpost">
        <img className="blogpost-image" src={blog.image} alt="Blog Image" />
        <div>
          <div className="blogpost-author-div">
            <p>{blog.author}</p>
            <p className="blogpost-date">
              {blog.publish_date} {blog.email && <li>{blog.email}</li>}
            </p>
          </div>
          <h1 className="blogpost-title">{blog.title}</h1>
          <div className="blogpost-categories">
            {blog.categories.map((c) => (
              <Category
                color={c.text_color}
                bgColor={c.background_color}
                padding="6px 10px"
              >
                {c.title}
              </Category>
            ))}
          </div>
        </div>
        <p className="blogpost-description">{blog.description}</p>
      </div>
      <CustomCarousel blogs={blogs} />
    </div>
  );
}

function CustomCarousel({ blogs }) {
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
  };

  return (
    <div className="carousel-div">
      <div className="carousel-div-nav">
        <h1>მსგავსი სტატიები</h1>
        <div className="carousel-arrows">
          <img
            onClick={sliderRef?.slickPrev}
            className="carousel-prev"
            src={arrowR}
            alt="Right Arrow"
          />
          <img
            onClick={sliderRef?.slickNext}
            className="carousel-next"
            src={arrowR}
            alt="Left Arrow"
          />
        </div>
      </div>
      <ul className="carousel-content">
        <Slider ref={setSliderRef} {...sliderSettings}>
          {blogs.map((blog) => (
            <Blog blog={blog} />
          ))}
        </Slider>
      </ul>
    </div>
  );
}
