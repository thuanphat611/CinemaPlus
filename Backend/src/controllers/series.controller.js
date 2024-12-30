const {
  getListFromAPI,
  getDetailFromAPI,
  getSearchResultFromAPI,
  tmdbClient,
  getCreditFromAPI,
  getRelatedTrailerFromAPI,
} = require("../utils");

module.exports.getPopular = async (req, res, next) => {
  try {
    let finalResults = [];
    let i = 1;

    const numOfItem = req.query.count ?? 20;

    while (finalResults.length < numOfItem) {
      let requestURL = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${i}`;
      let results = await getListFromAPI(requestURL, "tv");

      for (let j = 0; j < results.length; j++)
        if (finalResults.length < numOfItem) {
          finalResults.push(results[j]);
        } else break;

      i++;
    }

    res.status(200).json({ success: true, list: finalResults });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getDetail = async (req, res, next) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${req.params.id}?language=en-US`;
    const seriesDetail = await getDetailFromAPI(url, "tv");

    return res.status(200).json({ success: true, detail: seriesDetail });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getSeasonList = async (req, res, next) => {
  try {
    const detail = await tmdbClient.get(
      `https://api.themoviedb.org/3/tv/${req.params.id}`
    );
    let result = {
      id: req.params.id,
      type: "series",
      name: "",
      seasons: [],
    };
    if (detail) {
      const data = detail?.data;
      result = {
        id: data.id,
        type: "series",
        name: data.title ? data.title : data.name,
        seasons: data.seasons ? data.seasons : [],
      };
    }

    return res.status(200).json({ success: true, result: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getSearchResult = async (req, res, next) => {
  try {
    const results = await getSearchResultFromAPI(
      `https://api.themoviedb.org/3/search/movie?query=${req.query.search}&language=en`,
      "tv"
    );

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getCredit = async (req, res, next) => {
  try {
    const credit = await getCreditFromAPI(
      `https://api.themoviedb.org/3/tv/${req.params.id}/credits?language=en-US`
    );

    return res.status(200).json({ success: true, credit });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getVideos = async (req, res, next) => {
  try {
    const videos = await getRelatedTrailerFromAPI(req.params.id, "series");

    return res.status(200).json({ success: true, videos });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
