import axiosClient from "./axios-client";
import { useEffect, useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  useEffect(() => {
    if (!token) {
      axiosClient.get("/token").then((response) => {
        setToken(response.data.token);
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
      });
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Banner />
      <ContentList />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Logo" />
      <button className="login-btn">შესვლა</button>
    </header>
  );
}

function Banner() {
  return (
    <div className="banner">
      <h1>ბლოგი</h1>
      <img src={process.env.PUBLIC_URL + "/images/banner.svg"} alt="Banner" />
    </div>
  );
}

function ContentList() {
  return (
    <>
      <CategoryList />
      <BlogsList />
    </>
  );
}

function CategoryList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/categories")
      .then((response) => setCategories(response?.data?.data));
  }, []);

  return (
    <div className="category-list-wrapper">
      <ul className="category-list">
        {categories &&
          categories.map((category) => (
            <Category
              key={category.id}
              color={category.text_color}
              bgColor={category.background_color}
            >
              {category.title}
            </Category>
          ))}
      </ul>
    </div>
  );
}

function Category({ children, color, bgColor }) {
  return (
    <button
      className="category-btn"
      style={{ color: color, backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
}

function BlogsList() {
  return <ul className="blog-list"></ul>;
}

function Blog({ blog }) {
  return (
    <li>
      <img src="" alt="" />
      <p>ავტორი</p>
      <p>გამოქვეყნების თარიღი</p>
      <p>ბლოგის სათაური</p>
      <div>კატეგორიები</div>
      <p></p>
      <button>სრულად ნახვა</button>
    </li>
  );
}
