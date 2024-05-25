import HomePage from "../pages/HomePage/HomePage";
import DetailPage from "../pages/DetailPage/DetailPage";

const publicRoutes = [
  {
    path: '/', 
    component: HomePage,
    props: {}
  },
  {
    path: '/movie', 
    component: DetailPage,
    props: {
      type: 'movie'
    }
  },
  {
    path: '/series', 
    component: DetailPage,
    props: {
      type: 'series'
    }
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };