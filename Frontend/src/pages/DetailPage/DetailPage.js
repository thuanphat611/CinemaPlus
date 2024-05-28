import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import { LuLoader2 } from "react-icons/lu";

import styles from './DetailPage.module.scss';
import { getDetailFromAPI } from '../../axios/AxiosClients';
import Header from '../../components/Header/Header';
import MovieOverview from '../../components/MovieOverview/MovieOverview';
import Footer from '../../components/Footer/Footer';

const cx = classNames.bind(styles);

function DetailPage({ props }) {
  const type = props.type === 'series' ? 'tv' : 'movie';
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const getData =  async () => {
      setLoading(true);

      const requestURL = 'https://api.themoviedb.org/3/' + type + '/' + id;
      const result = await getDetailFromAPI(requestURL, type);
      setData(result);

      setLoading(false)
    }
    getData();
  }, [id, type]);

  return ( 
    <div className={cx('content')}>
      <Header />
      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 />
      </div>
      
      <span className={cx({'no-display': loading})}>
        <MovieOverview data={data} targetId={id} type={type}/>
        <Footer />
      </span>
    </div>
  );
}

export default DetailPage;