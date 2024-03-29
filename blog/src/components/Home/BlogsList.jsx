import Blog from "./Blog";

export default function BlogsList({ blogs }) {
  if (blogs.length === 0)
    return <p className="empty-message">ბლოგები ვერ მოიძებნა</p>;
  return (
    <ul className="blog-list">
      {blogs.length > 0 &&
        blogs.map((blog) => <Blog blog={blog} key={blog.id} />)}
    </ul>
  );
}
