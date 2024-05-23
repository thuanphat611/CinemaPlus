import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import logo from '../../assests/images/logo.png'
import { tmdbClient } from '../../axios/AxiosClients';

const cx = classNames.bind(styles);

function Header({ refList }) {

  const tempData = [
    {
      posterURL: 'https://image.tmdb.org/t/p/w92/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
      name: 'Movie\'s name',
      type: 'Movie'
    }
  ]

  const [searchText, setSearchText] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const headerRef = useRef(null);

  const getListFromURL = async (url, type) => {
    const response = await tmdbClient.get(url);
    let results = response?.data?.results.map((item) => {
      return {
        id: item.id,
        type: type === 'tv' ? 'series' : 'movie',
        name: item.title ? item.title : item.name,
        originalLanguage: item.original_language,
        imdb: null,
        imgURL: 'https://image.tmdb.org/t/p/original' + item.backdrop_path,
        poster: 'https://image.tmdb.org/t/p/w92' + item.poster_path
      }
    })

    return results;
  }

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

  //Get result for searchbar
  useEffect(() => {
    const getResult = async () => {
      let requestURL = 'https://api.themoviedb.org/3/search/movie?query=' + searchText + '&language=en';
      const movieList = await getListFromURL(requestURL, 'movie');

      requestURL = 'https://api.themoviedb.org/3/search/tv?query=' + searchText + '&language=en'
      const seriesList = await getListFromURL(requestURL, 'tv');

      const result = [...movieList, ...seriesList];
      setSearchResult(result);
    }

    if (searchText.length === 0) {
      setSearchResult([]);
      return;
    }
    getResult();
  }, [searchText])

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
          <div className={cx('search-border')}>
            <div className={cx('search-wrap', { 'search-open': searchOpen })}>
              <div className={cx('search-bar')}>
                <input className={cx('search-input')} value={searchText} type='text' 
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <button 
                  className={cx('search-clear')} 
                  onClick={(e) => {
                  e.preventDefault();
                  setSearchText('');
                  }}
                > 
                  <IoClose className={cx({'no-display': searchText.length === 0})} />
                </button>
              </div>
  
              <div className={cx('search-icon')} 
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText('');
                  setSearchOpen((val) => !val);
                }}
              >
                <FaMagnifyingGlass/>
              </div>
  
            </div>
          </div>

          <div className={cx('search-result-wrapper', {'no-display': searchText.length === 0})}>
            <div className={cx('search-results')}>
              {
                searchResult.map((item, index) => {
                  return (
                    <Link key={index} className={cx('result-item')} to={'/' + item.type + '?id=' + item.id}>
                      <img className={cx('result-img')} src={item.poster} alt={item.name} />
                      <div className={cx('result-info')}>
                        <h3 className={cx('result-name')}>{item.name}</h3>
                        <p className={cx('result-type')}>{item.type}</p>
                      </div>
                    </Link>
                  )
                })
              }
              
              <div className={cx('no-result', { 'no-display': searchResult.length > 0})}>
                <p className={cx('no-result-text')}>No results</p>
              </div>
            </div>
          </div>
          
        </li>
      </ul>

      <div className={cx('header-button-group')}>
        <button className={cx('login-btn')}>Premium</button>
        <button className={cx('signup-btn')}>Sign In</button>
      </div>
    </div>
  );
}

export default Header;