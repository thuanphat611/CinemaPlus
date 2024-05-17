import classNames from 'classnames/bind';
import { IoPlay } from "react-icons/io5";
import { FaChevronDown, FaChevronUp  } from "react-icons/fa";

import styles from './TrailerSection.module.scss';

const cx = classNames.bind(styles);

function TrailerSection({ source }) {
  const source1 = source[0];
  console.log(source1)
  return (
    <div className={cx('container')}>
      <h4 className={cx('header')}>Trailers</h4>
      <div className={cx('main')}>
        <div className={cx('slider')}>
          <div className={cx('slider-item')}>
            <img className={cx('slider-item-image')} src={source1.imgURL} alt={source1.name} />
            <div className={cx('play-button')}>
              <IoPlay />
            </div>
            <h4 className={cx('slider-itemname')}>{source1.name}</h4>
          </div>

          <button className={cx('button-up')}><FaChevronUp /></button>
          <button className={cx('button-down')}><FaChevronDown /></button>
        </div>
        <img className={cx('background-image')} src={source1.imgURL} alt={source1.name} />
        <div className={cx('free-space')}>
          <button className={cx('background-play-btn')}><IoPlay /></button>
          <h4 className={cx('background-name')}>{source1.name}</h4>
        </div>
      </div>
    </div>
  );
}

export default TrailerSection;