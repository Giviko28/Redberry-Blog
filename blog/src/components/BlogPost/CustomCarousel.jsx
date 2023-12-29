import React, {useState} from "react";
import arrowR from "../../images/rightArrow.svg";
import Slider from "react-slick";
import Blog from "../Home/Blog";

export default function CustomCarousel({ blogs }) {
    const [sliderRef, setSliderRef] = useState(null);

    const sliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
    };

    return (
        <div className="carousel-div">
            <div className="carousel-div-nav">
                <h1>მსგავსი სტატიები</h1>
                <div className="carousel-arrows">
                    <img
                        onClick={sliderRef?.slickPrev}
                        className="carousel-prev"
                        src={arrowR}
                        alt="Right Arrow"
                    />
                    <img
                        onClick={sliderRef?.slickNext}
                        className="carousel-next"
                        src={arrowR}
                        alt="Left Arrow"
                    />
                </div>
            </div>
            <ul className="carousel-content">
                <Slider ref={setSliderRef} {...sliderSettings}>
                    {blogs.map((blog) => (
                        <Blog blog={blog} />
                    ))}
                </Slider>
            </ul>
        </div>
    );
}

