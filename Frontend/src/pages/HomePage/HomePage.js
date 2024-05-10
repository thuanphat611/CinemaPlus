import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import Header from '../../components/Header/Header';

const cx = classNames.bind(styles);

function HomePage() {
  return ( 
    <div className={cx('content')}>
      <Header />
    </div>
  );
}

export default HomePage;