const express = require("express");

const authRoutes = require("./auth.route");
const healthRoutes = require("./health.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/health",
    route: healthRoutes,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
