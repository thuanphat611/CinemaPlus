import { HomePage, DetailPage, WatchPage } from "../pages";

const publicRoutes = [
  {
    path: "/",
    component: HomePage,
    props: {},
  },
  {
    path: "movie/detail/:id",
    component: DetailPage,
    props: {
      type: "movies",
    },
  },
  {
    path: "series/detail/:id",
    component: DetailPage,
    props: {
      type: "series",
    },
  },
  {
    path: "movie/watch/:id",
    component: WatchPage,
    props: {
      type: "movie",
    },
  },
  {
    path: "series/watch/:id/:season/:episode",
    component: WatchPage,
    props: {
      type: "series",
    },
  },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
