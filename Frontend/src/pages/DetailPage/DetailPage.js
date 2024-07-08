import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import { LuLoader2 } from "react-icons/lu";
import { FaMoneyBills } from "react-icons/fa6";
import { GrStatusInfo } from "react-icons/gr";
import { IoLanguage } from "react-icons/io5";

import styles from './DetailPage.module.scss';
import { getCollectionFromAPI, getDetailFromAPI, getCreditFromAPI, getRelatedTrailerFromAPI } from '../../api/AxiosClients';
import Header from '../../components/Header/Header';
import MovieOverview from '../../components/MovieOverview/MovieOverview';
import CardSlider from '../../components/CardSlider/CardSlider';
import EpisodeSection from '../../components/EpisodeSection/EpisodeSection';
import TrailSection from '../../components/TrailerSection/TrailerSection';
import Footer from '../../components/Footer/Footer';

const cx = classNames.bind(styles);

function DetailPage({ props }) {
  const type = props.type === 'series' ? 'tv' : 'movie';
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [numToLoad, setNumToLoad] = useState(0);
  const [numLoaded, setNumLoaded] = useState(0);
  const [data, setData] = useState(undefined);
  const [collection, setCollection] = useState([]);
  const [casts, setCasts] = useState({});
  const [videos, setVideos] = useState([]);

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

      let requestURL = 'https://api.themoviedb.org/3/' + type + '/' + id;
      let result = await getDetailFromAPI(requestURL, type);
      setData(result);

      if (result?.collection) {
        requestURL = 'https://api.themoviedb.org/3/collection/' + result.collection.id + '?language=en-US';
        const resultCollection = await getCollectionFromAPI(requestURL, type);
        setCollection(resultCollection);
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, [id, type]);
  
  //Load casts and director
  useEffect(() => {
    const getData =  async () => {
      setNumToLoad((val) => val + 1);

      const requestURL = 'https://api.themoviedb.org/3/' + type + '/' + id + '/credits?language=en-US';
      const result = await getCreditFromAPI(requestURL);
      setCasts(result);

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, [id, type]);

  //Load trailers and teasers
  useEffect(() => {
    const getData =  async () => {
      setNumToLoad((val) => val + 1);
      const result = await getRelatedTrailerFromAPI(id, type);
      setVideos(result);

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, [id, type]);

  return ( 
    <div className={cx('content')}>
      <Header loading={loading} />
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

        <span className={cx({'no-display': type === 'movie'})}>
          <EpisodeSection id={id} type={type} data={type !== 'movie' ? data?.seasons : undefined} />
        </span>

        <span className={cx({'no-display': videos?.length === 0})}>
          <TrailSection title={'Teasers& Trailers'} horizontal source={videos} />
        </span>

        <span className={cx({'no-display': casts?.director?.length === 0})}>
          <CardSlider scroll title='Director' source={casts.director} type='person'/>
        </span>
        <span className={cx({'no-display': casts?.cast?.length === 0})}>
          <CardSlider scroll title='Casts' source={casts.cast} type='person'/>
        </span>
        <span className={cx({'no-display': collection?.length === 0})}>
          <CardSlider scroll title='Collection' source={collection} type='movie'/>
        </span>

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