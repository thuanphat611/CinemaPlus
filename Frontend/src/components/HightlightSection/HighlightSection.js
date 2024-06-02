import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from './HighlightSection.module.scss';

const cx =  classNames.bind(styles);

function HightlightSection({ source }) {
  return(
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
                return accumulator + " | " + item;
              }
            })
            :
            ""
          }
        </h4>
        <h4 
          className={cx('information-line', {
            'no-display': source.type === 'series'
          })} 
        >
          <span className={cx('information-title')}>Director:</span>
          {source.director}
        </h4>
        <h4 className={cx('information-line')}>
          <span className={cx('information-title')}>Casts:</span>
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
          <Link className={cx('play-btn')} to={"/"+ source.type +"/watch/" + source.id}>Play online</Link>
          <a className={cx('more-btn', {'no-display': !source.more})} href={source.more} target="_blank" rel="noreferrer">More Details</a>
        </div>
      </div>
      <img className={cx('poster')} src={source.imgURL} alt={source.name} />
    </div>
  );
}

export default HightlightSection;