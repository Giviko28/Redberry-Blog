import { useState } from "react";
import axiosClient from "../../axios-client";
import LoginButton from "./LoginButton";

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
          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/test.svg"}
              alt="Green Circle"
            />
            <img
              className="checkmark"
              src={process.env.PUBLIC_URL + "/images/checkmark.svg"}
              alt="Checkmark"
            />
          </div>
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
