import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.svg"

export default function Header({ isLoggedIn, onShowLogin }) {
  return (
    <header className="header">
      <Link style={{ display: "flex" }} to="/">
        <img src={Logo} alt="Logo" />
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
