import classNames from "classnames/bind";
import { BiLinkAlt } from "react-icons/bi";

import styles from './PersonCard.module.scss';

const cx = classNames.bind(styles);

function PersonCard({ profileURL, name, birthday, homepage }) {
  return (
    <div className={cx('container')}>
      <a 
        className={cx('link')}
        href={homepage ? homepage : "/"}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          if (!homepage)
            e.preventDefault();
        }}
      >
        <img 
          className={cx('profile-picture')} 
          style={{ display: profileURL ? 'block' : 'none' }}
          src={profileURL} 
          alt={name}/>
        <div className={cx('hover-overlay')}>
          <div 
            className={cx('link-icon', {
              'no-display': !homepage
            })}
          >
            <BiLinkAlt />
          </div>
        </div>
        <div className={cx('cast-name-wrap')}>
          <h3 className={cx('cast-name')}>{name}</h3>
          <h4 className={cx('birthday')}>{birthday ? "Born " +  birthday : "Born 31-13-5000"}</h4>
        </div>
      </a>
    </div>
  );
}

export default PersonCard;