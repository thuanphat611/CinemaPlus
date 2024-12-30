const {
  tmdbClient,
  getListFromAPI,
  getDetailFromAPI,
  getSearchResultFromAPI,
  getCollectionFromAPI,
  getCreditFromAPI,
  getRelatedTrailerFromAPI,
} = require("./axios.js");
const imagePlaceholderUtil = require("./imagePlaceholder.js");

module.exports = {
  tmdbClient,
  getListFromAPI,
  getDetailFromAPI,
  getSearchResultFromAPI,
  getCollectionFromAPI,
  getCreditFromAPI,
  getRelatedTrailerFromAPI,
  ...imagePlaceholderUtil,
};
