export default function Input({
  children,
  type,
  value,
  isValid,
  onChange,
  title,
  isRequired,
  placeholder,
  className,
}) {
  return (
    <div className={`input-div ${className ? className : ""}`}>
      <p>
        {title}
        {isRequired ? "*" : ""}
      </p>
      <input
        onChange={onChange}
        className={
          value ? (isValid ? "valid-input" : "invalid-input") : "default-input"
        }
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
      />
      <ul>{children}</ul>
    </div>
  );
}
