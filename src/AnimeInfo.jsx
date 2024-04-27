import React from 'react';
import './AnimeInfo.css'; 

function AnimeInfo({ anime }) {
  return (
    <div className="anime-info">
      <h2>{anime.title}</h2>
      <div className="anime-details">
        <img src={anime.images?.jpg?.large_image_url || anime.images?.webp?.large_image_url} alt={anime.title} />
        <div className="details">
        <p><strong>Synopsis:</strong> {anime.synopsis}</p>
          <p><strong>Type:</strong> {anime.type}</p>
          <p><strong>Source:</strong> {anime.source}</p>
          <p><strong>Episodes:</strong> {anime.episodes}</p>
          <p><strong>Status:</strong> {anime.status}</p>
          <p><strong>Aired:</strong> {anime.aired.string}</p>
          <p><strong>Duration:</strong> {anime.duration}</p>
          <p><strong>Rating:</strong> {anime.rating}</p>
          <p><strong>Score:</strong> {anime.score}</p>
          <p><strong>Ranked:</strong> {anime.rank}</p>
          <p><strong>Popularity:</strong> {anime.popularity}</p>
          
          <p><strong>Genres:</strong> {anime.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Themes:</strong> {anime.themes.map(theme => theme.name).join(', ')}</p>
          <p><strong>Demographics:</strong> {anime.demographics.map(demographic => demographic.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default AnimeInfo;
