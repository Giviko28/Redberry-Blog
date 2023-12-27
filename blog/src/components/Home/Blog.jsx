import Category from "./Category";
import arrow from "../../images/topArrow.svg";
import { Link } from "react-router-dom";
export default function Blog({ blog }) {
  return (
    <li>
      <img src={blog.image} alt="Blog Image" />
      <div className="blog-description">
        <div>
          <p className="author">{blog.author}</p>
          <span className="publish-date">{blog.publish_date}</span>
        </div>
        <p className="title">{blog.title}</p>
        <div className="categories">
          {blog.categories.map((c) => (
            <Category
              key={c.id}
              color={c.text_color}
              bgColor={c.background_color}
              padding="6px 10px"
            >
              {c.title}
            </Category>
          ))}
        </div>
        <div className="description">{blog.description}</div>
        <p className="see-all">
          <Link to={`/blog/${blog.id}`}>
            სრულად ნახვა
            <img src={arrow} alt="Arrow icon" />
          </Link>
        </p>
      </div>
    </li>
  );
}
