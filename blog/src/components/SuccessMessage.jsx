import React from "react";
import LoginButton from "./Home/LoginButton";

export default function SuccessMessage({
  children,
  onClick,
  buttonText,
  handleExit,
}) {
  return (
    <div className="success-message">
      <div>
        <div className="image-wrapper">
          <img
            className="green-circle"
            src={process.env.PUBLIC_URL + "/images/test.svg"}
            alt="Green Circle"
          />
          <img
            className="checkmark"
            src={process.env.PUBLIC_URL + "/images/checkmark.svg"}
            alt="Checkmark"
          />
        </div>
        <h1>{children}</h1>
      </div>

      <LoginButton onClick={onClick} className="success-btn">
        {buttonText}
      </LoginButton>

      <p onClick={handleExit} className="x-button">
        &times;
      </p>
    </div>
  );
}
