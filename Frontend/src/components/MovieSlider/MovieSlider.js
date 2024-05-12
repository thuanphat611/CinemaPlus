import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";

import styles from './MovieSlider.module.scss';

const cx = classNames.bind(styles);

function MovieSlider({ imageList }) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  let movieName = imageList[activeIndex].name;
  let movieIMDB = imageList[activeIndex].imdb;

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
  }, [slideDone]);

  const slideNext = () => {
    if (activeIndex < imageList.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    else {
      setActiveIndex(0);
    }
  }

  const slidePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    else {
      setActiveIndex(imageList.length - 1);
    }
  }

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div className={cx('container')}
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      <div className={cx('overlay')}></div>
      {
        imageList.map((image, index) => {
          return (
            <img 
              key={index} 
              className={
                cx("image",{
                  "image-active": index === activeIndex
                })
              } 
              src={image.imgURL} 
              alt={image.name}
            />
          )
        })
      }

      <div className={cx('movie-info')}>
        <h1 className={cx('movie-name')}>{movieName}</h1>
        <div className={cx('rating')}>
          <span className={cx('imdb-logo')}>IMDB</span>
          <h2 className={cx('imdb-score')}>{movieIMDB}</h2>
          <h2 className={cx('imdb-max-score')}>/</h2>
          <h2 className={cx('imdb-max-score')}>10</h2>
        </div>
        <img className={cx('poster')} src="https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg" alt={imageList[0].name}/>
      </div>

      <div className={cx('slider-button-group')}>
        <button className={cx('slider-button')} 
          onClick={(e) => {
            e.preventDefault();
            slidePrev();
          }}
        >
          <FaChevronLeft />
        </button>
        <button className={cx('slider-button')}
          onClick={(e) => {
            e.preventDefault();
            slideNext();
          }}
        >
          <FaChevronRight />
        </button>
        <div className={cx('slider-dot-container')}>
          {
            imageList.map((item, index) => {
              return (
                <button
                  key={index} 
                  className={
                    activeIndex === index ?
                    cx('slider-dot-active') : cx('slider-dot')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index);
                  }}
                >
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MovieSlider;