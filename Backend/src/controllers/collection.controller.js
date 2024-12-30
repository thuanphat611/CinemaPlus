const { getCollectionFromAPI } = require("../utils");

module.exports.getDetail = async (req, res, next) => {
  try {
    const detail = await getCollectionFromAPI(
      `https://api.themoviedb.org/3/collection/${req.params.id}?language=en-US`
    );

    return res.status(200).json({ success: true, detail });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
