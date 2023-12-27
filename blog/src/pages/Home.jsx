import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Banner from "../components/Home/Banner";
import ContentList from "../components/Home/ContentList";
import Login from "../components/Home/Login";
import SuccessMessage from "../components/SuccessMessage";

export default function Home({ isLoggedIn, setIsLoggedIn, categories, blogs }) {
  const [showLogin, setShowLogin] = useState(false);

  function handleShowLogin() {
    setShowLogin((showLogin) => !showLogin);
  }

  return (
    <div className="home">
      <div style={showLogin ? { filter: "blur(0.125rem)" } : {}}>
        <Header
          showLogin={showLogin}
          isLoggedIn={isLoggedIn}
          onShowLogin={handleShowLogin}
        />
        <Banner />
        <ContentList blogs={blogs} categories={categories} />
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
