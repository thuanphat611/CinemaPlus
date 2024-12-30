import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";

import styles from "./AiringSeries.module.scss";
import useHandler from "./controller";

const cx = classNames.bind(styles);

function AiringSeries() {
  const { loading, days, currentDate, dataList, highlightSeries } =
    useHandler();

  return (
    <div className={cx("container")}>
      <div className={cx("day-group")}>
        {days.map((day, index) => {
          return (
            <div
              key={index}
              className={cx("day-button", {
                "button-active": index === currentDate,
              })}
            >
              {day}
            </div>
          );
        })}
      </div>

      <span className={cx("content-wrapper", { "no-display": loading })}>
        <div className={cx("series-list")}>
          {dataList.map((item, index) => {
            return (
              <div key={index} className={cx("series-item-wrapper")}>
                <Link
                  className={cx("series-item")}
                  to={"/series/detail/" + item?.id}
                  onClick={(e) => {
                    if (!item.id) e.preventDefault();
                  }}
                >
                  <img
                    className={cx("series-img")}
                    src={item.poster}
                    alt={item.name}
                  />
                  <div className={cx("series-info")}>
                    <h4 className={cx("series-name")}>{item.name}</h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <Link
          className={cx("highlight-series-item")}
          to={"/series/detail/" + highlightSeries?.id}
          onClick={(e) => {
            if (!highlightSeries.id) e.preventDefault();
          }}
        >
          <img
            className={cx("highlight-series-img")}
            src={highlightSeries.poster}
            alt={highlightSeries?.name}
          />
          <div className={cx("highlight-series-info")}>
            <h4 className={cx("highlight-series-name")}>
              {highlightSeries?.name}
            </h4>
          </div>
        </Link>
      </span>

      <div className={cx("loader", { "no-display": !loading })}>
        <LuLoader2 className={cx("loader-icon")} />
      </div>
    </div>
  );
}

export default AiringSeries;
