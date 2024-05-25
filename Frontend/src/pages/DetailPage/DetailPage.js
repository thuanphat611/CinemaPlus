import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';

const cx = classNames.bind(styles);

function DetailPage({ props }) {
  return ( 
    <h2>{props.type} detail page</h2>
  );
}

export default DetailPage;