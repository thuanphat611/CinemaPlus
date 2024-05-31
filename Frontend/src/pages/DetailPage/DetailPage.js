import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import { LuLoader2 } from "react-icons/lu";
import { FaMoneyBills } from "react-icons/fa6";
import { GrStatusInfo } from "react-icons/gr";
import { IoLanguage } from "react-icons/io5";

import styles from './DetailPage.module.scss';
import { getDetailFromAPI } from '../../axios/AxiosClients';
import Header from '../../components/Header/Header';
import MovieOverview from '../../components/MovieOverview/MovieOverview';
import Footer from '../../components/Footer/Footer';

const cx = classNames.bind(styles);

function DetailPage({ props }) {
  const type = props.type === 'series' ? 'tv' : 'movie';
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [numToLoad, setNumToLoad] = useState(0);
  const [numLoaded, setNumLoaded] = useState(0);
  const [data, setData] = useState(undefined);

  const formatMoney = (money) => {
    money = money.toString();
    var result = '';
    var count = 0;

    for (var i = money.length - 1; i >= 0; i--) {
      result = money[i] + result;
      count++;
      if (count === 3 && i !== 0) {
        result = ',' + result;
        count = 0;
      } 
    }

    return result;
  }

  //useEffect to check if the page is completely loaded
  useEffect(() => {
    if (numLoaded >= numToLoad) {
      setLoading(false);
    }
    else {
      setLoading(true);
    }
  }, [numToLoad, numLoaded]);

  //Load movie detail
  useEffect(() => {
    const getData =  async () => {
      setNumToLoad((val) => val + 1);

      const requestURL = 'https://api.themoviedb.org/3/' + type + '/' + id;
      const result = await getDetailFromAPI(requestURL, type);
      setData(result);

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, [id, type]);

  return ( 
    <div className={cx('content')}>
      <Header />
      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 className={cx('loader-icon')} />
      </div>
      
      <span className={cx({'no-display': loading})}>
        <MovieOverview data={data} targetId={id} type={type}/>

        <div className={cx('info-bar')}>
          <div className={cx('info-item')}>
            <h3 className={cx('info-title')}>Original Title</h3>
            <div className={cx('info-content')}>
              <p className={cx('info-value')}>{data?.original_name ? data.original_name : data?.name}</p>
            </div>
          </div>
          <div className={cx('info-item')}>
            <h3 className={cx('info-title')}>
              <span className={cx('info-title-icon')}><GrStatusInfo /></span>
              Status
            </h3>
            <div className={cx('info-content')}>
              <p className={cx('info-value')}>{data?.status ? data.status : '_'}</p>
            </div>
          </div>
          <div className={cx('info-item')}>
            <h3 className={cx('info-title')}>
              <span className={cx('info-title-icon')}><IoLanguage /></span>
              Original Language
            </h3>
            <div className={cx('info-content')}>
              <p className={cx('info-value')}>{data?.original_language ? data.original_language : '_'}</p>
            </div>
          </div>
          <div className={cx('info-item')}>
            <h3 className={cx('info-title')}>
              <span className={cx('info-title-icon')}><FaMoneyBills /></span>
              Budget
            </h3>
            <div className={cx('info-content')}>
              <p className={cx('info-value')}>{data?.budget ? '$' + formatMoney(data.budget) : '_'}</p>
            </div>
          </div>
        </div>

        <h3 className={cx('section-title')}>Production Compan{data?.production_companies.length > 1 ? 'ies' : 'y'}:</h3>
        <div className={cx('production-companies')}>
          {
            data?.production_companies?.map((item, index) => {
              if (item.img)
                return (
                  <img key={index} className={cx('production-company')} src={item.img} alt={item.name}/>
                )
              else 
                return (
                  <div key={index} className={cx('no-logo')}>{item.name}</div>
                )
            })
          }
        </div>
        
        <Footer />
      </span>
    </div>
  );
}

export default DetailPage;