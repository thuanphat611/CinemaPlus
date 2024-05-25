import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FaRegHeart, /*FaHeart*/  } from "react-icons/fa";

import styles from './MovieCard.module.scss';

const cx = classNames.bind(styles);

function MovieCard({ id, posterURL, name, type }) {
  return (
    <div className={cx('container')}>
      <Link 
        className={cx('link')}
        to={"/" + type + "/detail/" + id}
        >
        <img 
          className={cx('poster')} 
          style={{ display: posterURL ? 'block' : 'none' }}
          src={posterURL} 
          alt={name}/>
          <div className={cx('hover-overlay')}>
            <button className={cx('like-btn')} 
              onClick={
              (e) => {
                e.preventDefault(); 
                console.log('liked');
              }}
            >
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