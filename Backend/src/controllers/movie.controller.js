const { tmdbClient, getListFromAPI, getDetailFromAPI } = require("../utils");

module.exports.getTrending = async (req, res, next) => {
  try {
    const url =
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
    let result = await getListFromAPI(url, "movie");

    if (result.length >= 5 && req.query.count) {
      result = result.slice(0, req.query.count);
    }

    return res.status(200).json({ success: true, list: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getDetail = async (req, res, next) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${req.params.id}?language=en-US`;
    const movieDetail = await getDetailFromAPI(url, "movie");

    return res.status(200).json({ success: true, detail: movieDetail });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getPopular = async (req, res, next) => {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const result = await getListFromAPI(url, "movie");

    return res.status(200).json({ success: true, list: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getTopRated = async (req, res, next) => {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
    const result = await getListFromAPI(url, "movie");

    return res.status(200).json({ success: true, list: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getAnimations = async (req, res, next) => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const monthToString = month < 10 ? "0" + month : month;
    const currentTime = year + "-" + monthToString + "-" + day;

    const requestURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.lte=${currentTime}&sort_by=popularity.desc&with_genres=16&with_original_language=en`;

    const result = await getListFromAPI(requestURL, "movie");

    return res.status(200).json({ success: true, list: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getTrailers = async (req, res, next) => {
  try {
    let response = await tmdbClient.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
    );

    let result = response?.data?.results.map((item) => {
      return {
        id: item.id,
        name: item.title ? item.title : item.name,
        originalLanguage: item.original_language,
        imgURL: item.backdrop_path
          ? "https://image.tmdb.org/t/p/w300" + item.backdrop_path
          : trailerImagePlaceholder,
        youtubeKey: "",
      };
    });

    result = result.filter((item) => {
      return item.originalLanguage === "en";
    });

    const trailerData = await Promise.all(
      result.map(async (item) => {
        const videos = await tmdbClient.get(
          `https://api.themoviedb.org/3/movie/${item.id}/videos?language=en-US`
        );

        const trailer = videos?.data.results.filter((item) => {
          return item.site === "YouTube" && item.type === "Trailer";
        });

        return {
          id: item.id,
          videos: videos?.data.results,
          officalTrailers: trailer.filter((item) => {
            return item.name.includes("Official Trailer");
          }),
        };
      })
    );

    result = result.map((item) => {
      const data = trailerData.filter(({ id }) => id === item.id)[0];

      if (data.officalTrailers?.length !== 0) {
        return {
          ...item,
          youtubeKey: data.officalTrailers[0]?.key,
        };
      } else {
        return {
          ...item,
          youtubeKey: data.videos[0]?.key,
        };
      }
    });

    return res.status(200).json({ success: true, list: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
