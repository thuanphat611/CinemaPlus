import classNames from "classnames/bind";
import { useState } from "react";
import { FaTelegram, FaInstagram  } from "react-icons/fa";

import styles from './Social.module.scss';

const cx = classNames.bind(styles);

function Social() {

  const [input, setInput] = useState("");
  
  return (
    <div className={cx('container')}>
      <a className={cx('link')} href="/" target="_blank">
        <div className={cx('block', 'telegram')}>
          <div className={cx('icon')}>
            <FaTelegram />
          </div>
          <h4 className={cx('name')}>Follow us on Telegram</h4>
        </div>
      </a>

      <a className={cx('link')} href="/" target="_blank">
        <div className={cx('block', 'instagram')}>
          <div className={cx('icon')}>
            <FaInstagram />
          </div>
          <h4 className={cx('name')}>Follow us on Instagram</h4>
        </div>
      </a>

      <div className={cx('block-double')}>
        <p className={cx('text')}>

        </p>
        <div className={cx('submit')}>
          <input className={cx('input')} type="text" value={input} onChange={(e) => { setInput(e.target.value) }}/>
          <button className={cx('btn')}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Social;