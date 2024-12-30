import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";
import classNames from "classnames/bind";
import axios from "axios";

import style from "./WatchPage.module.scss";
import { Player } from "./containers";

const cx = classNames.bind(style);

function WatchPage({ props }) {
  const type = props.type === "series" ? "tv" : "movie";
  const { id, season, episode } = useParams();

  const [data, setData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (type === "movie") {
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/series/${id}/seasons`
      );
      if (response.data.success) {
        setData(response.data.result);
      }
    };
    getData();
  }, [id, type]);

  return (
    <div className={cx("content")}>
      <div className={cx("loader", { "no-display": !loading })}>
        <LuLoader2 className={cx("loader-icon")} />
      </div>

      <span className={cx({ "no-display": loading })}>
        <Player
          id={id}
          data={data.seasons}
          season={season}
          episode={episode}
          type={type}
        />
      </span>
    </div>
  );
}

export default WatchPage;
