const { tmdbClient, getListFromAPI, getDetailFromAPI } = require("./axios.js");
const imagePlaceholderUtil = require("./imagePlaceholder.js");

module.exports = {
  tmdbClient,
  getListFromAPI,
  getDetailFromAPI,
  ...imagePlaceholderUtil,
};
