import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DetailPage.module.scss';
import Header from '../../components/Header/Header';
import MovieOverview from '../../components/MovieOverview/MovieOverview';
import Footer from '../../components/Footer/Footer';

const cx = classNames.bind(styles);

function DetailPage({ props }) {
  const type = props.type;
  const { id } = useParams();
  console.log(id, type)

  return ( 
    <div className={cx('content')}>
      <Header />
      <MovieOverview targetId={id} type={type === 'series' ? 'tv' : 'movie'}/>
      <Footer />
    </div>
  );
}

export default DetailPage;