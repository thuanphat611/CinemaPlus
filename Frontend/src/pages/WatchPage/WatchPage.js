import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";
import classNames from "classnames/bind";

import style from './WatchPage.module.scss';
import Player from '../../components/Player/Player';

const cx = classNames.bind(style);

function WatchPage({ props }) {
  const type = props.type === 'series' ? 'tv' : 'movie';
  const { id } = useParams();
  console.log(type, id);

  const [loading, setLoading] = useState(false);

  return (
    <div className={cx('content')}>
      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 className={cx('loader-icon')} />
      </div>
      
      <span className={cx({'no-display': loading})}>
        <Player id={id} type={type}/>
      </span>
    </div>
  );
}

export default WatchPage;