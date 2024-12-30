import { useState, useEffect } from "react";
import axios from "axios";

const accessToken = "Bearer " + process.env.REACT_APP_TMBD_ACCESS_TOKEN;

const tmdbClient = axios.create({
  baseURL: "http://localhost:3033",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: accessToken,
  },
});

const getGenresFromAPI = async () => {
  const result = {};

  let requestURL = "https://api.themoviedb.org/3/genre/movie/list";
  let response = await tmdbClient.get(requestURL);
  result.movie = response?.data.genres;

  requestURL = "https://api.themoviedb.org/3/genre/tv/list";
  response = await tmdbClient.get(requestURL);
  result.series = response?.data.genres;

  result.all = [...result.movie, ...result.series];

  return result;
};

function useHandler() {
  const [type, setType] = useState("all");
  const [genre, setGenre] = useState("all");
  const [year, setYear] = useState("all");
  const [currentGenreList, setCurrentGenreList] = useState([]);
  const [genreList, setGenreList] = useState({});

  useEffect(() => {
    const getData = async () => {
      const result = await getGenresFromAPI();
      setGenreList(result);
      setCurrentGenreList(result.all);
    };
    getData();
  }, []);

  let currentDate = new Date();
  let currentYear = Number(currentDate.getFullYear());
  let minYear = 1990;
  let yearList = [];

  for (let year = currentYear; year >= minYear; year--) {
    yearList.push(year);
  }

  return {
    type,
    yearList,
    genre,
    year,
    currentGenreList,
    genreList,
    setType,
    setGenre,
    setYear,
    setCurrentGenreList,
  };
}

export default useHandler;
