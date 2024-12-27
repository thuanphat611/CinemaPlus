const { getListFromAPI, getDetailFromAPI } = require("../utils");

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
    const seriesDetail = await getDetailFromAPI(url, "movie");

    return res.status(200).json({ success: true, detail: seriesDetail });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
