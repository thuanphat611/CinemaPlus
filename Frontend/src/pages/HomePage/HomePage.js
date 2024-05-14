import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';
import Header from '../../components/Header/Header';
import MovieSlider from '../../components/MovieSlider/MovieSlider';
import DiscoverBar from '../../components/DiscoverBar/DiscoverBar';
import CardSlider from '../../components/CardSlider/CardSlider';
import MovieCard from '../../components/MovieCard/MovieCard';

const cx = classNames.bind(styles);

function HomePage() {
  const images = [
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    }
  ];

  const cardList = [
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    },
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    },
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    },
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    },
    {
      movieId: "001",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjM4MzJjOTktNjc3Ni00YzA1LWExN2EtNDU0NTViY2M0ODBhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX2160_.jpg",
      name: "Godzilla x Kong: The New Empire",
      imdb: "6.5",
      poster: "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_FMjpg_UY2880_.jpg"
    },
    {
      movieId: "002",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BNzQyOTJjOTEtOTFiYi00NzgyLWFiYmUtYTMzYzk5ODYwMjc2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX2048_.jpg",
      name: "Avatar: The Way of Water",
      imdb: "7.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX900_.jpg"
    },
    {
      movieId: "003",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BYWU1ZGQ4MjctYjNlMS00YWY2LTg2ODctMTlhMDg2OWRiYjEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX2160_.jpg",
      name: "Extraction 2",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BZjg5MTM4N2QtN2RlMS00NzBlLTg3NDktM2ExZDNmMmExMGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1013_.jpg"
    },
    {
      movieId: "004",
      imgURL:
        "https://m.media-amazon.com/images/M/MV5BMjVkMWFhN2ItZmI0NC00YzIyLWJiZDUtYTMxZDc2NzVjNWUzXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX2160_.jpg",
      name: "Deadpool & Wolverine",
      imdb: "7.0",
      poster: "https://m.media-amazon.com/images/M/MV5BOWI2YjAxODctOTAzYi00ZmQ5LWE0ZmEtOGMxMTUzYmVjYzY2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_FMjpg_UY3037_.jpg"
    },
  ];

  return ( 
    <div className={cx('content')}>
      <Header />
      <MovieSlider imageList={images} />
      <DiscoverBar />
      <div className={cx('space-under-slider')}></div>
      <CardSlider title="New Movies" viewAll="/movie" pages={cardList.length} >
      {
        cardList.map((item, index) => {
          return (
            <MovieCard key={index} id={item.movieId} posterURL={item.poster} name={item.name} />
          )
        })
      }
      </CardSlider>
      <CardSlider title="The Most Visited" viewAll="/movie" pages={cardList.length} >
      {
        cardList.map((item, index) => {
          return (
            <MovieCard key={index} id={item.movieId} posterURL={item.poster} name={item.name} />
          )
        })
      }
      </CardSlider>
      <CardSlider title="New Series" viewAll="/movie" pages={cardList.length} >
      {
        cardList.map((item, index) => {
          return (
            <MovieCard key={index} id={item.movieId} posterURL={item.poster} name={item.name} />
          )
        })
      }
      </CardSlider>
      <CardSlider title="Animations" viewAll="/movie" pages={cardList.length} >
      {
        cardList.map((item, index) => {
          return (
            <MovieCard key={index} id={item.movieId} posterURL={item.poster} name={item.name} />
          )
        })
      }
      </CardSlider>
    </div>
  );
}

export default HomePage;