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
      <S.Main>
        {loading ? (
          <S.loder>
            <h1>Loading...</h1>
          </S.loder>
        ) : (
          <S.movies>
            {movies.map((movie) => (
              <S.movie key={movie.id}>
                <S.movie__img src={movie.medium_cover_image} />
                <h2>
                  <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                </h2>
                <S.movie__year>{movie.year}</S.movie__year>
                <p>
                  {movie.summary.length > 245
                    ? `${movie.summary.slice(0, 245)}...`
                    : movie.summary}
                </p>
                {movie.hasOwnProperty("genres") ? (
                  <S.movie__genres>
                    {movie.genres.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </S.movie__genres>
                ) : null}
              </S.movie>
            ))}
          </S.movies>
        )}
      </S.Main>
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
