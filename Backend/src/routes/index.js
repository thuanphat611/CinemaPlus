const express = require("express");

const healthRoutes = require("./health.route");
const authRoutes = require("./auth.route");
const movieRoutes = require("./movie.route");
const seriesRoutes = require("./series.route");
const actorRoutes = require("./actor.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/health",
    route: healthRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/movies",
    route: movieRoutes,
  },
  {
    path: "/series",
    route: seriesRoutes,
  },
  {
    path: "/actors",
    route: actorRoutes,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
