import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from './HighlightMovie.module.scss';

const cx =  classNames.bind(styles);

function HightlightSection({ source }) {
  return (
    <div className={cx('container')}>
      <div className={cx('information')}>
        <h2 className={cx('name')}>{source.name ? source.name : ""}</h2>
        <h4 className={cx('information-line')}>
          <span className={cx('information-title')}>Category:</span>
          {
            source.category && source.category.length > 0 
            ?
            source.category.reduce((accumulator, item, index) => {
              if (index === 0)
                return item;
              else {
                return accumulator + ", " + item;
              }
            })
            :
            ""
          }
        </h4>
        <h4 className={cx('information-line')}>
          <span className={cx('information-title')}>Director:</span>
          {source.director}
        </h4>
        <h4 className={cx('information-line')}>
          <span className={cx('information-title')}>Stars:</span>
          {
            source.casts && source.casts.length > 0 
            ?
            source.casts.reduce((accumulator, castName, index) => {
              if (index === 0)
                return castName;
              else {
                return accumulator + ", " + castName;
              }
            })
            :
            ""
          }
        </h4>
        <div className={cx('overview')}>
          <span className={cx('overview-text')}>
            {source.overview}
          </span>
        </div>
        <div className={cx('button-group')}>
          <Link className={cx('play-btn')} to={"/movie?id=" + source.id}>Play online</Link>
          <a className={cx('more-btn')} href={source.more} >View Details</a>
        </div>
      </div>
      <div className={cx('poster-container')}>
        <img className={cx('poster')} src={source.posterURL} alt={source.name} />
      </div>
    </div>
  );
}

export default HightlightSection;