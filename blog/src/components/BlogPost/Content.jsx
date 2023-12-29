import Category from "../Home/Category";
import React from "react";
import CustomCarousel from "./CustomCarousel";

export default function Content({ blogs, blog }) {
    return (
        <div className="content">
            <div className="blogpost slide-in">
                <img className="blogpost-image" src={blog.image} alt="Blog Image" />
                <div>
                    <div className="blogpost-author-div">
                        <p>{blog.author}</p>
                        <p className="blogpost-date">
                            {blog.publish_date} {blog.email && <li>{blog.email}</li>}
                        </p>
                    </div>
                    <h1 className="blogpost-title">{blog.title}</h1>
                    <div className="blogpost-categories">
                        {blog.categories.map((c) => (
                            <Category
                                color={c.text_color}
                                bgColor={c.background_color}
                                padding="6px 10px"
                            >
                                {c.title}
                            </Category>
                        ))}
                    </div>
                </div>
                <p className="blogpost-description">{blog.description}</p>
            </div>
            <CustomCarousel blogs={blogs} />
        </div>
    );
}
