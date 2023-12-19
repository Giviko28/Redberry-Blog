import LoginButton from "./LoginButton";

export default function Header({ isLoggedIn, onShowLogin }) {
  return (
    <header className="header">
      <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Logo" />
      {!isLoggedIn && <LoginButton onClick={onShowLogin}>შესვლა</LoginButton>}
      {isLoggedIn && <LoginButton>ბლოგის ატვირთვა</LoginButton>}
    </header>
  );
}
