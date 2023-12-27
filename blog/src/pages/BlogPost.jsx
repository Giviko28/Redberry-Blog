import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Login from "../components/Home/Login";
import { Navigate, useParams } from "react-router-dom";

export default function BlogPost({ isLoggedIn, setIsLoggedIn, blogs }) {
  const [showLogin, setShowLogin] = useState(false);
  let { id } = useParams();

  if (!blogs.find((b) => Number(b.id) === Number(id)))
    return <Navigate to="/" />;

  function handleShowLogin() {
    setShowLogin((showLogin) => !showLogin);
  }

  return (
    <>
      {showLogin && (
        <Login
          showLogin={showLogin}
          onShowLogin={handleShowLogin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      <Header isLoggedIn={isLoggedIn} onShowLogin={handleShowLogin} />
    </>
  );
}
