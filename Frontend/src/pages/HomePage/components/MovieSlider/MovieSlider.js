import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./MovieSlider.module.scss";

const cx = classNames.bind(styles);

function MovieSlider({ imageList }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  let movieName = imageList ? imageList[activeIndex].name : "";
  let movieIMDB = imageList ? imageList[activeIndex].rating : "";

  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= imageList?.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return imageList?.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  //mobile swipe handlers
  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      //handle swipe left
      slideNext();
    }
    if (touchEndX - touchStartX > 50) {
      //handle swipe right
      slidePrev();
    }
  };

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
