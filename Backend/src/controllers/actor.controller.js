const { tmdbClient } = require("../utils");

module.exports.getTrending = async (req, res, next) => {
  try {
    let response = await tmdbClient.get(
      "https://api.themoviedb.org/3/trending/person/week?language=en-US"
    );
    let result = response?.data?.results.map((item) => {
      return {
        id: item.id,
        known_for_department: item.known_for_department,
        name: item.title ? item.title : item.name,
        poster: item.profile_path
          ? "https://image.tmdb.org/t/p/w185" + item.profile_path
          : castCardImagePlaceholder,
      };
    });

    result = result.filter((item) => {
      return item.known_for_department === "Acting";
    });

    const actorData = await Promise.all(
      result.map(async (actor) => {
        const actorDetail = await tmdbClient.get(
          `https://api.themoviedb.org/3/person/${actor.id}?language=en-US`
        );

        return {
          id: actor.id,
          birthday: actorDetail.data.birthday,
          homepage: actorDetail.data.homepage,
        };
      })
    );

    result = result.map((actor) => {
      const data = actorData.filter(({ id }) => id === actor.id)[0];

      return {
        ...actor,
        ...data,
      };
    });

    return res.status(200).json({ success: true, list: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
