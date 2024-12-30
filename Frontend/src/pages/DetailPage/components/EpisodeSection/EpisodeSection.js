import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

import styles from './EpisodeSection.module.scss';

const cx = classNames.bind(styles);

function EpisodeSection({ data, id, type }) {
  const [season, setSeason] = useState(data?.length > 0 ? data.length - 1 : 0);

  useEffect(() => {
    setSeason(data?.length > 0 ? data.length - 1 : 0);
  }, [data]);

  const episodeList = [];
  if (data) {
    for (var i = 0; i < data[Number(season)].episode_count; i++) {
      episodeList.push(i + 1);
    }
  }

  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <span className={cx('header')}>
          <h3 className={cx('title')}>Seasons & Episodes</h3>
          <div className={cx('selection-container')}>
            <div className={cx('selection')}>
              <span className={cx('selection-selected-item')}>{data ? data[Number(season)]?.name : ''}</span>
              <FaAngleDown />
            </div>
            <div className={cx('selection-dropdown-list')}>
              {
                data?.map((item, index) => {
                  return (
                    <option key={index} className={cx('selection-dropdown-item')} value={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setSeason(e.target.value);
                      }}
                    >
                      {item.name}
                    </option>
                  )
                })
              }
            </div>
          </div>
        </span>

        <span className={cx('line')}></span>

        <ul className={cx('episode-list')}>
          {
            episodeList.map((item, index) => {
              return (
                <li key={index} className={cx('episode-item')}>
                  <Link className={cx('episode-link')} to={ '/' + (type === 'movie' ? 'movie' : 'series') + '/watch/' + id + '/' + season + '/' + (index + 1)}>{item}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default EpisodeSection;