import classNames from "classnames/bind";
// import { Link  } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";

import MovieCard from "../MovieCard/MovieCard";
import CastCard from "../CastCard/CastCard";
import PersonCard from '../PersonCard/PersonCard';
import styles from './CardSlider.module.scss';

const cx = classNames.bind(styles);

const CardSlider = React.forwardRef(({ title, source, type, scroll }, ref) => {
  const sliderTitle = title ? title : 'None titled';
  const sliderContent = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = source ? source.length : 0;
  let slideOffset = 0

  if (type === "movie")
    slideOffset = 203;
  else if (type ==="cast")
    slideOffset = 233;

  useEffect(() => {
    if (sliderContent) {
      sliderContent.current.style = "transform: translateX(-"+ ((slideOffset + 15) * currentPage) +"px)"; // tùy theo width và margin left của card
    }
  });

  const slideNext = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
    else {
      setCurrentPage(0);
    }
  }

  const slidePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    else {
      setCurrentPage(pages - 1);
    }
  }

  return (
    <div ref={ref} className={cx('container')}>
      <div className={cx('header')}>
        <h2 className={cx('title')}>{sliderTitle}</h2>
        {/* <Link className={cx('view-all')} to={viewAll ? viewAll : "/"} >
          View all
        </Link> */}
      </div>
      <div className={cx('slider')}>
        <div className={cx('slider-border', {'scroll-border': scroll})}>
          <div ref={sliderContent} className={cx('slider-content')}>
          {
            source 
            ?
            source.map((item, index) => {
              if (type === "cast") {
                return (
                  <CastCard key={index} profileURL={item.poster} name={item.name} homepage={item.homepage} birthday={item.birthday} />
                );
              }
              else if (type === "movie") {
                return (
                  <MovieCard key={index} id={item.id} posterURL={item.poster} name={item.name} type={item.type} />
                );
              }
              else if (type === 'person') {
                return (
                  <PersonCard key={index} profileURL={item.poster} name={item.name} />
                );
              }
              return null;
            })
            : 
            null
          }
          </div>
        </div>

        <button className={cx('slider-button',{'no-display': scroll})} 
          onClick={(e) => {
            e.preventDefault();
            slidePrev();
          }}
        >
          <FaChevronLeft />
        </button>
        <button className={cx('slider-button',{'no-display': scroll})}
          onClick={(e) => {
            e.preventDefault();
            slideNext();
          }}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
})


export default CardSlider;