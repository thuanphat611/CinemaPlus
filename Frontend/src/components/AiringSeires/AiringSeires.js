import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { useState } from "react";

import styles from './AiringSeries.module.scss';

const cx = classNames.bind(styles);

function AiringSeries() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today.getDay())

  return (
    <div className={cx('container')}>
      <div className={cx('day-group')}>
        {
          days.map((day, index) => {
            return <button key={index} className={cx('day-button', {'button-active': index === currentDate})} onClick={() => { setCurrentDate(index) }}>{day}</button>;
          })
        }
      </div>

      <div className={cx('series-list')}>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
        <div className={cx('series-item-wrapper')}>
          <Link className={cx('series-item')} to="/">
            <img className={cx('series-img')} src="https://image.tmdb.org/t/p/w154/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
            <div className={cx('series-info')}>
              <h4 className={cx('series-name')}>series's name</h4>
              <p className={cx('air-date')}>{days[currentDate]}</p>
            </div>
          </Link>
        </div>
      </div>
      
      <Link className={cx('highlight-series-item')} to="/">
        <img className={cx('highlight-series-img')} src="https://image.tmdb.org/t/p/w342/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg" alt ="" />
        <div className={cx('highlight-series-info')}>
          <h4 className={cx('highlight-series-name')}>series's name</h4>
          <p className={cx('highlight-air-date')}>{days[currentDate]}</p>
        </div>
      </Link>
    </div>
  );
}

export default AiringSeries;