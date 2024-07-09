import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";

import styles from './AiringSeries.module.scss';
import { getListFromAPI } from "../../api/tmdb";

const cx = classNames.bind(styles);

function AiringSeries() {
  const imagePlaceholder = 'https://placehold.co/342x513?text=No+Image';
  const emptyData = [
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
    {
      id: '',
      name: '',
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder
    },
  ]
  const [loading, setLoading] = useState (false);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dataList, setDataList] = useState(emptyData);
  const [highlightSeries, setHighlightSeries] = useState(emptyData[0]);
  
  const today = new Date();
  const currentDate = today.getDay();
  
  const dateToString = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
  }
  

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let finalResults = [];

      var i = 1;
      while (finalResults.length < 9) {
        let requestURL = 'https://api.themoviedb.org/3/tv/popular?language=en&page=' + i;
        const results = await getListFromAPI(requestURL, 'tv');
        finalResults = [...finalResults, ...results];
        i++
      }
      setLoading(false);

      setHighlightSeries(finalResults[0])
      setDataList(finalResults.slice(1, 9));
    }
    getData();
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('day-group')}>
        {
          days.map((day, index) => {
            return <div key={index} className={cx('day-button', {'button-active': index === currentDate})}>{day}</div>;
          })
        }
      </div>

      <span className={cx('content-wrapper', {'no-display': loading})}>
        <div className={cx('series-list')}>
          {
            dataList.map((item, index) => {
              return (
                <div key={index} className={cx('series-item-wrapper')}>
                <Link className={cx('series-item')} to={'/series/detail/' + item?.id} 
                  onClick={(e) => {
                    if (!item.id)
                      e.preventDefault();
                  }}
                >
                  <img className={cx('series-img')} src={item.poster} alt ={item.name} />
                  <div className={cx('series-info')}>
                    <h4 className={cx('series-name')}>{item.name}</h4>
                  </div>
                </Link>
              </div>
              )
            })
          }
        </div>
        
        <Link className={cx('highlight-series-item')} to={'/series/detail/' + highlightSeries?.id}
          onClick={(e) => {
            if (!highlightSeries.id)
              e.preventDefault();
          }}
        >
          <img className={cx('highlight-series-img')} src={highlightSeries.poster} alt ={highlightSeries?.name} />
          <div className={cx('highlight-series-info')}>
            <h4 className={cx('highlight-series-name')}>{highlightSeries?.name}</h4>
          </div>
        </Link>
      </span>

      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 className={cx('loader-icon')} />
      </div>
    </div>
  );
}

export default AiringSeries;