import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";

import styles from './Footer.module.scss';
import logo from '../../assests/images/logo.png'
import googlePlay from '../../assests/images/google_play.png';
import appStore from '../../assests/images/app_store.png';
import microsoftStore from '../../assests/images/microsoft_store.png';

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
            <h4 className={cx('title')}>Your Free Ticket to Endless Entertainment</h4>
            <p className={cx('introduction-text')}>
              CinemaPlus is your ultimate destination for streaming movies and TV series. Dive into a vast library of genres, discover new releases, and enjoy high-quality entertainment anytime, anywhere. Elevate your viewing experience with personalized recommendations, exclusive content, and seamless streaming on all your devices with CinemaPlus.
            </p>
          </div>
          <div className={cx('downloads')}>
            <div className={cx('download-upper')}>
              <div className={cx('download-app')}>
                <h2 className={cx('download-text')}>Download CinemaPlus App</h2>
                <a className={cx('download-btn')} href="/" onClick={(e) => { e.preventDefault(); }}>
                  <FiDownload />
                </a>
              </div>
  
              <Link className={cx('certificate')} to="/certificate">
                <h2 className={cx('download-text')}>Certificate</h2>
              </Link>
            </div>

            <div className={cx('download-blocks')}>
              <div className={cx('block')}>
                <h4 className={cx('block-title')}>Download From</h4>
                <a className={cx('block-link')} href="https://play.google.com/store/apps" rel="noreferrer" target="_blank">
                  <img className={cx('block-img')} src={googlePlay} alt=""/>
                </a>
              </div>
              <div className={cx('block')}>
                <h4 className={cx('block-title')}>Download From</h4>
                <a className={cx('block-link')} href="https://www.apple.com/app-store/" rel="noreferrer" target="_blank">
                  <img className={cx('block-img')} src={appStore} alt=""/>
                </a>
              </div>
              <div className={cx('block')}>
                <h4 className={cx('block-title')}>Download From</h4>
                <a className={cx('block-link')} href="https://apps.microsoft.com/home" rel="noreferrer" target="_blank">
                  <img className={cx('microsoft-store-icon')} src={microsoftStore} alt=""/>
                  <h4 className={cx('microsoft-store-text')}>Microsoft Store</h4>
                </a>
              </div>
              <div className={cx('block')}>
                
              </div>
            </div>
          </div>
        </div>

        <div className={cx('credit')}>

        </div>
      </div>
    </div>
  );
}

export default Footer;