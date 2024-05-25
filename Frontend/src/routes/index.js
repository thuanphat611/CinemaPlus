import HomePage from "../pages/HomePage/HomePage";
import DetailPage from "../pages/DetailPage/DetailPage";

const publicRoutes = [
  {
    path: '/', 
    component: HomePage,
    props: {}
  },
  {
    path: 'movie/detail/:id', 
    component: DetailPage,
    props: {
      type: 'movie'
    }
  },
  {
    path: 'series/detail/:id', 
    component: DetailPage,
    props: {
      type: 'series'
    }
  },
  {
    path: 'movie/watch/:id', 
    component: DetailPage,
    props: {
      type: 'movie'
    }
  },
  {
    path: 'series/watch/:id/:season/:episode', 
    component: DetailPage,
    props: {
      type: 'series'
    }
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };