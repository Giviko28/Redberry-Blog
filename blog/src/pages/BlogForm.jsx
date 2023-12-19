import { Navigate } from "react-router-dom";

export default function BlogForm({ isLoggedIn }) {
  if (!isLoggedIn) return <Navigate to="/" />;
}
