import { useState, useEffect } from "react";
import axios from "axios";

import { ApiErrorHandler } from "../../../../utils/function";

function useHandler() {
  const imagePlaceholder = "https://placehold.co/342x513?text=No+Image";
  const emptyData = [
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
    {
      id: "",
      name: "",
      poster: imagePlaceholder,
      bigPoster: imagePlaceholder,
    },
  ];
  const [loading, setLoading] = useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [dataList, setDataList] = useState(emptyData);
  const [highlightSeries, setHighlightSeries] = useState(emptyData[0]);

  const today = new Date();
  const currentDate = today.getDay();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const numOfItem = 9;

        const results = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/series/popular`,
          {
            params: {
              count: numOfItem + 1,
            },
          }
        );

        setLoading(false);
        setHighlightSeries(results.data.list[0]);
        setDataList(results.data.list.slice(1, 9));
      } catch (error) {
        setLoading(false);
        ApiErrorHandler(error);
      }
    };
    getData();
  }, []);

  return {
    loading,
    days,
    currentDate,
    dataList,
    highlightSeries,
  };
}

export default useHandler;
