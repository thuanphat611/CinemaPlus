import { useState } from "react";

function useHandler() {
  const [activeIndex, setActiveIndex] = useState(0);

  return { activeIndex, setActiveIndex };
}

export default useHandler;
