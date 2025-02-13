import { useState, useEffect } from "react";
import "./Banner.css"
import axios from "../../utils/axios";
import requests from "../../utils/requests";

const Banner = () => {
  const [movie, setMovie] = useState({});
console.log(requests.fetchNetflixOriginals);
  useEffect(() => {
    // const fetchMovie = async () => {
    //   try {
    //     const request = await axios.get(requests.fetchNetflixOriginals);
    //     const results = request.data.results;

    //     if (results?.length > 0) {
    //       const randomIndex =
    //         results[Math.floor(Math.random() * results.length)];
    //       setMovie(randomIndex);
    //     }
    //   } catch (error) {
    //     if (error.name !== "CanceledError") {
    //       console.error("Error fetching movie:", error);
    //     }
    //   }
    // };
    async function fetchMovie() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchMovie();
  }, []);
  console.log(movie);
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.original_name || "Untitled"}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
