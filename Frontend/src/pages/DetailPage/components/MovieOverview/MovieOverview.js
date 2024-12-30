import classNames from "classnames/bind";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { IoPlay } from "react-icons/io5";
import { ImNewTab } from "react-icons/im";
import { MdPlaylistAdd } from "react-icons/md";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa";

import styles from "./MovieOverview.module.scss";

const cx = classNames.bind(styles);

function MovieOverview({ data, type }) {
  return (
    <div className={cx("container")}>
      <img
        className={cx("background-img")}
        src={data?.imgURL}
        alt={data?.name ? data?.name : ""}
      />
      <div className={cx("shadow")}></div>
      <img
        className={cx("poster")}
        src={data?.poster}
        alt={data?.name ? data?.name : ""}
      />

      <div className={cx("content")}>
        <h1 className={cx("name")}>{data?.name}</h1>

        <ul className={cx("genre-list")}>
          {data?.category.map((item, index) => {
            return (
              <li key={index} className={cx("genre-item")}>
                {item}
              </li>
            );
          })}
        </ul>

        <div className={cx("rating-wrap")}>
          <div className={cx("progress-bar-wrap")}>
            <CircularProgressbar
              value={data?.rating}
              text={data?.rating}
              strokeWidth="10"
              minValue="0"
              maxValue="10"
              styles={buildStyles({
                textSize: "25px",
                textColor: "#ffffff",
                pathColor: "#611dba",
                trailColor: "#6c6c6c",
              })}
            />
          </div>
          <h4 className={cx("rating-text")}>User score</h4>
        </div>

        <div className={cx("button-group")}>
          <Link
            className={cx("play-btn")}
            to={
              "/" +
              (type === "series" ? "series" : "movie") +
              "/watch/" +
              data?.id +
              (type === "series" ? "/0/0" : "")
            }
          >
            <IoPlay />
            <p className={cx("btn-text")}>Play online</p>
          </Link>
          <a
            draggable={data?.more}
            className={cx("more-btn", { "btn-inactive": !data?.more })}
            href={data?.more}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (!data?.more) {
                e.preventDefault();
              }
            }}
          >
            <ImNewTab />
            <p className={cx("btn-text")}>
              {type === "tv" ? "Series" : "Movie"}'s webite
            </p>
          </a>
          <button className={cx("option-btn")}>
            <MdPlaylistAdd />
          </button>
          <button className={cx("option-btn")}>
            <FaRegHeart />
          </button>
          <button className={cx("option-btn")}>
            <FaRegBookmark />
          </button>
        </div>

        <h3 className={cx("overview-title")}>Overview</h3>
        <div className={cx("overview-wrapper")}>
          <div className={cx("overview-content")}>
            <p className={cx("overview")}>{data?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieOverview;
