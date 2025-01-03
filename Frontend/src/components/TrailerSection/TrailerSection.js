import classNames from "classnames/bind";
import ReactPlayer from "react-player/youtube";
import { IoPlay } from "react-icons/io5";

import styles from "./TrailerSection.module.scss";
import useHandler from "./controller";

const cx = classNames.bind(styles);

function TrailerSection({ title, source, horizontal }) {
  const { activeIndex, setActiveIndex } = useHandler();

  return (
    <div className={cx("container", { horizontal: horizontal })}>
      <h3 className={cx("title")}>{title}</h3>

      <div className={cx("main")}>
        <div className={cx("thumbnails")}>
          <div className={cx("trailer-list")}>
            {source
              ? source.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={cx("trailer-item")}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveIndex(index);
                      }}
                    >
                      <div className={cx("img-wrapper")}>
                        <img
                          className={cx("trailer-img")}
                          src={
                            "https://img.youtube.com/vi/" +
                            item?.youtubeKey +
                            "/hqdefault.jpg"
                          }
                          alt={item?.name}
                        />
                        <div className={cx("play-btn")}>
                          <IoPlay />
                        </div>
                      </div>
                      <div className={cx("trailer-info")}>
                        <h4 className={cx("trailer-name")}>{item?.name}</h4>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>

        <div className={cx("player-container")}>
          <ReactPlayer
            controls
            width="880px"
            height="495px"
            url={
              "https://www.youtube.com/watch?v=" +
              (source ? source[activeIndex]?.youtubeKey : "")
            }
          />
          {/* <iframe width="880" height='495' allowFullScreen title='videos' src='https://vidsrc.to/embed/movie/823464' /> */}
        </div>
      </div>
    </div>
  );
}

export default TrailerSection;
