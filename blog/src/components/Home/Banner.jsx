export default function Banner() {
  return (
    <div className="banner">
      <h1>ბლოგი</h1>
      <img src={process.env.PUBLIC_URL + "/images/banner.svg"} alt="Banner" />
    </div>
  );
}
