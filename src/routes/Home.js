import React, { useEffect, useState } from "react";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as S from "./style";

function Home() {
  const [loading, setloading] = useState(true);
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    )
      .then((res) => res.json())
      .then((json) => {
        setmovies(json.data.movies);
        setloading(false);
      });
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <S.Main>
            {movies.map((movie) => (
              <div key={movie.id}>
                <img src={movie.medium_cover_image} />
                <h2>
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </h2>
                <p>{movie.summary}</p>
                {movie.hasOwnProperty("genres") ? (
                  <ul>
                    {movie.genres.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </S.Main>
        )}
      </div>
    </>
  );
}

// Home.PropTypes = {
//   medium_cover_image: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   summary: PropTypes.string.isRequired,
//   genres: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

export default Home;
