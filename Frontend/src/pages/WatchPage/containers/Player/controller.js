import { useState, useEffect } from "react";

function useHandler(data, season, episode) {
  const [fullScreen, setFullScreen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [resolution, setResolution] = useState(3);
  const [speed, setSpeed] = useState(1);

  const speedList = ["0.5", "1.0", "1.5", "2.0"];
  const resolutionist = ["360p", "480p", "720p", "1080p"];

  let nextEp = 1;
  let nextSeason = 1;
  let notLastEp = true;

  if (data) {
    nextEp =
      data[season]?.episode_count === Number(episode) ||
      data[season]?.episode_count < Number(episode)
        ? 1
        : Number(episode) + 1;
    nextSeason =
      data[season]?.episode_count === Number(episode) ||
      data[season]?.episode_count < Number(episode)
        ? Number(season) + 1
        : season;
  }

  try {
    let nextSeasonValid = data[nextSeason];
    notLastEp = Number(nextSeasonValid?.episode_count) > 0;
  } catch (ex) {
    notLastEp = false;
  }

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

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullScreen = () => {
    try {
      if (!fullScreen) {
        enterFullscreen();
      } else {
        exitFullscreen();
      }
    } catch (e) {}
  };

  const enterFullscreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  return {
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
    enterFullscreen,
    exitFullscreen,
    nextSeason,
    nextEp,
    notLastEp,
  };
}

export default useHandler;
