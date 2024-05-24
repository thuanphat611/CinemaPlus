import classNames from 'classnames/bind';
import { LuLoader2 } from "react-icons/lu";
import { useRef, useState, useEffect } from 'react';

import styles from './HomePage.module.scss';
import Header from '../../components/Header/Header';
import MovieSlider from '../../components/MovieSlider/MovieSlider';
import DiscoverBar from '../../components/DiscoverBar/DiscoverBar';
import AiringSeries from '../../components/AiringSeires/AiringSeires';
import CardSlider from '../../components/CardSlider/CardSlider';
import HightlightSection from '../../components/HightlightSection/HighlightSection';
import TrailerSection from '../../components/TrailerSection/TrailerSection';
import Social from '../../components/Social/Social';
import Footer from '../../components/Footer/Footer';
import { getListFromAPI, getDetailFromAPI, getTrailerFromAPI, getCastFromAPI } from '../../axios/AxiosClients';


const cx = classNames.bind(styles);

function HomePage() {

  const refList = {
    moviesRef: useRef(null),
    castsRef: useRef(null),
    seriesRef: useRef(null)
  }

  const emptyList = [
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: "",
      youtubeKey: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: "",
      youtubeKey: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: "",
      youtubeKey: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: "",
      youtubeKey: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: "",
      youtubeKey: ""
    }
  ];

  const emptyItem = {
    id: "",
    name: "",
    category: [],
    casts: [],
    director: "",
    overview: "",
    posterURL: "",
    more: ""
  }

  const [loading, setLoading] = useState(false);
  const [movieSliderData, setMovieSliderData] = useState(emptyList);
  const [popularMoviesData, setPopularMoviesData] = useState(emptyList);
  const [topRatedData, setTopRatedData] = useState(emptyList);
  const [animationData, setAnimationData] = useState(emptyList);
  const [seriesData, setSeriesData] = useState(emptyList);
  const [trailerData, setTrailerData] = useState(emptyList);
  const [castData, setCastData] = useState(emptyList);
  const [highlightMovie, setHighlightMovie] = useState(emptyItem);
  const [highlightSeries, setHighlightSeries] = useState(emptyItem);

  //Get MovieSlider data
  useEffect(() => {
    const movieSliderSize = 5;
    
    async function getData() {
      setLoading(true);

      let requestURL = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
      const results = await getListFromAPI(requestURL, 'movie');

      if (results.length >= 5) {
        setMovieSliderData(results.slice(0, movieSliderSize));
      }

      //Get Highlight movie data
      const random = Math.floor(Math.random() * (results.length - movieSliderSize)) + movieSliderSize;
      const randomIndex = random < results.length ? random : 0;
      const highlightMovieId = results[randomIndex].id;
      requestURL = 'https://api.themoviedb.org/3/movie/' + highlightMovieId + '?language=en-US'
      const movieDetail = await getDetailFromAPI(requestURL, 'movie');

      if (movieDetail) {
        setHighlightMovie(movieDetail);
      }

      setLoading(false);
    }
    getData();
  }, []);

  //Get Popular Movies section data
  useEffect(() => {
    async function getData() {
      setLoading(true);

      const requestURL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const results = await getListFromAPI(requestURL, 'movie');

      if (results.length > 0) {
        setPopularMoviesData(results);
      }

      setLoading(false);
    }
    getData();
  }, []);

  //Get Top Rated Movies section data
  useEffect(() => {
    async function getData() {
      setLoading(true);

      const requestURL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
      const results = await getListFromAPI(requestURL, 'movie');

      if (results.length > 0) {
        setTopRatedData(results);
      }

      setLoading(false);
    }
    getData();
  }, []);

  //Get Animations section data
  useEffect(() => {
    async function getData() {
      setLoading(true);

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const monthToString = month < 10 ? "0" + month : month;
      const currentTime = year + "-" + monthToString + "-" + day;

      const requestURL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.lte=' + currentTime + '&sort_by=popularity.desc&with_genres=16&with_original_language=en';

      const results = await getListFromAPI(requestURL, 'movie');

      if (results.length > 0) {
        setAnimationData(results);
      }

      setLoading(false);
    }
    getData();
  }, []);

  //Get Popular Series section data
  useEffect(() => {
    async function getData() {
      setLoading(true);

      const requestURL = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
      const results = await getListFromAPI(requestURL, 'tv');

      if (results.length > 0) {
        setSeriesData(results);
      }

      setLoading(false);
    }
    getData();
  }, []);
  
  //Get Highlight series data
  useEffect(() => {
    async function getData() {
      setLoading(true);

      let requestURL = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1';
      const results = await getListFromAPI(requestURL, 'tv');

      const random = Math.floor(Math.random() * results.length);
      const randomIndex = random < results.length ? random : 0;
      const highlightSeriesId = results[randomIndex].id;
      requestURL = 'https://api.themoviedb.org/3/tv/' + highlightSeriesId + '?language=en-US'
      const seriesDetail = await getDetailFromAPI(requestURL, 'tv');

      if (seriesDetail) {
        setHighlightSeries(seriesDetail);
      }

      setLoading(false);
    }
    getData();
  }, []);

  //Get Trailer section data
  useEffect(() => {
    async function getData() {
      setLoading(true);

      let requestURL = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
      const results = await getTrailerFromAPI(requestURL);

      if (results.length > 0) {
        setTrailerData(results);
      }

      setLoading(false);
    }
    getData();
  }, []);

  //Get the cast data
  useEffect(() => {
    async function getData() {
      setLoading(true);

      let requestURL = 'https://api.themoviedb.org/3/trending/person/week?language=en-US';
      const results = await getCastFromAPI(requestURL);

      if (results.length > 0) {
        setCastData(results);
      }

      setLoading(false);
    }
    getData();
  }, []);

  return ( 
    <div className={cx('content')}>
      <Header refList={refList} />
      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 />
      </div>
      
      <span className={cx({'no-display': loading})}>
        <MovieSlider imageList={movieSliderData} />
        <DiscoverBar />
        <div className={cx('space-under-slider')}></div>
        <AiringSeries />
        <CardSlider ref={refList.moviesRef} title="Popular Movies" viewAll="/movie" source={popularMoviesData} type="movie" />
        <CardSlider title="Top Rated Movies" viewAll="/movie" source={topRatedData} type="movie" />
        <HightlightSection source={highlightMovie} />
        <CardSlider ref={refList.seriesRef} title="Popular Series" viewAll="/movie" source={seriesData} type="movie" />
        <CardSlider title="Animations" viewAll="/movie" source={animationData} type="movie" />
        <HightlightSection source={highlightSeries} />
        <CardSlider ref={refList.castsRef} title="Actors" viewAll="/cast" source={castData} type="cast" />
        <TrailerSection source={trailerData} />
        <Social />
        <Footer />
      </span>
    </div>
  );
}

export default HomePage;