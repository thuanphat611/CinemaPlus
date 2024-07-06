import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
  PiSquaresFourBold  
} from "react-icons/pi";

import styles from './Player.module.scss';

const cx = classNames.bind(styles);

function Player({id, type}) {
  const [fullScreen, setFullScreen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [resolution, setResolution] = useState(3);
  const [speed, setSpeed] = useState(1);
  
  const speedList = ['0.5', '1.0', '1.5', '2.0'];
  const resolutionist = ['360p', '480p', '720p', '1080p'];

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        setFullScreen(true);
      } else {
        setFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    try {
      if (!fullScreen) {
        enterFullscreen();
      }
      else {
        exitFullscreen();
      }
    }
    catch (e) {
      //ignore :v
    }
  }

  const enterFullscreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  };

  return (
    <div className={cx('container')}>
      <Link className={cx('btn', 'btn-back')} to={'/' + (type === 'movie' ? 'movie' : 'series') + '/detail/' + id}>
        <FaArrowLeft />
      </Link>

      <button className={cx('btn', 'btn-report')}>
        <PiFlagBold />
      </button>

      <div className={cx('bottom-section')}>
        <div className={cx('watch-progress')}>
          <div className={cx('progress-bar')}></div>
          <h3 className={cx('remaining-time')}>59:59</h3>
        </div>

        <div className={cx('btn-group')}>
          <div className={cx('left-side')}>
            <button className={cx('btn')}
              onClick={() => {
                setPlaying(state => !state);
              }}
            >
              {
                playing ?
                <IoPlay />
                :
                <IoPause />
              }
            </button>
            <button className={cx('btn')}>
              <TbRewindBackward10 />
            </button>
            <button className={cx('btn')}>
              <TbRewindForward10 />
            </button>
            <button className={cx('btn')}
              onClick={() => {
                setSoundOn(state => !state);
              }}
            >
              {
                soundOn ?
                <PiSpeakerSimpleHighBold />
                :
                <PiSpeakerSimpleXBold  />
              }
            </button>
          </div>
          
          <div className={cx('right-side')}>
            <div className={cx('series-only', {'no-display': type === 'movie'})}>
              <button className={cx('btn')}>
                <FiSkipForward />
              </button>
              
              <button className={cx('btn')}>
                <PiSquaresFourBold />
              </button>
            </div>

            <div className={cx('config-wrapper')}>
              <button className={cx('btn')}>
                <PiGearSixBold />
              </button>
              
              <div className={cx('config-modal')}>
                <div className={cx('config-section')}>
                  <h3 className={cx('config-title')}>Resolution</h3>
                  <ul className={cx('config-options')}>
                    {
                      resolutionist.map((item, index) => {
                        return (
                          <li key={index} className={cx('config-option', {'config-option-active': index === resolution})}
                            onClick={() => {
                              setResolution(index);
                            }}
                          >
                            {item} {(item === '1080p' ? <h4 className={cx('hd-label')}>HD</h4> : null)}
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div className={cx('config-section')}>
                  <h3 className={cx('config-title')}>Speed</h3>
                  <ul className={cx('config-options')}>
                  <ul className={cx('config-options')}>
                    {
                      speedList.map((item, index) => {
                        return (
                          <li key={index} className={cx('config-option', {'config-option-active': index === speed})}
                            onClick={() => {
                              setSpeed(index);
                            }}
                          >
                            {item}
                          </li>
                        )
                      })
                    }
                  </ul>
                  </ul>
                </div>
              </div>
            </div>

            <button className={cx('btn')}
              onClick={() => {
                toggleFullScreen();
              }}
            >
              {
                fullScreen ?
                <PiCornersInBold />
                :
                <PiCornersOutBold/>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;