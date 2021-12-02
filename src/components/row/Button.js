import React, { useEffect, useState } from "react";
import { IMAGE_URL } from "../../axios/API_END_POINTS";

import {
  favorite,
  unfavorite,
} from "../../redux/actions/fav-movies-actions/favMoviesAction";

import { useSelector, useDispatch } from "react-redux";

function Button({ movie }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const favMovies = useSelector((state) => state.favMovies).movies;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (favMovies.length != 0) {
      const favMoviesIds = favMovies.map((m) => m.movie_id);
      if (favMoviesIds.includes(movie.id)) setIsFav(true);
      else setIsFav(false);
    }
  }, [favMovies.length]);

  if (user.token == "") {
    return <div />;
  }
  if (!isFav) {
    return (
      <button
        onClick={() => {
          dispatch(
            favorite({
              id: movie.id,
              name: movie.name || movie.title,
              img: `${IMAGE_URL}${movie.poster_path}`,
            })
          );
        }}
      >
        Favorite
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          dispatch(
            unfavorite({
              id: movie.id,
            })
          );
        }}
      >
        Unfavorite
      </button>
    );
  }
}
export default Button;
