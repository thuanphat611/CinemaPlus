import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from './MovieCard.module.scss';

const cx = classNames.bind(styles);

function MovieCard({ id, posterURL, name }) {
  return (
    <div className={cx('container')}>
      <Link 
        to={"/movie?id=" + id}
        >
        <img 
          className={cx('poster')} 
          src={posterURL} 
          alt={name}/>
      </Link>
      <h3 className={cx('movie-name')}>{name}</h3>
    </div>
  );
}

export default MovieCard;