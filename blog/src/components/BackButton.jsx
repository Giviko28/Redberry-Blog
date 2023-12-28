import React from "react";
import image from "../images/back.svg";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <button className="go-back" onClick={goBack}>
      <img src={image} alt="Back button" />
    </button>
  );
}
