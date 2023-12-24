export default function LoginButton({ children, onClick, isDisabled }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={isDisabled ? "disabled-btn" : "login-btn"}
    >
      {children}
    </button>
  );
}
