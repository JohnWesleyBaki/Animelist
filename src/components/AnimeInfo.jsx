import React from "react";
import { addAnimeToList } from "../listService";
import { useAnimeContext } from "../contexts/AnimeContext";

function AnimeInfo({ anime }) {
  const { userId } = useAnimeContext();

  const handleAddToList = async (status) => {
    try {
      await addAnimeToList(anime.mal_id, userId, status);
      alert(`Anime added to ${status} list!`);
    } catch (error) {
      alert(`Failed to add anime to ${status} list.`);
    }
  };

  return (
    <div className="font-sans mt-5">
      <h2 className="text-2xl mb-4 max-w-max mx-auto">{anime.title}</h2>
      <div className="flex mt-5">
        <img
          src={
            anime.images?.jpg?.large_image_url ||
            anime.images?.webp?.large_image_url
          }
          alt={anime.title}
          className="w-auto h-auto mr-4"
        />
        <div className="flex-1">
          <p className="mb-4">
            <strong>Synopsis:</strong> {anime.synopsis}
          </p>
          <p className="mb-2">
            <strong>Type:</strong> {anime.type}
          </p>
          <p className="mb-2">
            <strong>Source:</strong> {anime.source}
          </p>
          <p className="mb-2">
            <strong>Episodes:</strong> {anime.episodes}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {anime.status}
          </p>
          <p className="mb-2">
            <strong>Aired:</strong> {anime.aired.string}
          </p>
          <p className="mb-2">
            <strong>Duration:</strong> {anime.duration}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {anime.rating}
          </p>
          <p className="mb-2">
            <strong>Score:</strong> {anime.score}
          </p>
          <p className="mb-2">
            <strong>Ranked:</strong> {anime.rank}
          </p>
          <p className="mb-2">
            <strong>Popularity:</strong> {anime.popularity}
          </p>
          <p className="mb-2">
            <strong>Genres:</strong>{" "}
            {anime.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Themes:</strong>{" "}
            {anime.themes.map((theme) => theme.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Demographics:</strong>{" "}
            {anime.demographics
              .map((demographic) => demographic.name)
              .join(", ")}
          </p>
          <div className="flex">
            <button
              onClick={() => handleAddToList("watched")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Add to Watched
            </button>
            <button
              onClick={() => handleAddToList("plan to watch")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Add to Plan to Watch
            </button>
            <button
              onClick={() => handleAddToList("favorite")}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Add to Favorite
            </button>
            <button
              onClick={() => handleAddToList("disliked")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Disliked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeInfo;
