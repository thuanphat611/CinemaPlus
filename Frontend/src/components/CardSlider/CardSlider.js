import classNames from "classnames/bind";
import { Link  } from "react-router-dom";
import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";

import styles from './CardSlider.module.scss';

const cx = classNames.bind(styles);

function CardSlider({ title, viewAll, children }) {
  const sliderTitle = title ? title : 'None titled';

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <h2 className={cx('title')}>{sliderTitle}</h2>
        <Link className={cx('view-all')} to={viewAll ? viewAll : "/"} >
          View all
        </Link>
      </div>
      <div className={cx('slider')}>
        <div className={cx('slider-border')}>
          <div className={cx('slider-content')}>
            {children}
          </div>
        </div>

        <button className={cx('slider-button')} 
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <FaChevronLeft />
        </button>
        <button className={cx('slider-button')}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default CardSlider;