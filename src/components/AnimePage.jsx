import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SlArrowLeftCircle } from "react-icons/sl";
import AnimeInfo from "./AnimeInfo";

function AnimePage() {
  const location = useLocation();
  const anime = location.state.anime;
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div className="m-10">
      <button onClick={handleClick} style={{ border: "none" }}>
        <SlArrowLeftCircle size={50} />
      </button>
      <AnimeInfo anime={anime} />
    </div>
  );
}

export default AnimePage;
