import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { IoPlay, IoPause } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { FiSkipForward } from "react-icons/fi";
import { TbRewindForward10, TbRewindBackward10 } from "react-icons/tb";
import {
  PiSpeakerSimpleHighBold,
  PiSpeakerSimpleXBold,
  PiGearSixBold,
  PiCornersOutBold,
  PiCornersInBold,
  PiFlagBold,
  // PiSquaresFourBold
} from "react-icons/pi";

import styles from "./Player.module.scss";
import useHandler from "./controller";

const cx = classNames.bind(styles);

function Player({ id, data, season, episode, type }) {
  const {
    fullScreen,
    soundOn,
    setSoundOn,
    playing,
    setPlaying,
    resolution,
    setResolution,
    speed,
    setSpeed,
    speedList,
    resolutionist,
    toggleFullScreen,
    nextSeason,
    nextEp,
    notLastEp,
  } = useHandler(data, season, episode);

  return (
    <div className={cx("container")}>
      <Link
        className={cx("btn", "btn-back")}
        to={"/" + (type === "movie" ? "movie" : "series") + "/detail/" + id}
      >
        <FaArrowLeft />
      </Link>

      <button className={cx("btn", "btn-report")}>
        <PiFlagBold />
      </button>

      <div className={cx("bottom-section")}>
        <div className={cx("watch-progress")}>
          <div className={cx("progress-bar")}></div>
          <h3 className={cx("remaining-time")}>59:59</h3>
        </div>

        <div className={cx("btn-group")}>
          <div className={cx("left-side")}>
            <button
              className={cx("btn")}
              onClick={() => {
                setPlaying((state) => !state);
              }}
            >
              {playing ? <IoPlay /> : <IoPause />}
            </button>
            <button className={cx("btn")}>
              <TbRewindBackward10 />
            </button>
            <button className={cx("btn")}>
              <TbRewindForward10 />
            </button>
            <button
              className={cx("btn")}
              onClick={() => {
                setSoundOn((state) => !state);
              }}
            >
              {soundOn ? <PiSpeakerSimpleHighBold /> : <PiSpeakerSimpleXBold />}
            </button>
          </div>

          <div className={cx("right-side")}>
            <div
              className={cx("series-only", { "no-display": type === "movie" })}
            >
              <Link
                className={cx("btn", { "no-display": !notLastEp })}
                to={
                  "/" +
                  (type === "tv" ? "series" : "movie") +
                  "/watch/" +
                  id +
                  "/" +
                  nextSeason +
                  "/" +
                  nextEp
                }
              >
                <FiSkipForward />
              </Link>

              {/* <button className={cx('btn')}>
                <PiSquaresFourBold />
              </button> */}
            </div>

            <div className={cx("config-wrapper")}>
              <button className={cx("btn")}>
                <PiGearSixBold />
              </button>

              <div className={cx("config-modal")}>
                <div className={cx("config-section")}>
                  <h3 className={cx("config-title")}>Resolution</h3>
                  <ul className={cx("config-options")}>
                    {resolutionist.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={cx("config-option", {
                            "config-option-active": index === resolution,
                          })}
                          onClick={() => {
                            setResolution(index);
                          }}
                        >
                          {item}{" "}
                          {item === "1080p" ? (
                            <h4 className={cx("hd-label")}>HD</h4>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={cx("config-section")}>
                  <h3 className={cx("config-title")}>Speed</h3>
                  <ul className={cx("config-options")}>
                    <ul className={cx("config-options")}>
                      {speedList.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className={cx("config-option", {
                              "config-option-active": index === speed,
                            })}
                            onClick={() => {
                              setSpeed(index);
                            }}
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </ul>
                </div>
              </div>
            </div>

            <button
              className={cx("btn")}
              onClick={() => {
                toggleFullScreen();
              }}
            >
              {fullScreen ? <PiCornersInBold /> : <PiCornersOutBold />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
