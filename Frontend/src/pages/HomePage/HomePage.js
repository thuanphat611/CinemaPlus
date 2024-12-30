import classNames from "classnames/bind";
import { LuLoader2 } from "react-icons/lu";
import { useRef, useState, useEffect } from "react";

import styles from "./HomePage.module.scss";
import Header from "../../components/Header/Header";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import DiscoverBar from "../../components/DiscoverBar/DiscoverBar";
import AiringSeries from "../../components/AiringSeries/AiringSeries";
import CardSlider from "../../components/CardSlider/CardSlider";
import HightlightSection from "../../components/HightlightSection/HighlightSection";
import TrailerSection from "../../components/TrailerSection/TrailerSection";
import Social from "../../components/Social/Social";
import Footer from "../../components/Footer/Footer";
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";

const cx = classNames.bind(styles);

function HomePage({ props }) {
  const refList = {
    moviesRef: useRef(null),
    castsRef: useRef(null),
    seriesRef: useRef(null),
  };

  const [loading, setLoading] = useState(true);
  const [numToLoad, setNumToLoad] = useState(0);
  const [numLoaded, setNumLoaded] = useState(0);
  const [authDisplay, setAuthDisplay] = useState(false);

  const [movieSliderData, setMovieSliderData] = useState(undefined);
  const [popularMoviesData, setPopularMoviesData] = useState(undefined);
  const [topRatedData, setTopRatedData] = useState(undefined);
  const [animationData, setAnimationData] = useState(undefined);
  const [seriesData, setSeriesData] = useState(undefined);
  const [trailerData, setTrailerData] = useState(undefined);
  const [castData, setCastData] = useState(undefined);
  const [highlightMovie, setHighlightMovie] = useState(undefined);
  const [highlightSeries, setHighlightSeries] = useState(undefined);

  //useEffect to check if the page is completely loaded
  useEffect(() => {
    if (numLoaded >= numToLoad) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [numToLoad, numLoaded]);

  //Get MovieSlider data
  useEffect(() => {
    const movieSliderSize = 5;

    async function getData() {
      setNumToLoad((val) => val + 1);

      const results = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/trending`,
        {
          params: {
            count: movieSliderSize + 1,
          },
        }
      );

      if (results.data.list.length >= 5) {
        setMovieSliderData(results.data.list.slice(1, movieSliderSize));
      }

      //Get Highlight movie data
      const random =
        Math.floor(Math.random() * (results.length - movieSliderSize)) +
        movieSliderSize;
      const randomIndex = random < results.length ? random : 0;
      const highlightMovieId = results.data.list[randomIndex].id;

      const movieDetail = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/detail/${highlightMovieId}`
      );

      if (movieDetail.data.success) {
        setHighlightMovie(movieDetail.data.detail);
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, []);

  //Get Popular Movies section data
  useEffect(() => {
    async function getData() {
      setNumToLoad((val) => val + 1);

      const results = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/popular`
      );

      if (results.data.success) {
        setPopularMoviesData(results.data.list);
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, []);

  //Get Top Rated Movies section data
  useEffect(() => {
    async function getData() {
      setNumToLoad((val) => val + 1);

      const results = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/top-rated`
      );

      if (results.data.success) {
        setTopRatedData(results.data.list);
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, []);

  //Get Animations section data
  useEffect(() => {
    async function getData() {
      setNumToLoad((val) => val + 1);

      const results = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/animation`
      );

      if (results.data.success) {
        setAnimationData(results.data.list);
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, []);

  //Get Popular Series section data
  useEffect(() => {
    async function getData() {
      setNumToLoad((val) => val + 1);

      const numOfItem = 21;

      const results = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/series/popular`,
        {
          params: {
            count: numOfItem + 1,
          },
        }
      );

      if (results.data.success) {
        setSeriesData(results.data.list.slice(1, results.data.list.length));

        const highlightSeries = await axios(
          `http://localhost:3030/api/v1/series/detail/${results.data.list[0].id}`
        );

        if (highlightSeries.data.success) {
          setHighlightSeries(highlightSeries.data.detail);
        }
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, []);

  //Get Trailer section data
  useEffect(() => {
    async function getData() {
      setNumToLoad((val) => val + 1);

      const results = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/trailers`
      );

      if (results.data.success) {
        setTrailerData(results.data.list);
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, []);

  //Get the cast data
  useEffect(() => {
    async function getData() {
      setNumToLoad((val) => val + 1);

      const results = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/actors`
      );

      if (results.data.success) {
        setCastData(results.data.list);
      }

      setNumLoaded((val) => val + 1);
    }
    getData();
  }, []);

  return (
    <div className={cx("content")}>
      <Header
        refList={refList}
        loading={loading}
        setAuthDisplay={setAuthDisplay}
      />
      <AuthForm display={authDisplay} setDisplay={setAuthDisplay} />
      <div className={cx("loader", { "no-display": !loading })}>
        <LuLoader2 className={cx("loader-icon")} />
      </div>

      <span className={cx({ "no-display": loading })}>
        <MovieSlider imageList={movieSliderData} />
        <DiscoverBar />
        <div className={cx("space-under-slider")}></div>
        <AiringSeries />
        <CardSlider
          ref={refList.moviesRef}
          title="Popular Movies"
          viewAll="/movie"
          source={popularMoviesData}
          type="movie"
        />
        <CardSlider
          title="Top Rated Movies"
          viewAll="/movie"
          source={topRatedData}
          type="movie"
        />
        <HightlightSection source={highlightMovie} />
        <CardSlider
          ref={refList.seriesRef}
          title="Popular Series"
          viewAll="/movie"
          source={seriesData}
          type="movie"
        />
        <CardSlider
          title="Animations"
          viewAll="/movie"
          source={animationData}
          type="movie"
        />
        <HightlightSection source={highlightSeries} />
        <CardSlider
          ref={refList.castsRef}
          title="Actors"
          viewAll="/cast"
          source={castData}
          type="cast"
        />
        <TrailerSection title={"Movie Trailers"} source={trailerData} />
        <Social />
        <Footer />
      </span>
    </div>
  );
}

export default HomePage;
