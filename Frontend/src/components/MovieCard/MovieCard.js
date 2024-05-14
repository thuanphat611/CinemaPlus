import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaRegHeart, /*FaHeart*/  } from "react-icons/fa";

import styles from './MovieCard.module.scss';

const cx = classNames.bind(styles);

function MovieCard({ id, posterURL, name }) {
  return (
    <div className={cx('container')}>
      <Link 
        className={cx('link')}
        to={"/movie?id=" + id}
        >
        <img 
          className={cx('poster')} 
          src={posterURL} 
          alt={name}/>
          <div className={cx('hover-overlay')}>
            <button className={cx('like-btn')}>
              <FaRegHeart className={cx('like-icon')} />
              {/* <FaHeart /> */}
            </button>
          </div>
      </Link>
      <h3 className={cx('movie-name')}>{name}</h3>
    </div>
  );
}

export default MovieCard;