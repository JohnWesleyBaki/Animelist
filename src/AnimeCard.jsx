import React from 'react';
import './AnimeCard.css'; 

function AnimeCard({ anime, onClick }) {
  return (
    <div className="anime-card" onClick={onClick}> 
      <img src={anime.images?.jpg?.image_url} alt={anime.title} />
      <p className="anime-title">{anime.title}</p>
    </div>
  );
}

export default AnimeCard;
