import React,{ useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import './row.css';
import movieTrailer from 'movie-trailer';
import YouTube from "react-youtube";


const Row = ({ title,fetchUrl,isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerURL] = useState("");
  const base_url = "http://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
    console.error("Error fetching data:", error);
      }
    };
    fetchData();
}, [fetchUrl]);

const handleClick = (movie) => {
  if (trailerUrl) {
    setTrailerURL('');
  } else {
    movieTrailer(movie?.title || movie?.name || movie?.original_name || "").then((url) => {
      if (url) {
 const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerURL(urlParams.get('v'));
      }else {
        console.log("Trailer not found");
      }
     
    })
  .catch((error) => console.error("Error finding trailer:", error)); 
  }
};
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay:1,
    },

  };
  console.log(movies);
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row_posters'>
        {movies?.map((movie, index) => (
          <img
          style={{width:"200px"}}
          key={index}
          onClick={() => handleClick(movie)}
          src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
          alt={movie.name}
          className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`
        }/> 

       ))}
  </div>
  {
    trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
  }

  
  </div>
  );
};


export default Row;