import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeftCircle } from "react-icons/sl";

import { useLocation } from 'react-router-dom'; 
import AnimeInfo from './AnimeInfo'; 


function AnimePage({setShowSearchAndSort}) {
  const location = useLocation();
  const anime = location.state.anime; 
  const navigate = useNavigate();
function handleClick(){
  setShowSearchAndSort(true);
  navigate('/');
  
}  

  return (
    <div>
        <button onClick={handleClick} style={{border:'none'}}> <SlArrowLeftCircle size={30}/></button>
      <AnimeInfo anime={anime} /> 
    </div>
  );
}

export default AnimePage;
