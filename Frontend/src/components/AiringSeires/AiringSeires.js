import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";

import styles from './AiringSeries.module.scss';
import { tmdbClient } from "../../axios/AxiosClients";

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
  ]
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [dataList, setDataList] = useState(emptyData);
  const [highlightSeries, setHighlightSeries] = useState(emptyData[0]);
  const today = new Date();
  const selectedDate = new Date(today);
  const [currentDate, setCurrentDate] = useState(today.getDay());
  const [loading, setLoading] = useState (false);

  if (currentDate !== today.getDay()) {
    selectedDate.setDate(today.getDate() - today.getDay() + currentDate);
  }

  const getDataFromAPI = async (url) => {
    const response = await tmdbClient.get(url);
    
    let results = response?.data?.results.map((item) => {
      return {
        id: item.id,
        name: item.name,
        original_language: item.original_language,
        poster: item.poster_path ? 'https://image.tmdb.org/t/p/w154' + item.poster_path : imagePlaceholder,
        bigPoster: item.poster_path ? 'https://image.tmdb.org/t/p/w342' + item.poster_path : imagePlaceholder
      };
    })

    //get english movies only
    results = results.filter((item) => item.original_language === 'en');

    for (var i = 0; i < results.length; i++) {
      const requestURL = 'https://api.themoviedb.org/3/tv/' + results[i].id;
      const detail = await tmdbClient.get(requestURL);
      const data = detail?.data;

      results[i].last_episode = data.last_episode_to_air?.air_date ? data.last_episode_to_air.air_date : '';
      results[i].next_episode = data.next_episode_to_air?.air_date ? data.next_episode_to_air.air_date : '';
    }

    const selectedDateToString =  `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1 < 10 ? '0' + (selectedDate.getMonth() + 1) : selectedDate.getMonth() + 1 }-${selectedDate.getDate()}`;
    results = results.filter((item) => item.last_episode === selectedDateToString || item.next_episode === selectedDateToString);
    return results;
  }

  useEffect(() => {
    const getData = async () => {
      let finalResults = [];
      const maxPage = 10;

      var i = 0
      setLoading(true);
      while (finalResults.length < 9) {
        let requestURL = 'https://api.themoviedb.org/3/tv/on_the_air?language=en&page=' + Number(i + 1);
        let results = await getDataFromAPI(requestURL);
  
        finalResults = [...finalResults, ...results];

        i++;
        if (i > maxPage) {
          break;
        }
      }
      setLoading(false);

      setHighlightSeries(finalResults[0])
      setDataList(finalResults.slice(1, 9));
    }
    getData();
  }, [currentDate]);

  return (
    <div className={cx('container')}>
      <div className={cx('day-group')}>
        {
          days.map((day, index) => {
            return <button key={index} className={cx('day-button', {'button-active': index === currentDate})} onClick={() => { setCurrentDate(index) }}>{day}</button>;
          })
        }
      </div>

      <span className={cx('content-wrapper', {'no-display': loading})}>
        <div className={cx('series-list')}>
          {
            dataList.map((item, index) => {
              return (
                <div key={index} className={cx('series-item-wrapper')}>
                <Link className={cx('series-item')} to={'/series?id=' + item.id}>
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
        
        <Link className={cx('highlight-series-item')} to={'/series?id=' + highlightSeries.id}>
          <img className={cx('highlight-series-img')} src={highlightSeries.bigPoster} alt ={highlightSeries.name} />
          <div className={cx('highlight-series-info')}>
            <h4 className={cx('highlight-series-name')}>{highlightSeries.name}</h4>
          </div>
        </Link>
      </span>

      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 />
      </div>
    </div>
  );
}

export default AiringSeries;