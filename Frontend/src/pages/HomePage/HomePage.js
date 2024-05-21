import classNames from 'classnames/bind';
import { LuLoader2 } from "react-icons/lu";
import { useRef, useState, useEffect } from 'react';

import styles from './HomePage.module.scss';
import Header from '../../components/Header/Header';
import MovieSlider from '../../components/MovieSlider/MovieSlider';
import DiscoverBar from '../../components/DiscoverBar/DiscoverBar';
import CardSlider from '../../components/CardSlider/CardSlider';
import HightlightSection from '../../components/HightlightSection/HighlightSection';
import TrailerSection from '../../components/TrailerSection/TrailerSection';
import Social from '../../components/Social/Social';
import Footer from '../../components/Footer/Footer';

import { tmdbClient } from '../../axios/AxiosClients';

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

  const getListFromURL = async (url, type) => {
    const response = await tmdbClient.get(url);
    let results = response?.data?.results.map((item, index) => {
      return {
        id: item.id,
        type: type === 'tv' ? 'series' : 'movie',
        name: item.title ? item.title : item.name,
        originalLanguage: item.original_language,
        imdb: null,
        imgURL: 'https://image.tmdb.org/t/p/original' + item.backdrop_path,
        poster: 'https://image.tmdb.org/t/p/w342' + item.poster_path
      }
    })

    //Streaming api can only support movies in English
    results = results.filter((item) => {
      return item.originalLanguage === 'en';
    });

    return results;
  }

  const getDetailFromURL = async (url, type) => {
    let numOfCasts = 3;

    if (type === 'tv') {
      numOfCasts = 5
    }

    const detail = await tmdbClient.get(url);
    let result = undefined;
    if (detail) {
      const data = detail?.data;
      result = {
        id: data.id,
        type: type === 'tv' ? 'series' : 'movie',
        name: data.title ? data.title : data.name,
        category: data.genres?.map((item) => {
          return item.name;
        }),
        casts: [],
        director: "",
        overview: data.overview,
        posterURL: 'https://image.tmdb.org/t/p/original' + data.backdrop_path,
        more: data.homepage
      }

      let requestURL = 'https://api.themoviedb.org/3/' + type + '/' + result.id + '/credits?language=en-US';
      const response = await tmdbClient.get(requestURL);
      const casts = response?.data?.cast;
      const castList = casts
      .filter((item, index) => {
        return index < numOfCasts;
      })
      .map((item) => {
        return item.name;
      })
      const director = response?.data?.crew?.filter((item) => {
        return item.job === "Director" && item.department === "Directing";
      })

      result.director = director[0]?.name;
      result.casts = castList;
    }

    return result;
  }

  const getTrailerFromURl = async (url) => {
    let response = await tmdbClient.get(url);
    let results = response?.data?.results.map((item, index) => {
      return {
        id: item.id,
        name: item.title ? item.title : item.name,
        originalLanguage: item.original_language,
        imgURL: 'https://image.tmdb.org/t/p/w300' + item.backdrop_path
      }
    })

    //English movies only
    results = results.filter((item) => {
      return item.originalLanguage === 'en';
    });

    //Get the youtube trailer link
    for (var i = 0; i < results.length; i++) {
      const requestURL = 'https://api.themoviedb.org/3/movie/'+ results[i].id +'/videos?language=en-US';
      response = await tmdbClient.get(requestURL);
      const data = response?.data;

      const trailer = data?.results.filter((item) => {
        return item.site === 'YouTube' && item.type === 'Trailer';
      })

      //Find the final offical trailer
      const officalTrailer = trailer.filter((item) => {
        return item.name.includes('Official Trailer');
      })

      if (officalTrailer.length !== 0) {
        results[i].youtubeKey = officalTrailer[0].key;
      }
      else {
        results[i].youtubeKey = trailer[0].key;
      }
    }

    return results;
  }

  const getCastFromURL = async (url) => {
    let response = await tmdbClient.get(url);
    let results = response?.data?.results.map((item, index) => {
      return {
        id: item.id,
        known_for_department: item.known_for_department,
        name: item.title ? item.title : item.name,
        poster: 'https://image.tmdb.org/t/p/w185' + item.profile_path
      }
    })

    //Get actors only
    results = results.filter((item) => {
      return item.known_for_department === 'Acting';
    });

    //Get birthday and homepage
    for (var i = 0; i < results.length; i++) {
      const requestURL = 'https://api.themoviedb.org/3/person/' + results[i].id + '?language=en-US';
      response = await tmdbClient.get(requestURL);
      const data = response?.data;

      results[i].birthday = data.birthday;
      results[i].homepage = data.homepage;
    }

    return results;
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
      const results = await getListFromURL(requestURL, 'movie');

      if (results.length >= 5) {
        setMovieSliderData(results.slice(0, movieSliderSize));
      }

      //Get Highlight movie data
      const random = Math.floor(Math.random() * (results.length - movieSliderSize)) + movieSliderSize;
      const randomIndex = random < results.length ? random : 0;
      const highlightMovieId = results[randomIndex].id;
      requestURL = 'https://api.themoviedb.org/3/movie/' + highlightMovieId + '?language=en-US'
      const movieDetail = await getDetailFromURL(requestURL, 'movie');

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
      const results = await getListFromURL(requestURL, 'movie');

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
      const results = await getListFromURL(requestURL, 'movie');

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

      const results = await getListFromURL(requestURL, 'movie');

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
      const results = await getListFromURL(requestURL, 'tv');

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
      const results = await getListFromURL(requestURL, 'tv');

      const random = Math.floor(Math.random() * results.length);
      const randomIndex = random < results.length ? random : 0;
      const highlightSeriesId = results[randomIndex].id;
      requestURL = 'https://api.themoviedb.org/3/tv/' + highlightSeriesId + '?language=en-US'
      const seriesDetail = await getDetailFromURL(requestURL, 'tv');

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
      const results = await getTrailerFromURl(requestURL);

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
      const results = await getCastFromURL(requestURL);

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
      
      <span className={cx({
        'no-display': loading
      })}>
        <MovieSlider imageList={movieSliderData} />
        <DiscoverBar />
        <div className={cx('space-under-slider')}></div>
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
      <div className={cx('loader', { 'no-display': !loading})}>
        <LuLoader2 />
      </div>
    </div>
  );
}

export default HomePage;