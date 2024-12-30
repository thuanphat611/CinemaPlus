import { useState, useEffect } from "react";
import axios from "axios";

function useHandler() {
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
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/series/detail/${results.data.list[0].id}`
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

  return {
    loading,
    authDisplay,
    setAuthDisplay,
    movieSliderData,
    popularMoviesData,
    topRatedData,
    animationData,
    seriesData,
    trailerData,
    castData,
    highlightMovie,
    highlightSeries,
  };
}

export default useHandler;
