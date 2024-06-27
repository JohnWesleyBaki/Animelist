import React, { useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { getAnimeListByStatus } from "../listService";

function AnimeListManager() {
  const [userId, setUserId] = useState("");
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("watched");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleFetchList = async (status) => {
    try {
      const userList = await getAnimeListByStatus(userId, status);
      setList(userList);
    } catch (error) {
      alert("Failed to fetch anime list.");
    }
  };

  useEffect(() => {
    if (userId) {
      handleFetchList(status);
    }
  }, [userId, status]);

  return (
    <div>
      <h2>Your Anime Lists</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="watched">Watched</option>
        <option value="plan to watch">Plan to Watch</option>
        <option value="favorite">Favorite</option>
        <option value="disliked">Disliked</option>
      </select>
      <ul>
        {list.map((anime) => (
          <li key={anime.$id}>
            {anime.animeId} - {anime.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimeListManager;
