import { useEffect, useState } from "react";

function useHandler(imageList) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  let movieName = imageList ? imageList[activeIndex].name : "";
  let movieIMDB = imageList ? imageList[activeIndex].rating : "";

  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= imageList?.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return imageList?.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  //mobile swipe handlers
  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      //handle swipe left
      slideNext();
    }
    if (touchEndX - touchStartX > 50) {
      //handle swipe right
      slidePrev();
    }
  };

  return {
    activeIndex,
    slideDone,
    timeID,
    movieName,
    movieIMDB,
    AutoPlayStop,
    AutoPlayStart,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    slidePrev,
    slideNext,
    setActiveIndex,
  };
}

export default useHandler;
