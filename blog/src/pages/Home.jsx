import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Banner from "../components/Home/Banner";
import ContentList from "../components/Home/ContentList";
import Login from "../components/Home/Login";

export default function Home() {
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
    <div className="home">
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
