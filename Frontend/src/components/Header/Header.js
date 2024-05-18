import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FaMagnifyingGlass } from "react-icons/fa6";

import logo from '../../assests/images/logo.png'

const cx = classNames.bind(styles);

function Header({ refList }) {

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToRef = (cardRef) => {
    if (cardRef.current) {
      const topOffset = cardRef.current.offsetTop;
      window.scrollTo({
        top: topOffset - 100,
        behavior: 'smooth' 
      });
    }
  };

  return ( 
    <div ref={headerRef} className={cx('header')}>
      <a className={cx('logo-container')} href='/'> 
        <img className={cx('logo')} src={logo} alt=""/>
      </a>

      <ul className={cx('navigation')}>
        <li className={cx('navigation-item')}>
          <button 
            className={cx('navigation-link')}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <h3 className={cx('navigation-text')}>Home</h3>
          </button>
        </li>
        <li className={cx('navigation-item')}>
          <a className={cx('navigation-link')} href="/" 
            onClick={(e) => { 
              e.preventDefault();
              scrollToRef(refList.moviesRef); 
            }} 
          >
            <h3 className={cx('navigation-text')}>Movies</h3>
          </a>
        </li>
        <li className={cx('navigation-item')}>
          <a className={cx('navigation-link')} href="/"
            onClick={(e) => { 
              e.preventDefault();
              scrollToRef(refList.seriesRef); 
            }} 
          >
            <h3 className={cx('navigation-text')}>Series</h3>
          </a>
        </li>
        <li className={cx('navigation-item')}>
          <a className={cx('navigation-link')} href="/"
            onClick={(e) => { 
              e.preventDefault();
              scrollToRef(refList.castsRef); 
            }} 
          >
            <h3 className={cx('navigation-text')}>Actors</h3>
          </a>
        </li>
        <li className={cx('navigation-item')}>
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