import HomePage from "../pages/HomePage/HomePage";
import MoviePage from "../pages/MoviePage/MoviePage";

const publicRoutes = [
  {path: '/', component: HomePage},
  {path: '/movie', component: MoviePage},
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };