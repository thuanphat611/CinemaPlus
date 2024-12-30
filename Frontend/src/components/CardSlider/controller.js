import { useState, useRef, useEffect } from "react";

function useHandler(title, source, type) {
  const sliderTitle = title ? title : "None titled";
  const sliderContent = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = source ? source.length : 0;
  let slideOffset = 0;

  if (type === "movie") slideOffset = 203;
  else if (type === "cast") slideOffset = 233;

  useEffect(() => {
    if (sliderContent) {
      sliderContent.current.style =
        "transform: translateX(-" + (slideOffset + 15) * currentPage + "px)"; // tùy theo width và margin left của card
    }
  });

  const slideNext = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
    }
  };

  const slidePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(pages - 1);
    }
  };

  return { sliderTitle, sliderContent, slideNext, slidePrev };
}

export default useHandler;
