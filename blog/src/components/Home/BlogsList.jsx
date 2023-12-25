import Blog from "./Blog";

export default function BlogsList({ blogs }) {
  return (
    <ul className="blog-list">
      {blogs.length > 0 &&
        blogs.map((blog) => <Blog blog={blog} key={blog.id} />)}
    </ul>
  );
}
