import axiosClient from "./axios-client";
import { useEffect, useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    if (!token) {
      axiosClient.get("/token").then((response) => {
        setToken(response.data.token);
        localStorage.setItem("ACCESS_TOKEN", response.data.token);
      });
    }
  }, []);

  function handleShowLogin() {
    setShowLogin((showLogin) => !showLogin);
  }

  return (
    <div className="app">
      <div style={showLogin ? { filter: "blur(0.125rem)" } : {}}>
        <Header
          showLogin={showLogin}
          isLoggedIn={isLoggedIn}
          onShowLogin={handleShowLogin}
        />
        <Banner />
        <ContentList />
      </div>
      {showLogin && (
        <Login
          showLogin={showLogin}
          onShowLogin={handleShowLogin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}

function Header({ isLoggedIn, onShowLogin }) {
  return (
    <header className="header">
      <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Logo" />
      {!isLoggedIn && <LoginButton onClick={onShowLogin}>შესვლა</LoginButton>}
      {isLoggedIn && <LoginButton>ბლოგის ატვირთვა</LoginButton>}
    </header>
  );
}

function LoginButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="login-btn">
      {children}
    </button>
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
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosClient.get("/blogs").then((response) => setBlogs(response.data));
  }, []);

  return (
    <>
      <CategoryList />
      <BlogsList blogs={blogs} />
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

function BlogsList({ blogs }) {
  return (
    <ul className="blog-list">
      {blogs.length && blogs.map((blog) => <Blog blog={blog} key={blog.id} />)}
    </ul>
  );
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

function Login({ showLogin, isLoggedIn, setIsLoggedIn, onShowLogin }) {
  const [email, setEmail] = useState("");
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (!email) return;
    if (showLogin && isLoggedIn) onShowLogin();

    axiosClient
      .post("/login", { email: email })
      .then((response) => setIsLoggedIn(true))
      .catch((error) => setIsInputInvalid(true));
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      {!isLoggedIn && <h1>შესვლა</h1>}
      {!isLoggedIn && (
        <div className="email-input-container">
          <p>ელ-ფოსტა</p>
          <input
            className={isInputInvalid ? "invalid-input" : "default-input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Example@redberry.ge"
          />
          {isInputInvalid && (
            <div className="invalid-input-info">
              <img
                src={process.env.PUBLIC_URL + "/images/info.svg"}
                alt="Info icon"
              />
              ელ ფოსტა არ მოიძებნა
            </div>
          )}
        </div>
      )}
      {isLoggedIn && (
        <div className="login-success">
          <img src={process.env.PUBLIC_URL + "/images/test.svg"} alt="" />
          <h1>წარმატებული ავტორიზაცია</h1>
        </div>
      )}
      <LoginButton>{isLoggedIn ? "კარგი" : "შესვლა"}</LoginButton>
      <p onClick={onShowLogin} className="x-button">
        &times;
      </p>
    </form>
  );
}
