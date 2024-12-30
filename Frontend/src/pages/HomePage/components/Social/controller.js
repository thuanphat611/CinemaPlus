import { useState } from "react";

function useHandler() {
  const [input, setInput] = useState("");

  return { input, setInput };
}

export default useHandler;
