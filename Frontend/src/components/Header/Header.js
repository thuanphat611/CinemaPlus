import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FaMagnifyingGlass } from "react-icons/fa6";

const cx = classNames.bind(styles);

function Header() {

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 500) {
        headerRef.current.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0))';
      } else {
        headerRef.current.style.background = 'rgba(22, 22, 22, 1)';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };   
  },[]);

  return ( 
    <div ref={headerRef} className={cx('header')} id='header'>
      <div className={cx('logo')}>
        <a href={cx('header')}> 
          <img src="" alt=""/>
        </a>
      </div>

      <ul className={cx('navigation')}>
        <li>
          <a className={cx('navigation-link')} href="/">
            <h3 className={cx('navigation-text')}>Home</h3>
          </a>
        </li>
        <li>
          <a className={cx('navigation-link')} href="/">
            <h3 className={cx('navigation-text')}>Movie</h3>
          </a>
        </li>
        <li>
          <a className={cx('navigation-link')} href="/">
            <h3 className={cx('navigation-text')}>Series</h3>
          </a>
        </li>
        <li>
          <a className={cx('navigation-link')} href="/">
            <h3 className={cx('navigation-text')}>Actors</h3>
          </a>
        </li>
        <li>
          <div className={cx('search-icon')}>
            <FaMagnifyingGlass/>
          </div>
        </li>
      </ul>

      <div className={cx('header-button-group')}>
        <button className={cx('login-btn')}>Login</button>
        <button className={cx('signup-btn')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Header;