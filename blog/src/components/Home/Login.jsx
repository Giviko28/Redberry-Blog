import { useState } from "react";
import axiosClient from "../../axios-client";
import LoginButton from "./LoginButton";
import SuccessMessage from "../SuccessMessage";
import CloseButton from "../CloseButton";
import info from "../../images/red-info.svg"
export default function Login({
  showLogin,
  isLoggedIn,
  setIsLoggedIn,
  onShowLogin,
}) {
  const [email, setEmail] = useState("");
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (!email) {
      setIsInputInvalid(true);
      return;
    }
    if (showLogin && isLoggedIn) onShowLogin();

    axiosClient
      .post("/login", { email: email })
      .then((response) => {
        setIsLoggedIn(true);
        localStorage.setItem("IS_LOGGED_IN", "true");
      })
      .catch((error) => setIsInputInvalid(true));
  }

  if (isLoggedIn) {
    return (
      <SuccessMessage
        handleExit={onShowLogin}
        onClick={onShowLogin}
        buttonText="კარგი"
      >
        წარმატებული ავტორიზაცია
      </SuccessMessage>
    );
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      <CloseButton onClick={onShowLogin} />
      <h1>შესვლა</h1>
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
              src={info}
              alt="Info icon"
            />
            ელ ფოსტა არ მოიძებნა
          </div>
        )}
      </div>
      <LoginButton>შესვლა</LoginButton>
    </form>
  );
}
