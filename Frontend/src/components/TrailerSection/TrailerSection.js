import classNames from 'classnames/bind';
import ReactPlayer from 'react-player/youtube';
import { IoPlay } from "react-icons/io5";

import styles from './TrailerSection.module.scss';

const cx = classNames.bind(styles);

function TrailerSection({ source }) {
  const source1 = source[0];
  console.log(source1)
  return (
    <div className={cx('container')}>
      <h3 className={cx('title')}>Trailers</h3>

      <div className={cx('main')}>
        <div className={cx('thumbnails')}>
          <div className={cx('trailer-list')}>
            {
              source.map((item, index) => {
                return (
                  <div key={index} className={cx('trailer-item')}>
                    <div className={cx('img-wrapper')}>
                      <img className={cx('trailer-img')} src={item.imgURL} alt={item.name} />
                      <div className={cx('play-btn')}>
                        <IoPlay />
                      </div>
                    </div>
                    <div className={cx('trailer-info')}>
                      <h4 className={cx('trailer-name')}>{item.name}</h4>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className={cx('player-container')}>
          <ReactPlayer controls width="880px" height="495px" url='https://www.youtube.com/watch?v=lV1OOlGwExM'/>
          {/* <iframe width="880" height='495' allowFullScreen title='videos' src='https://vidsrc.to/embed/movie/823464' /> */}
        </div>
      </div>
    </div>
  );
}

export default TrailerSection;