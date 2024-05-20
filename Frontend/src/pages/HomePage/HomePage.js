import classNames from 'classnames/bind';
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
      poster: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: ""
    },
    {
      id: "",
      imgURL: "",
      name: "",
      imdb: "",
      poster: ""
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

  const trailers = [
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    },
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    }
  ];

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

  const [loading, setLoading] = useState(false);
  const [movieSliderData, setMovieSliderData] = useState(emptyList);
  const [popularMoviesData, setPopularMoviesData] = useState(emptyList);
  const [topRatedData, setTopRatedData] = useState(emptyList);
  const [animationData, setAnimationData] = useState(emptyList);
  const [seriesData, setSeriesData] = useState(emptyList);

  const [highlightMovie, setHighlightMovie] = useState(emptyItem);
  const [highlightSeries, setHighlightSeries] = useState(emptyItem);

  //Get MovieSlider data
  useEffect(() => {
    const movieSliderSize = 5;
    
    async function getData() {
      setLoading(true);

      let requestURL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
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

  return ( 
    <div className={cx('content')}>
      <Header refList={refList} />
      <MovieSlider imageList={movieSliderData} />
      <DiscoverBar />
      <div className={cx('space-under-slider')}></div>
      <CardSlider ref={refList.moviesRef} title="Popular Movies" viewAll="/movie" source={popularMoviesData} type="movie" />
      <CardSlider title="Top Rated Movies" viewAll="/movie" source={topRatedData} type="movie" />
      <HightlightSection source={highlightMovie} />
      <CardSlider ref={refList.seriesRef} title="Popular Series" viewAll="/movie" source={seriesData} type="movie" />
      <CardSlider title="Animations" viewAll="/movie" source={animationData} type="movie" />
      <HightlightSection source={highlightSeries} />
      <CardSlider ref={refList.castsRef} title="Actors" viewAll="/cast" source={popularMoviesData} type="cast" />
      <TrailerSection source={trailers} />
      <Social />
      <Footer />
    </div>
  );
}

export default HomePage;