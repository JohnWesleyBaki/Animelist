import React, { createContext, useContext, useState } from "react";

const AnimeContext = createContext();

export const AnimeProvider = ({ children }) => {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [topPage, setTopPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [userId, setUserId] = useState(null);

  const value = {
    animes,
    setAnimes,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    searchPage,
    setSearchPage,
    topPage,
    setTopPage,
    isSearch,
    setIsSearch,
    userId,
    setUserId,
  };

  return (
    <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>
  );
};

export const useAnimeContext = () => useContext(AnimeContext);
