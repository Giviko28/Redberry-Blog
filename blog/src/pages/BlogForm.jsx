import {Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from "../components/BlogForm/Form";
import SuccessMessage from "../components/SuccessMessage";
import BackButton from "../components/BackButton";
import Header from "../components/BlogForm/Header";

export default function BlogForm({ isLoggedIn, categories, forceRefresh }) {
  const [isBlogPosted, setIsBlogPosted] = useState(false);
  const navigate = useNavigate();
  const blur = { filter: "blur(0.125rem)" };

  function handleClick() {
    forceRefresh();
    navigate("/");
  }

  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <>
      <BackButton />
      {isBlogPosted && (
        <SuccessMessage
          onClick={handleClick}
          handleExit={() => setIsBlogPosted(false)}
          buttonText="მთავარ გვერდზე დაბრუნება"
        >
          ჩანაწერი წარმატებით დაემატა
        </SuccessMessage>
      )}
      <div style={isBlogPosted ? blur : {}}>
        <Header />
        <Form setIsBlogPosted={setIsBlogPosted} categories={categories} />
      </div>
    </>
  );
}
