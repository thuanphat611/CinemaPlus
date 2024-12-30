import classNames from "classnames/bind";
import { FaChevronRight, FaChevronLeft, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./MovieSlider.module.scss";
import useHandler from "./controller";

const cx = classNames.bind(styles);

function MovieSlider({ imageList }) {
  const {
    activeIndex,
    movieName,
    movieIMDB,
    AutoPlayStop,
    AutoPlayStart,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    slidePrev,
    slideNext,
    setActiveIndex,
  } = useHandler(imageList);

  return (
    <div
      className={cx("container")}
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={cx("overlay")}></div>

      <img
        className={cx("image-placeholder")}
        src={imageList ? imageList[0].imgURL : ""}
        alt=""
      />
      <Link
        className={cx("current-movie-link")}
        to={imageList ? "/movie/detail/" + imageList[activeIndex].id : ""}
      />

      {imageList?.map((image, index) => {
        return (
          <img
            key={index}
            className={cx("image", {
              "image-active": index === activeIndex,
            })}
            src={image.imgURL}
            alt={image.name}
          />
        );
      })}

      <div className={cx("movie-info")}>
        <h1 className={cx("movie-name")}>{movieName}</h1>
        <div className={cx("rating")}>
          <span className={cx("imdb-logo")}>
            <FaRegStar />
          </span>
          <h2 className={cx("imdb-score")}>{movieIMDB}</h2>
          <h2 className={cx("imdb-max-score")}>/</h2>
          <h2 className={cx("imdb-max-score")}>10</h2>
        </div>
        <Link
          to={imageList ? "/movie/detail/" + imageList[activeIndex].id : ""}
          className={cx("current-poster-link")}
        >
          <img
            style={{ display: imageList ? "block" : "none" }}
            className={cx("current-poster")}
            src={imageList ? imageList[activeIndex].poster : ""}
            alt={imageList ? imageList[activeIndex].name : ""}
          />
        </Link>
      </div>

      <div className={cx("poster-slider-border")}>
        <div className={cx("poster-slider", "poster-slide-" + activeIndex)}>
          {imageList?.map((item, index) => {
            return (
              <Link
                to={"/movie/detail/" + item.id}
                key={index}
                className={cx("poster-link", {
                  "poster-active": index === activeIndex,
                })}
              >
                <img
                  style={{ display: item.poster ? "block" : "none" }}
                  className={cx("poster")}
                  src={item.poster}
                  alt={item.name}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className={cx("slider-button-group")}>
        <button
          className={cx("slider-button")}
          onClick={(e) => {
            e.preventDefault();
            slidePrev();
          }}
        >
          <FaChevronLeft />
        </button>
        <button
          className={cx("slider-button")}
          onClick={(e) => {
            e.preventDefault();
            slideNext();
          }}
        >
          <FaChevronRight />
        </button>
        <div className={cx("slider-dot-container")}>
          {imageList?.map((item, index) => {
            return (
              <button
                key={index}
                className={
                  activeIndex === index
                    ? cx("slider-dot-active")
                    : cx("slider-dot")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(index);
                }}
              ></button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieSlider;
