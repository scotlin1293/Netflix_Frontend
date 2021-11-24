import {
  FAVORITE,
  UNFAVORITE,
  FETCH_FAVORITES,
} from "../../actions/actionType";

//favMovies is an array that contains objects with the following structure
//{id:123, name:"ASdas",img:"https://asdasd.com"}
const INITIAL_STATE = {
  movies: [],
};

const favMovieReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //action should have the favMovie containing id, img, name of new favorited movie
    case FAVORITE:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
      };
    //filters out the movie id passed in the payload
    case UNFAVORITE: {
      let newFavMovies = state.movies.filter(
        (movie) => movie.id != action.payload
      );
      return {
        ...state,
        movies: newFavMovies,
      };
    }
    case FETCH_FAVORITES:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
      };
    default:
      return state;
  }
};

export default favMovieReducer;
