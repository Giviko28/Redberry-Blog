export default function LoginButton({
  children,
  onClick,
  isDisabled,
  className,
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${isDisabled ? "disabled-btn" : "login-btn"} ${className}`}
    >
      {children}
    </button>
  );
}
