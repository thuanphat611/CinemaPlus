import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FaAngleDown } from "react-icons/fa";

import styles from './DiscoverBar.module.scss'

const cx = classNames.bind(styles);

function SearchBar() {
  
  const [genre, setGenre] = useState("all");
  const [year, setYear] = useState("all");

  let currentDate = new Date();
  let currentYear = Number(currentDate.getFullYear());
  let minYear = 1990;
  let yearList = [];
  
  for (let year = currentYear; year >= minYear; year--) {
    yearList.push(year);
  }

  return (
    <div className={cx('container')}>
      <form className={cx('form')}>
        <div className={cx('radio-group')}>
          <input className={cx('radio-item')} type="radio" id="all" name="type" value="all" defaultChecked />
          <label className={cx('radio-label')} htmlFor="all">All</label>
          <input className={cx('radio-item')} type="radio" id="movie" name="type" value="movie" />
          <label className={cx('radio-label')} htmlFor="movie">Movie</label>
          <input className={cx('radio-item')} type="radio" id="tv-show" name="type" value="tv-show" />
          <label className={cx('radio-label')} htmlFor="tv-show">TV show</label>
        </div>

        <input style={{display: "none"}} type="text" name="genre" value={genre} readOnly/>
        <div className={cx('selection-container')}>
          <div className={cx('selection')}>
            <span className={cx('selection-selected-item')}>{genre === "all" ? "Year" : genre}</span>
            <FaAngleDown />
          </div>
          <div className={cx('selection-dropdown-list')}>
            <option className={cx('selection-dropdown-item')} value="all"
              onClick={(e) => {
                e.preventDefault();
                setGenre(e.target.value);
              }}
            >
              Genre
            </option>
            <option className={cx('selection-dropdown-item')} value="Action"
              onClick={(e) => {
                e.preventDefault();
                setGenre(e.target.value);
              }}
            >
              Action
            </option>
            <option className={cx('selection-dropdown-item')} value="Horror"
              onClick={(e) => {
                e.preventDefault();
                setGenre(e.target.value);
              }}
            >
              Horror
            </option>
            <option className={cx('selection-dropdown-item')} value="Romantic"
              onClick={(e) => {
                e.preventDefault();
                setGenre(e.target.value);
              }}
            >
              Romantic
            </option>
          </div>
        </div>

        <h3 className={cx('input-label')}>Rate</h3>
        <input type="text" className={cx('rate-input')} name="minRate" placeholder="from:" />
        <input type="text" className={cx('rate-input')} name="maxRate" placeholder="to:" />

        <input style={{display: "none"}} type="text" name="year" value={year} readOnly/>
        <div className={cx('selection-container')}>
          <div className={cx('selection')}>
            <span className={cx('selection-selected-item')}>{year === "all" ? "Year" : year}</span>
            <FaAngleDown />
          </div>
          <div className={cx('selection-dropdown-list')}>
            <option className={cx('selection-dropdown-item')} value="all"
              onClick={(e) => {
                e.preventDefault();
                setYear(e.target.value);
              }}
            >
              Year
            </option>
            {
              yearList.map((year, index) => {
                return (
                  <option key={index} className={cx('selection-dropdown-item')} value={year}
                    onClick={(e) => {
                      e.preventDefault();
                      setYear(e.target.value);
                    }}
                  >
                    {year}
                  </option>
                )
              })
            }
          </div>
        </div>

        <button className={cx('button')}>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;