import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import styles from './EpisodeSection.module.scss';

const cx = classNames.bind(styles);

function EpisodeSection() {
  const [season, setSeason] = useState('1')

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <span className={cx('header')}>
          <h3 className={cx('title')}>Seasons & Episodes</h3>
          <div className={cx('selection-container')}>
            <div className={cx('selection')}>
              <span className={cx('selection-selected-item')}>{'Season: ' + season}</span>
              <FaAngleDown />
            </div>
            <div className={cx('selection-dropdown-list')}>
              <option className={cx('selection-dropdown-item')} value="1"
                onClick={(e) => {
                  e.preventDefault();
                  setSeason(e.target.value);
                }}
              >
                season 1
              </option>
              <option className={cx('selection-dropdown-item')} value="2"
                onClick={(e) => {
                  e.preventDefault();
                  setSeason(e.target.value);
                }}
              >
                season 2
              </option>
              <option className={cx('selection-dropdown-item')} value="3"
                onClick={(e) => {
                  e.preventDefault();
                  setSeason(e.target.value);
                }}
              >
                season 3
              </option>
              {/* {
                currentGenreList.map((item, index) => {
                  return (
                    <option key={index} className={cx('selection-dropdown-item')} value={item.name}
                      onClick={(e) => {
                        e.preventDefault();
                        setGenre(e.target.value);
                      }}
                    >
                      {item.name}
                    </option>
                  )
                })
              } */}
            </div>
          </div>
        </span>

        <span className={cx('line')}></span>

        <ul className={cx('episode-list')}>
          <li className={cx('episode-item')}>
            <Link className={cx('episode-link')} to='111  '>1</Link>
          </li>
          <li className={cx('episode-item')}>
            <Link className={cx('episode-link')} to='111  '>1</Link>
          </li>
          <li className={cx('episode-item')}>
            <Link className={cx('episode-link')} to='111  '>1</Link>
          </li>
          <li className={cx('episode-item')}>
            <Link className={cx('episode-link')} to='111  '>1</Link>
          </li>
          <li className={cx('episode-item')}>
            <Link className={cx('episode-link')} to='111  '>1</Link>
          </li>
          <li className={cx('episode-item')}>
            <Link className={cx('episode-link')} to='111  '>1</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EpisodeSection;