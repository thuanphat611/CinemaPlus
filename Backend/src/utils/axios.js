const axios = require("axios");

const movieCardImagePlaceholder = "https://placehold.co/200x280?text=No+Image";
const backdropImagePlaceholder = "https://placehold.co/1200x700?text=No+Image";
const searchImagePlaceholder = "https://placehold.co/60x90?text=No+Image";
const castCardImagePlaceholder = "https://placehold.co/230x280?text=No+Image";

const tmdbClient = axios.create({
  baseURL: "http://localhost:3033",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_ACCESS_TOKEN}`,
  },
});

const languageList = {};
(async () => {
  try {
    const requestURL = "https://api.themoviedb.org/3/configuration/languages";
    const response = await tmdbClient.get(requestURL);

    response?.data?.forEach((item) => {
      languageList[item.iso_639_1] = item.english_name;
    });
  } catch (ex) {
    console.error("Exception in getting language list from API: " + ex.message);
  }
})();

module.exports.tmdbClient = tmdbClient;

module.exports.getListFromAPI = async (url, type) => {
  const response = await tmdbClient.get(url);
  let results = response?.data?.results.map((item, index) => {
    return {
      id: item.id,
      rating: item.vote_average,
      type: type === "tv" || type === "series" ? "series" : "movie",
      name: item.title ? item.title : item.name,
      originalLanguage: item.original_language,
      imdb: null,
      imgURL: "https://image.tmdb.org/t/p/original" + item.backdrop_path,
      poster: item.poster_path
        ? "https://image.tmdb.org/t/p/w342" + item.poster_path
        : movieCardImagePlaceholder,
    };
  });

  results = results.filter((item) => {
    return item.originalLanguage === "en";
  });

  return results;
};

module.exports.getDetailFromAPI = async (url, type) => {
  let numOfCasts = 3;

  if (type === "tv") {
    numOfCasts = 5;
  }

  const detail = await tmdbClient.get(url);
  let result = undefined;
  if (detail) {
    const data = detail?.data;
    result = {
      id: data.id,
      collection: data.belongs_to_collection,
      type: type === "tv" || type === "series" ? "series" : "movie",
      original_name: data.original_title,
      original_language: languageList[data.original_language],
      name: data.title ? data.title : data.name,
      status: data.status,
      rating: data.vote_average,
      category: data.genres?.map((item) => {
        return item.name;
      }),
      casts: [],
      director: "",
      production_companies: data.production_companies.map((item) => ({
        name: item.name,
        img: item.logo_path
          ? "https://image.tmdb.org/t/p/w154" + item.logo_path
          : null,
      })),
      overview: data.overview,
      budget: data.budget,
      imgURL: data.backdrop_path
        ? "https://image.tmdb.org/t/p/original" + data.backdrop_path
        : backdropImagePlaceholder,
      poster: data.poster_path
        ? "https://image.tmdb.org/t/p/w342" + data.poster_path
        : movieCardImagePlaceholder,
      more: data.homepage,
      seasons: data.seasons ? data.seasons : [],
    };

    let requestURL =
      "https://api.themoviedb.org/3/" +
      type +
      "/" +
      result.id +
      "/credits?language=en-US";
    const response = await tmdbClient.get(requestURL);
    const casts = response?.data?.cast;
    const castList = casts
      .filter((item, index) => {
        return index < numOfCasts;
      })
      .map((item) => {
        return item.name;
      });
    const director = response?.data?.crew?.filter((item) => {
      return item.job === "Director" && item.department === "Directing";
    });

    result.director = director[0]?.name;
    result.casts = castList;
  }
  return result;
};

module.exports.getSearchResultFromAPI = async (url, type) => {
  const response = await tmdbClient.get(url);
  let results = response?.data?.results.map((item) => {
    return {
      id: item.id,
      type: type === "tv" || type === "series" ? "series" : "movie",
      name: item.title ? item.title : item.name,
      poster: item.poster_path
        ? "https://image.tmdb.org/t/p/w92" + item.poster_path
        : searchImagePlaceholder,
    };
  });

  return results;
};

module.exports.getCollectionFromAPI = async (url) => {
  const response = await tmdbClient.get(url);
  let results = response?.data?.parts.map((item) => {
    return {
      id: item.id,
      rating: item.vote_average,
      name: item.title ? item.title : item.name,
      originalLanguage: item.original_language,
      imdb: null,
      imgURL: "https://image.tmdb.org/t/p/original" + item.backdrop_path,
      poster: item.poster_path
        ? "https://image.tmdb.org/t/p/w342" + item.poster_path
        : movieCardImagePlaceholder,
    };
  });

  results = results.filter((item) => {
    return item.originalLanguage === "en";
  });

  return results;
};

module.exports.getCreditFromAPI = async (url) => {
  let response = await tmdbClient.get(url);
  let results = {
    cast: response?.data?.cast?.map((item) => {
      return {
        id: item.id,
        known_for_department: item.known_for_department,
        name: item.title ? item.title : item.name,
        poster: item.profile_path
          ? "https://image.tmdb.org/t/p/w185" + item.profile_path
          : castCardImagePlaceholder,
      };
    }),
    director: response?.data?.crew
      ?.filter(
        (item) => item.job === "Director" && item.department === "Directing"
      )
      .map((item) => {
        return {
          id: item.id,
          known_for_department: item.known_for_department,
          name: item.title ? item.title : item.name,
          poster: item.profile_path
            ? "https://image.tmdb.org/t/p/w185" + item.profile_path
            : castCardImagePlaceholder,
        };
      }),
  };

  return results;
};

module.exports.getRelatedTrailerFromAPI = async (id, type) => {
  type = type === "movie" ? "movie" : "tv";
  let requestURL =
    "https://api.themoviedb.org/3/" +
    type +
    "/" +
    id +
    "/videos?language=en-US";
  const response = await tmdbClient.get(requestURL);

  let result = response?.data?.results.map((item) => {
    return {
      name: item.title ? item.title : item.name,
      site: item.site || "",
      type: item.type,
      youtubeKey: item?.key,
    };
  });

  result = result.filter((item) => item.site === "YouTube");

  return result;
};
