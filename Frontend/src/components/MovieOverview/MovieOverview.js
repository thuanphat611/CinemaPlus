import classNames from "classnames/bind";
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { IoPlay, IoMenu } from "react-icons/io5";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { FaRegHeart, FaHeart, FaRegBookmark , FaBookmark } from "react-icons/fa";

import styles from './MovieOverview.module.scss';

const cx = classNames.bind(styles);

function MovieOverview() {
  return (
    <div className={cx('container')}>
      <img className={cx('background-img')} src="https://image.tmdb.org/t/p/original/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg" alt="" />
      <div className={cx('shadow')}></div>
      <img className={cx('poster')} src="https://image.tmdb.org/t/p/w342/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg" alt="" />

      <div className={cx('content')}>
        <h1 className={cx('name')}>Godzilla x Kong: The New Empire</h1>
        
        <ul className={cx('genre-list')}>
          <li className={cx('genre-item')}>Science Fiction</li>
          <li className={cx('genre-item')}>Action</li>
          <li className={cx('genre-item')}>Adventure</li>
        </ul>

        <div className={cx('rating-wrap')}>
          <div className={cx('progress-bar-wrap')}>
            <CircularProgressbar value='7.361' text='7.361' strokeWidth='10' minValue='0' maxValue='10'
              styles={buildStyles({
                textSize: '25px',
                textColor: "#ffffff",
                pathColor: "#611dba",
                trailColor: "#6c6c6c"
              })} 
            />
          </div>
          <h4 className={cx('rating-text')}>User score</h4>
        </div>

        <div className={cx('button-group')}>
          <Link className={cx('play-btn')} to="/">
            <IoPlay />
            <p className={cx('btn-text')}>Play online</p>
          </Link>
          <a className={cx('more-btn')} href="http://facebook.com" target="_blank" rel="noreferrer">
            <IoMenu />  
            <p className={cx('btn-text')}>Movie's webite</p>
          </a>
          <button className={cx('option-btn')}>
            <MdPlaylistAdd />
          </button>
          <button className={cx('option-btn')}>
            <FaRegHeart />
          </button>
          <button className={cx('option-btn')}>
            <FaRegBookmark />
          </button>
        </div>
        
        {/* <h3 className={cx('overview-title')}>Overview</h3> */}
        <div className={cx('overview-wrapper')}>
          <div className={cx('overview-content')}>
            <p className={cx('overview')}>acb asda asd d s ad sad d ghh jhfg jh khk ui u t hwgh eaf   weg qryw </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieOverview;