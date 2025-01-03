import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { ApiErrorHandler } from "../../utils/function";

function useHandler(type) {
  const { id, season, episode } = useParams();

  const [data, setData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (type === "movie") {
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/series/${id}/seasons`
        );
        if (response.data.success) {
          setData(response.data.result);
        }
      } catch (error) {
        ApiErrorHandler(error);
      }
    };
    getData();
  }, [id, type]);

  return { id, season, episode, data, loading };
}

export default useHandler;
