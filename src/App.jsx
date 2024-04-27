// 
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeList from './AnimeList';
import AnimePage from './AnimePage';
import  './App.css';

function App() {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showSearchAndSort, setShowSearchAndSort] = useState(true);
  
  // Function to fetch anime data
  const getAnime = async (name) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${name}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching anime data:', error);
      return [];
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      const animeData = await getAnime(searchTerm);
      setAnimes(animeData);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };



  
useEffect(() => {
  // Fetch anime data and update state for initial load
  getAnime("Naruto")
    .then(data => 
      setAnimes(data))
    .catch(error => console.error('Error fetching anime data:', error));
}, []);


  // sort the anime list based on selected criteria
  let SortedAnimes = [...animes];

  if (sortBy) {
    SortedAnimes.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "ranking") {
        return a.rank - b.rank;
      }else if (sortBy === "popularity") {
        return a.popularity - b.popularity;
      }
    });
  }

  return (
    <Router>
      <div className='container'>
      {showSearchAndSort && (
          <>
        <input
          type="text"
          placeholder="Search for anime e.g. Naruto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>


          <div className="select-container">
            <label htmlFor="sortBy" className="select-label">Sort By:</label>
            <select id="sortBy" className="select" value={sortBy} onChange={handleSortChange}>
              <option value="">None</option>
              <option value="title">Title</option>
              <option value="ranking">Ranking</option>
              <option value="popularity">Popularity</option>
            </select>
            <span className="select-arrow">&#9660;</span>
          </div>

          </>
        )}

        </div>
        
        <Routes>
          <Route path="/" element={<AnimeList animes={SortedAnimes} />} />
          <Route
            path="/"
            element={<AnimeList setShowSearchAndSort={setShowSearchAndSort} />}
          />
          <Route path="/anime/:id" element={<AnimePage />} />
        </Routes>
      
    </Router>
  );
}

export default App;
