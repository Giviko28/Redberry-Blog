import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn, onShowLogin }) {
  return (
    <header className="header">
      <Link style={{ display: "flex" }} to="/">
        <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Logo" />
      </Link>
      {!isLoggedIn && <LoginButton onClick={onShowLogin}>შესვლა</LoginButton>}
      {isLoggedIn && (
        <Link to="/add-blog">
          <LoginButton>ბლოგის ატვირთვა</LoginButton>
        </Link>
      )}
    </header>
  );
}
