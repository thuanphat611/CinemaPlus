import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';
import Header from '../../components/Header/Header';
import MovieSlider from '../../components/MovieSlider/MovieSlider';

const cx = classNames.bind(styles);

function HomePage() {
  const images = [
    {
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      imgAlt: "Godzilla x Kong: The New Empire"
    },
    {
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      imgAlt: "Avatar: The Way of Water"
    },
    {
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      imgAlt: "Extraction 2"
    },
    {
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      imgAlt: "Deadpool & Wolverine"
    }
  ];

  return ( 
    <div className={cx('content')}>
      <Header />
      <MovieSlider imageList={images}/>
    </div>
  );
}

export default HomePage;