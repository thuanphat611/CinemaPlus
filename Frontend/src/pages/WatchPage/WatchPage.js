import { LuLoader2 } from "react-icons/lu";
import classNames from "classnames/bind";

import style from "./WatchPage.module.scss";
import { Player } from "./containers";
import useHandler from "./controller";

const cx = classNames.bind(style);

function WatchPage({ props }) {
  const type = props.type === "series" ? "tv" : "movie";
  const { id, season, episode, data, loading } = useHandler(type);

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
