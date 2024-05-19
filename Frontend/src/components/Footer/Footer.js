import classNames from "classnames/bind";

import styles from './Footer.module.scss';
import logo from '../../assests/images/logo.png'

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div>
      <div className={cx('border')}></div>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('introduction')}>
            <div className={cx('logo-container')} href='/'> 
              <img className={cx('logo')} src={logo} alt=""/>
            </div>
            <h4 className={cx('title')}>Movie streaming website</h4>
            <p className={cx('introduction-text')}>
              CinemaPlus is your ultimate destination for streaming movies and TV series. Dive into a vast library of genres, discover new releases, and enjoy high-quality entertainment anytime, anywhere. Elevate your viewing experience with personalized recommendations, exclusive content, and seamless streaming on all your devices with CinemaPlus.
            </p>
          </div>
          <div className={cx('downloads')}>

          </div>
        </div>

        <div className={cx('credit')}>

        </div>
      </div>
    </div>
  );
}

export default Footer;