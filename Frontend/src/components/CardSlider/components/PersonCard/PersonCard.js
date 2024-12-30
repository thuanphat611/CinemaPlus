import classNames from "classnames/bind";

import styles from "./PersonCard.module.scss";

const cx = classNames.bind(styles);

function PersonCard({ profileURL, name }) {
  return (
    <div className={cx("container")}>
      <img
        className={cx("profile-picture")}
        style={{ display: profileURL ? "block" : "none" }}
        src={profileURL}
        alt={name}
      />
      <h3 className={cx("cast-name")}>{name}</h3>
    </div>
  );
}

export default PersonCard;
