import classNames from "classnames/bind";
import { LuLoader2 } from "react-icons/lu";
import { useRef } from "react";

import { Header, Footer, CardSlider, TrailerSection } from "../../components";

import styles from "./HomePage.module.scss";
import {
  AuthForm,
  MovieSlider,
  DiscoverBar,
  AiringSeries,
  HighlightSection,
  Social,
} from "./components";
import useHandler from "./controller";

const cx = classNames.bind(styles);

function HomePage({ props }) {
  const refList = {
    moviesRef: useRef(null),
    castsRef: useRef(null),
    seriesRef: useRef(null),
  };

  const {
    loading,
    authDisplay,
    setAuthDisplay,
    movieSliderData,
    popularMoviesData,
    topRatedData,
    animationData,
    seriesData,
    trailerData,
    castData,
    highlightMovie,
    highlightSeries,
  } = useHandler();

  return (
    <div className={cx("content")}>
      <Header
        refList={refList}
        loading={loading}
        setAuthDisplay={setAuthDisplay}
      />
      <AuthForm display={authDisplay} setDisplay={setAuthDisplay} />
      <div className={cx("loader", { "no-display": !loading })}>
        <LuLoader2 className={cx("loader-icon")} />
      </div>

      <span className={cx({ "no-display": loading })}>
        <MovieSlider imageList={movieSliderData} />
        <DiscoverBar />
        <div className={cx("space-under-slider")}></div>
        <AiringSeries />
        <CardSlider
          ref={refList.moviesRef}
          title="Popular Movies"
          viewAll="/movie"
          source={popularMoviesData}
          type="movie"
        />
        <CardSlider
          title="Top Rated Movies"
          viewAll="/movie"
          source={topRatedData}
          type="movie"
        />
        <HighlightSection source={highlightMovie} />
        <CardSlider
          ref={refList.seriesRef}
          title="Popular Series"
          viewAll="/movie"
          source={seriesData}
          type="movie"
        />
        <CardSlider
          title="Animations"
          viewAll="/movie"
          source={animationData}
          type="movie"
        />
        <HighlightSection source={highlightSeries} />
        <CardSlider
          ref={refList.castsRef}
          title="Actors"
          viewAll="/cast"
          source={castData}
          type="cast"
        />
        <TrailerSection title={"Movie Trailers"} source={trailerData} />
        <Social />
        <Footer />
      </span>
    </div>
  );
}

export default HomePage;
