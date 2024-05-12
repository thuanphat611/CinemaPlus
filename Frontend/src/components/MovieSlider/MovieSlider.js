import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";

import styles from './MovieSlider.module.scss';

const cx = classNames.bind(styles);

function MovieSlider({ imageList }) {

  const [activeIndex, setActiveIndex] = useState(0);
  // let imageSrc = imageList[activeIndex].imgURL ? imageList[activeIndex].imgURL : "https://gugimages.s3.us-east-2.amazonaws.com/wp-content/uploads/2022/12/30214953/Avatar-2-poster-600x337.jpeg";

  useEffect(() => {
    
  });

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

  return (
    <div className={cx('container')}>
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
              alt={image.imgAlt}
            />
          )
        })
      }
      {/* <img className={cx('image')} src={imageSrc} alt=""/> */}
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