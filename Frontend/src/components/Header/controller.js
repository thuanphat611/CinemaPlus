import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useAuth } from "../../hooks";

function useHandler() {
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const headerRef = useRef(null);
  const searchRef = useRef(null);

  const { auth, user, setSignedOut } = useAuth();

  if (searchRef.current && searchOpen) {
    searchRef.current.focus();
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        headerRef.current.style.background =
          "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0))";
      } else {
        headerRef.current.style.background = "rgba(22, 22, 22, 1)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Get result for searchbar
  useEffect(() => {
    const getResult = async () => {
      const movieList = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/search?search=${searchText}`
      );

      const seriesList = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/series/search?search=${searchText}`
      );

      const result = [...movieList.data.results, ...seriesList.data.results];
      setSearchResult(result);
    };

    if (searchText.length === 0) {
      setSearchResult([]);
      return;
    }
    getResult();
  }, [searchText]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToRef = (cardRef) => {
    if (cardRef.current) {
      const topOffset = cardRef.current.offsetTop;
      window.scrollTo({
        top: topOffset - 100,
        behavior: "smooth",
      });
    }
  };

  const handleLogout = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/logout`;
    await axios.post(url, {}, { withCredentials: true });
    setSignedOut();
    window.location.reload();
  };

  return {
    searchText,
    searchOpen,
    searchResult,
    headerRef,
    searchRef,
    auth,
    user,
    setSearchText,
    setSearchOpen,
    scrollToTop,
    scrollToRef,
    handleLogout,
  };
}

export default useHandler;
