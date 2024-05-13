import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './SearchBar.module.scss'

const cx = classNames.bind(styles);

function SearchBar() {
  const [searchText, setSearchText] = useState("");
  
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
        <select className={cx('selection')} id="genre">
          <option className={cx('selection-item')} value="Action">Action</option>
          <option className={cx('selection-item')} value="Horror">Horror</option>
          <option className={cx('selection-item')} value="Romantic">Romantic</option>
        </select>

        <select className={cx('selection')} id="year">
        {
          yearList.map((year, index) => {
            return (
              <option key={index} className={cx('selection-item')} value={year}>{year}</option>
            )
          })
        }
        </select>

        <input 
          className={cx('input')}
          type="text" 
          value={searchText} 
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button className={cx('button')}>Search</button>
      </form>
    </div>
  );
}

export default SearchBar;