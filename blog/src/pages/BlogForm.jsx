import { Link, Navigate } from "react-router-dom";

export default function BlogForm({ isLoggedIn }) {
  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <div>
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="" />
      </Link>
    </header>
  );
}
