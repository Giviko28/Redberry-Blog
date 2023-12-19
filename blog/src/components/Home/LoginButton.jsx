export default function LoginButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="login-btn">
      {children}
    </button>
  );
}
