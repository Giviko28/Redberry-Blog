import React from "react";
import LoginButton from "./Home/LoginButton";
import CloseButton from "./CloseButton";
import Checkmark from "../images/checkmark.svg"
import GreenCircle from "../images/greenCircle.svg"
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
            src={GreenCircle}
            alt="Green Circle"
          />
          <img
            className="checkmark"
            src={Checkmark}
            alt="Checkmark"
          />
        </div>
        <h1>{children}</h1>
      </div>

      <LoginButton onClick={onClick} className="success-btn">
        {buttonText}
      </LoginButton>

        <CloseButton onClick={handleExit} />
    </div>
  );
}
