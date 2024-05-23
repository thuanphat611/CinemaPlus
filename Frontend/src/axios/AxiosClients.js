import axios from 'axios';
const accessToken = 'Bearer ' + process.env.REACT_APP_TMBD_ACCESS_TOKEN;
const searchImagePlaceholder = 'https://placehold.co/60x90?text=No+Image';
const movieCardImagePlaceholder = 'https://placehold.co/200x280?text=No+Image';
const castCardImagePlaceholder = 'https://placehold.co/230x280?text=No+Image';
const backdropImagePlaceholder = 'https://placehold.co/1200x700?text=No+Image';

const tmdbClient = axios.create({
  baseURL: 'http://localhost:3033',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': accessToken
  }
})

const getListFromAPI = async (url, type) => {
  const response = await tmdbClient.get(url);
  let results = response?.data?.results.map((item, index) => {
    return {
      id: item.id,
      type: type === 'tv' ? 'series' : 'movie',
      name: item.title ? item.title : item.name,
      originalLanguage: item.original_language,
      imdb: null,
      imgURL: 'https://image.tmdb.org/t/p/original' + item.backdrop_path,
      poster: item.poster_path ? 'https://image.tmdb.org/t/p/w342' + item.poster_path : movieCardImagePlaceholder
    }
  })

  //Streaming api can only support movies in English
  results = results.filter((item) => {
    return item.originalLanguage === 'en';
  });

  return results;
}

const getDetailFromAPI = async (url, type) => {
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
      posterURL: data.backdrop_path ? 'https://image.tmdb.org/t/p/original' + data.backdrop_path : backdropImagePlaceholder,
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

const getTrailerFromAPI = async (url) => {
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

const getCastFromAPI = async (url) => {
  let response = await tmdbClient.get(url);
  let results = response?.data?.results.map((item, index) => {
    return {
      id: item.id,
      known_for_department: item.known_for_department,
      name: item.title ? item.title : item.name,
      poster: item.profile_path ? 'https://image.tmdb.org/t/p/w185' + item.profile_path : castCardImagePlaceholder
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

const getSearchResultFromAPI = async (url, type) => {
  const response = await tmdbClient.get(url);
  let results = response?.data?.results.map((item) => {
    return {
      id: item.id,
      type: type === 'tv' ? 'series' : 'movie',
      name: item.title ? item.title : item.name,
      poster: item.poster_path ? 'https://image.tmdb.org/t/p/w92' + item.poster_path : searchImagePlaceholder
    }
  })

  return results;
}

export { tmdbClient, getSearchResultFromAPI, getListFromAPI, getDetailFromAPI, getTrailerFromAPI, getCastFromAPI };