import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn, onShowLogin }) {
  return (
    <header className="header">
      <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Logo" />
      {!isLoggedIn && <LoginButton onClick={onShowLogin}>შესვლა</LoginButton>}
      {isLoggedIn && (
        <Link to="add-blog">
          <LoginButton>ბლოგის ატვირთვა</LoginButton>
        </Link>
      )}
    </header>
  );
}
