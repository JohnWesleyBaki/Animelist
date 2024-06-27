import React from "react";
import { useNavigate } from "react-router-dom";
import AnimeCard from "./AnimeCard";
import { useAnimeContext } from "../contexts/AnimeContext";

function AnimeList() {
  const { animes } = useAnimeContext();
  const navigate = useNavigate();

  const handleAnimeClick = (anime) => {
    navigate(`/anime/${anime.mal_id}`, { state: { anime } });
  };

  return (
    <div className="container">
      {animes.map((anime) => (
        <AnimeCard
          key={anime.mal_id}
          anime={anime}
          onClick={() => handleAnimeClick(anime)}
        />
      ))}
    </div>
  );
}

export default AnimeList;
