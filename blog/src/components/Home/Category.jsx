export default function Category({
  children,
  onClick,
  color,
  bgColor,
  padding,
  isSelected,
}) {
  const borderStyle = isSelected ? "1px solid #000000" : "1px solid #F3F2FA";
  return (
    <button
      onClick={onClick}
      className="category-btn"
      style={{
        color: color,
        backgroundColor: bgColor,
        padding: padding,
        border: borderStyle,
      }}
    >
      {children}
    </button>
  );
}
