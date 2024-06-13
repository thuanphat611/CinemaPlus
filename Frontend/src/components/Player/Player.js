import classNames from "classnames/bind";
import { IoPlay } from "react-icons/io5";

import styles from './Player.module.scss';

const cx = classNames.bind(styles);

function Player() {
  return (
    <div className={cx('container')}>
      <div className={cx('placeholder')}>
        <div className={cx('placeholder-btn')}>
          <IoPlay />
        </div>
      </div>

      
    </div>
  );
}

export default Player;