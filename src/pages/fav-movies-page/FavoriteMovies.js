import React from "react";
import styles from "./FavoriteMovies.css";
import { useSelector, useDispatch } from "react-redux";

function FavoriteMovies() {
  const favMovies = useSelector((state) => state.favMovies).movies;

  return (
    <div>
      {favMovies.map((movie) => {
        return (
          <div>
            <img
              key={movie.movie_id}
              width={200}
              height="auto"
              src={movie.img}
              alt={movie.name}
            />
            <span>{movie.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteMovies;
