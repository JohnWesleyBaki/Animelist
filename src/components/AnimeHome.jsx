// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAnimeContext } from "./AnimeContext";
// import AnimeList from "./AnimeList";
// import UserInfoButton from "./UserInfoButton";
// import LogOut from "./LogOut";

// function AnimeHome() {
//   const {
//     animes,
//     setAnimes,
//     searchTerm,
//     setSearchTerm,
//     sortBy,
//     setSortBy,
//     searchPage,
//     setSearchPage,
//     topPage,
//     setTopPage,
//     isSearch,
//     setIsSearch,
//     userId, // Retrieve userId from context
//   } = useAnimeContext();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchAnimes = async (url) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setLoading(false);
//       return data.data;
//     } catch (error) {
//       setLoading(false);
//       setError("Failed to fetch anime data. Please try again later.");
//       console.error("Error fetching anime data:", error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     if (isSearch) {
//       fetchAnimes(
//         `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=${searchPage}`
//       )
//         .then((data) => setAnimes(data))
//         .catch((error) => console.error("Error fetching anime data:", error));
//     } else {
//       fetchAnimes(
//         `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${topPage}`
//       )
//         .then((data) => setAnimes(data))
//         .catch((error) => console.error("Error fetching anime data:", error));
//     }
//   }, [searchTerm, searchPage, topPage, isSearch, setAnimes]);

//   const handleSearch = async () => {
//     setIsSearch(searchTerm.trim() !== "");
//     const animeData = await fetchAnimes(
//       `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=${searchPage}`
//     );
//     setAnimes(animeData);
//   };

//   const handleSortChange = (event) => {
//     setSortBy(event.target.value);
//   };

//   let sortedAnimes = [...animes];

//   if (sortBy) {
//     sortedAnimes.sort((a, b) => {
//       if (sortBy === "title") {
//         return a.title.localeCompare(b.title);
//       } else if (sortBy === "ranking") {
//         return a.rank - b.rank;
//       } else if (sortBy === "popularity") {
//         return a.popularity - b.popularity;
//       }
//       return 0;
//     });
//   }

//   return (
//     <div>
//       <div>
//         <h3>Boku No Anime</h3>
//       </div>
//       <div className="container">
//         <input
//           type="text"
//           placeholder="Search for anime e.g. Naruto"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//         <div className="select-container">
//           <label htmlFor="sortBy" className="select-label">
//             Sort By:
//           </label>
//           <select
//             id="sortBy"
//             className="select"
//             value={sortBy}
//             onChange={handleSortChange}
//           >
//             <option value="">None</option>
//             <option value="title">Title</option>
//             <option value="ranking">Ranking</option>
//             <option value="popularity">Popularity</option>
//           </select>
//           <span className="select-arrow">&#9660;</span>
//         </div>
//       </div>

//       <div>
//         <UserInfoButton />
//       </div>
//       {loading ? (
//         <div className="loader">
//           <div className="spinner"></div>
//           <p>Loading...</p>
//         </div>
//       ) : error ? (
//         <div className="error">
//           <p>{error}</p>
//         </div>
//       ) : (
//         <AnimeList animes={sortedAnimes} userId={userId} />
//       )}
//       <div className="pagination">
//         <div>
//           <span>
//             <button
//               onClick={() =>
//                 setSearchPage((prevPage) => Math.max(prevPage - 1, 1))
//               }
//               disabled={searchPage === 1}
//             >
//               Previous
//             </button>
//           </span>
//           <span>Page {isSearch ? searchPage : topPage}</span>
//           <span>
//             <button onClick={() => setSearchPage((prevPage) => prevPage + 1)}>
//               Next
//             </button>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AnimeHome;

import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useAnimeContext } from "../contexts/AnimeContext";
import AnimeList from "./AnimeList";
import UserInfoButton from "./UserInfoButton";
import { useNavigate } from "react-router-dom";

function AnimeHome() {
  const {
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
  } = useAnimeContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMorePages, setHasMorePages] = useState(true);
  const navigate = useNavigate();

  const fetchAnimes = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLoading(false);
      setHasMorePages(data.pagination.has_next_page);
      return data.data;
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch anime data. Please try again later.");
      console.error("Error fetching anime data:", error);
      return [];
    }
  };

  const fetchTopAnimes = async () => {
    const url = `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${topPage}`;
    const topAnimeData = await fetchAnimes(url);
    setAnimes(topAnimeData);
  };

  const fetchSearchAnimes = async () => {
    const url = `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=${searchPage}`;
    const searchAnimeData = await fetchAnimes(url);
    setAnimes(searchAnimeData);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setIsSearch(false);
      setSearchPage(1); // Reset search page
      setTopPage(1); // Reset top page
      fetchTopAnimes();
    } else {
      setIsSearch(true);
      setSearchPage(1); // Reset search page to 1 for new search
      const url = `https://api.jikan.moe/v4/anime?q=${searchTerm}&page=1`;
      const animeData = await fetchAnimes(url);
      setAnimes(animeData);
    }
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);

    let sortedAnimes = [...animes];

    if (newSortBy) {
      sortedAnimes.sort((a, b) => {
        if (newSortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (newSortBy === "ranking") {
          return a.rank - b.rank;
        } else if (newSortBy === "popularity") {
          return a.popularity - b.popularity;
        }

        return 0;
      });
    }
    setAnimes(sortedAnimes);
  };

  useEffect(() => {
    if (isSearch) {
      fetchSearchAnimes();
    } else {
      fetchTopAnimes();
    }
  }, [topPage, searchPage]);

  return (
    <div className="p-3">
      <div
        className="justify-start place-items-start cursor-pointer"
        onClick={navigate("/")}
      >
        <h1 className="text-3xl">
          <span className="text-red-600">B</span>oku No Anime
        </h1>
      </div>
      <div className="container mx-auto flex items-center space-x-2 mt-5">
        <input
          type="text"
          placeholder="Search for anime e.g. Naruto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
        <div className="select-container flex items-center">
          <label htmlFor="sortBy" className="select-label">
            Sort By:
          </label>
          <select
            id="sortBy"
            className="select border border-gray-300 px-3 py-2 rounded-md focus:outline-none"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="ranking">Ranking</option>
            <option value="popularity">Popularity</option>
          </select>
          <span className="select-arrow">&#9660;</span>
        </div>
      </div>
      <div></div>
      <div>
        <UserInfoButton />
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <FaSpinner size={50} className="animate-spin mr-3 text-blue-500" />
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="error mt-5">
          <p>{error}</p>
        </div>
      ) : (
        <AnimeList />
      )}
      <div className="flex justify-center items-center mt-5 ">
        <button
          onClick={() => {
            if (isSearch) {
              setSearchPage((prevPage) => Math.max(prevPage - 1, 1));
            } else {
              setTopPage((prevPage) => Math.max(prevPage - 1, 1));
            }
          }}
          disabled={isSearch ? searchPage === 1 : topPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
        >
          Previous
        </button>
        <span>Page {isSearch ? searchPage : topPage}</span>
        <button
          onClick={() => {
            if (isSearch) {
              setSearchPage((prevPage) => prevPage + 1);
            } else {
              setTopPage((prevPage) => prevPage + 1);
            }
          }}
          disabled={!hasMorePages}
          className={`bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md ml-2 ${
            !hasMorePages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AnimeHome;
