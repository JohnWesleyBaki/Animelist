// AnimeCard.jsx
import React from "react";
import { addAnimeToList } from "../listService";
import { useAnimeContext } from "../contexts/AnimeContext";

function AnimeCard({ anime, onClick }) {
  const handleAddToList = async (status) => {
    try {
      // console.log("userId:", userId);
      // console.log("anime.id:", id);
      // console.log("status:", status);
      const { userId } = useAnimeContext();
      await addAnimeToList(anime.mal_id, userId.userId, status);
      alert(`Anime added to ${status} list!`);
    } catch (error) {
      alert(`Failed to add anime to ${status} list.`);
    }
  };

  return (
    <div
      className="w-60 h-96 mx-5 my-4 rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-1"
      onClick={onClick}
    >
      <img
        src={anime.images?.jpg?.image_url}
        className="w-full h-3/4 object-cover"
        alt={anime.title}
      />
      <div className="bg-orange-500 text-white font-bold text-sm py-2 px-3 rounded-b-lg">
        {anime.title}
      </div>
      {/* <button onClick={() => handleAddToList("watched")}>Add to Watched</button>
      <button onClick={() => handleAddToList("plan to watch")}>
        Add to Plan to Watch
      </button>
      <button onClick={() => handleAddToList("favorite")}>
        Add to Favorite
      </button>
      <button onClick={() => handleAddToList("disliked")}>
        Add to Disliked
      </button> */}
    </div>
  );
}

export default AnimeCard;
