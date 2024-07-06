import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";
import classNames from "classnames/bind";

import style from './WatchPage.module.scss';
import Player from '../../components/Player/Player';
import { getSeasonListFromAPI } from '../../api/AxiosClients';

const cx = classNames.bind(style);

function WatchPage({ props }) {
  const type = props.type === 'series' ? 'tv' : 'movie';
  const { id, season, episode } = useParams();
  // console.log(type, id, season, episode);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const requestURL = 'https://api.themoviedb.org/3/' + type + '/' + id;
      const response = await getSeasonListFromAPI(requestURL, type);
      setData(response);
    }
    getData();
  },[])

  return (
    <div className={cx('content')}>
      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 className={cx('loader-icon')} />
      </div>
      
      <span className={cx({'no-display': loading})}>
        <Player id={id} data={data.seasons} season={season} episode={episode} type={type}/>
      </span>
    </div>
  );
}

export default WatchPage;