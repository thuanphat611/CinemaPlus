import HomePage from "../pages/HomePage";
import MoviePage from "../pages/MoviePage";

const publicRoutes = [
  {path: '/', component: HomePage},
  {path: '/movie', component: MoviePage},
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };