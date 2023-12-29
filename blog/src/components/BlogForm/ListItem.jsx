export default function ListItem({ children, value, condition }) {
  return (
    <li
      style={
        value ? (condition ? { color: "#14D81C" } : { color: "#EA1919" }) : {}
      }
    >
      {children}
    </li>
  );
}
