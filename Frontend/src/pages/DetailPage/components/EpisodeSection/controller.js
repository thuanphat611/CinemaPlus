import { useState, useEffect } from "react";

function useHandler(data) {
  const [season, setSeason] = useState(data?.length > 0 ? data.length - 1 : 0);

  useEffect(() => {
    setSeason(data?.length > 0 ? data.length - 1 : 0);
  }, [data]);

  const episodeList = [];
  if (data) {
    for (var i = 0; i < data[Number(season)].episode_count; i++) {
      episodeList.push(i + 1);
    }
  }

  return { season, setSeason, episodeList };
}

export default useHandler;
