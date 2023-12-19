export default function Category({ children, color, bgColor }) {
  return (
    <button
      className="category-btn"
      style={{ color: color, backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
}
