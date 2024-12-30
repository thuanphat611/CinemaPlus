import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function useHandler(type) {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [numToLoad, setNumToLoad] = useState(0);
  const [numLoaded, setNumLoaded] = useState(0);
  const [data, setData] = useState(undefined);
  const [collection, setCollection] = useState([]);
  const [casts, setCasts] = useState({});
  const [videos, setVideos] = useState([]);

  const formatMoney = (money) => {
    money = money.toString();
    var result = "";
    var count = 0;

    for (var i = money.length - 1; i >= 0; i--) {
      result = money[i] + result;
      count++;
      if (count === 3 && i !== 0) {
        result = "," + result;
        count = 0;
      }
    }

    return result;
  };

  //useEffect to check if the page is completely loaded
  useEffect(() => {
    if (numLoaded >= numToLoad) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [numToLoad, numLoaded]);

  //Load movie detail
  useEffect(() => {
    const getData = async () => {
      setNumToLoad((val) => val + 1);

      let result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/${type}/detail/${id}`
      );
      setData(result.data.detail);

      if (result?.data.detail.collection) {
        const resultCollection = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/collection/${result.data.detail.collection.id}`
        );
        setCollection(resultCollection.data.detail);
      }

      setNumLoaded((val) => val + 1);
    };
    getData();
  }, [id, type]);

  //Load casts and director
  useEffect(() => {
    const getData = async () => {
      setNumToLoad((val) => val + 1);

      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/${type}/${id}/credit`
      );
      setCasts(result.data.credit);

      setNumLoaded((val) => val + 1);
    };
    getData();
  }, [id, type]);

  //Load trailers and teasers
  useEffect(() => {
    const getData = async () => {
      setNumToLoad((val) => val + 1);
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/${type}/${id}/videos`
      );
      setVideos(result.data.videos);

      setNumLoaded((val) => val + 1);
    };
    getData();
  }, [id, type]);

  return {
    id,
    loading,
    numToLoad,
    numLoaded,
    data,
    collection,
    casts,
    videos,
    formatMoney,
  };
}

export default useHandler;
