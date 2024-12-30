import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

import styles from "./DiscoverBar.module.scss";
import { getGenresFromAPI } from "../../../../api/tmdb";

const cx = classNames.bind(styles);

function DiscoverBar() {
  const [type, setType] = useState("all");
  const [genre, setGenre] = useState("all");
  const [year, setYear] = useState("all");
  const [currentGenreList, setCurrentGenreList] = useState([]);
  const [genreList, setGenreList] = useState({});

  useEffect(() => {
    const getData = async () => {
      const result = await getGenresFromAPI();
      setGenreList(result);
      setCurrentGenreList(result.all);
    };
    getData();
  }, []);

  let currentDate = new Date();
  let currentYear = Number(currentDate.getFullYear());
  let minYear = 1990;
  let yearList = [];

  for (let year = currentYear; year >= minYear; year--) {
    yearList.push(year);
  }

  return (
    <div className={cx("container")}>
      <form className={cx("form")}>
        <div className={cx("radio-group")}>
          <input
            className={cx("radio-item")}
            type="radio"
            id="all"
            name="type"
            value="all"
            defaultChecked
          />
          <label
            className={cx("radio-label")}
            htmlFor="all"
            onClick={() => {
              setType("all");
              setGenre("all");
              setCurrentGenreList(genreList.all);
            }}
          >
            All
          </label>
          <input
            className={cx("radio-item")}
            type="radio"
            id="movie"
            name="type"
            value="movie"
          />
          <label
            className={cx("radio-label")}
            htmlFor="movie"
            onClick={() => {
              setType("movie");
              setGenre("all");
              setCurrentGenreList(genreList.movie);
            }}
          >
            Movie
          </label>
          <input
            className={cx("radio-item")}
            type="radio"
            id="series"
            name="type"
            value="series"
          />
          <label
            className={cx("radio-label")}
            htmlFor="series"
            onClick={() => {
              setType("series");
              setGenre("all");
              setCurrentGenreList(genreList.series);
            }}
          >
            Series
          </label>
        </div>

        <input
          style={{ display: "none" }}
          type="text"
          name="genre"
          value={genre}
          readOnly
        />
        <div className={cx("selection-container")}>
          <div className={cx("selection")}>
            <span className={cx("selection-selected-item")}>
              {genre === "all" ? "Genre" : genre}
            </span>
            <FaAngleDown />
          </div>
          <div className={cx("selection-dropdown-list")}>
            <option
              className={cx("selection-dropdown-item")}
              value="all"
              onClick={(e) => {
                e.preventDefault();
                setGenre(e.target.value);
              }}
            >
              All
            </option>
            {currentGenreList.map((item, index) => {
              return (
                <option
                  key={index}
                  className={cx("selection-dropdown-item")}
                  value={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setGenre(e.target.value);
                  }}
                >
                  {item.name}
                </option>
              );
            })}
          </div>
        </div>

        <h3 className={cx("input-label")}>Rate</h3>
        <input
          type="text"
          className={cx("rate-input")}
          name="minRate"
          placeholder="from:"
        />
        <input
          type="text"
          className={cx("rate-input")}
          name="maxRate"
          placeholder="to:"
        />

        <input
          style={{ display: "none" }}
          type="text"
          name="year"
          value={year}
          readOnly
        />
        <div className={cx("selection-container")}>
          <div className={cx("selection")}>
            <span className={cx("selection-selected-item")}>
              {year === "all" ? "Year" : year}
            </span>
            <FaAngleDown />
          </div>
          <div className={cx("selection-dropdown-list")}>
            <option
              className={cx("selection-dropdown-item")}
              value="all"
              onClick={(e) => {
                e.preventDefault();
                setYear(e.target.value);
              }}
            >
              All
            </option>
            {yearList.map((year, index) => {
              return (
                <option
                  key={index}
                  className={cx("selection-dropdown-item")}
                  value={year}
                  onClick={(e) => {
                    e.preventDefault();
                    setYear(e.target.value);
                  }}
                >
                  {year}
                </option>
              );
            })}
          </div>
        </div>

        <button className={cx("button")}>Search</button>
      </form>
    </div>
  );
}

export default DiscoverBar;
