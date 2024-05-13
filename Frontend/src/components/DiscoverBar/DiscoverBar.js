import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FaAngleDown } from "react-icons/fa";

import styles from './DiscoverBar.module.scss'

const cx = classNames.bind(styles);

function SearchBar() {
  
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

        <div className={cx('selection-wrap')}>
          <select className={cx('selection')} name="genre" id="genre">
            <option className={cx('selection-item')} value="all">Genre</option>

            <option className={cx('selection-item')} value="Action">Action</option>
            <option className={cx('selection-item')} value="Horror">Horror</option>
            <option className={cx('selection-item')} value="Romantic">Romantic</option>
          </select>
          <FaAngleDown className={cx('selection-icon')} />
        </div>

        <h3 className={cx('input-label')}>Rate</h3>
        <input type="text" className={cx('rate-input')} name="minRate" placeholder="from:" />
        <input type="text" className={cx('rate-input')} name="maxRate" placeholder="to:" />

        <div className={cx('selection-wrap')}>
          <select className={cx('selection')} name="year" id="year">
          <option className={cx('selection-item')} value="all">Year</option>
          {
            yearList.map((year, index) => {
              return (
                <option key={index} className={cx('selection-item')} value={year}>{year}</option>
              )
            })
          }
          </select>
          <FaAngleDown className={cx('selection-icon')} />
        </div>

        <button className={cx('button')}>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;