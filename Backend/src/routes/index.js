const express = require("express");

const healthRoutes = require("./health.route");
const authRoutes = require("./auth.route");
const movieRoutes = require("./movie.route");
const seriresRoutes = require("./series.route");

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
    route: seriresRoutes,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
