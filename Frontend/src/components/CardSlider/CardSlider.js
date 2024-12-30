import classNames from "classnames/bind";
import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import styles from "./CardSlider.module.scss";
import { MovieCard, CastCard, PersonCard } from "./components";
import useHandler from "./controller";

const cx = classNames.bind(styles);

const CardSlider = React.forwardRef(({ title, source, type, scroll }, ref) => {
  const { sliderTitle, sliderContent, slideNext, slidePrev } = useHandler(
    title,
    source,
    type
  );

  return (
    <div ref={ref} className={cx("container")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>{sliderTitle}</h2>
        {/* <Link className={cx('view-all')} to={viewAll ? viewAll : "/"} >
          View all
        </Link> */}
      </div>
      <div className={cx("slider")}>
        <div className={cx("slider-border", { "scroll-border": scroll })}>
          <div ref={sliderContent} className={cx("slider-content")}>
            {source
              ? source.map((item, index) => {
                  if (type === "cast") {
                    return (
                      <CastCard
                        key={index}
                        profileURL={item.poster}
                        name={item.name}
                        homepage={item.homepage}
                        birthday={item.birthday}
                      />
                    );
                  } else if (type === "movie") {
                    return (
                      <MovieCard
                        key={index}
                        id={item.id}
                        posterURL={item.poster}
                        name={item.name}
                        type={item.type}
                      />
                    );
                  } else if (type === "person") {
                    return (
                      <PersonCard
                        key={index}
                        profileURL={item.poster}
                        name={item.name}
                      />
                    );
                  }
                  return null;
                })
              : null}
          </div>
        </div>

        <button
          className={cx("slider-button", { "no-display": scroll })}
          onClick={(e) => {
            e.preventDefault();
            slidePrev();
          }}
        >
          <FaChevronLeft />
        </button>
        <button
          className={cx("slider-button", { "no-display": scroll })}
          onClick={(e) => {
            e.preventDefault();
            slideNext();
          }}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
});

export default CardSlider;
