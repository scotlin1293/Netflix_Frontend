import { combineReducers } from "redux";
import moviesCategoryReducer from "./reducers/movies-category-reducer/moviesCategoryReducer";
import allMoviesReducer from "./reducers/all-movies-reducer/allMoviesReducer";
import userReducer from "./reducers/user-reducer/userReducer";
import favMoviesReducer from "./reducers/favorite-movies-reducer/favMoviesReducer";

const rootReducer = combineReducers({
  movieCategory: moviesCategoryReducer,
  allMovies: allMoviesReducer,
  user: userReducer,
  favMovies: favMoviesReducer,
});

//actions that should be dispatched:
// User stuff
// on login dispatch login, the token will be saved in user.token in the store
// you will also need to save it in local storage
// on register dispatch register, and do same as above
// on app start (in app.js) check localstorage and check user.token. if user.token =="" and localstorage has a token
// then dispatch setup action to set up the token
// on logout remove token from localstorage and dispatch setup to set the token at ""

// favMovies stuff (insure that the user.token has something or else don't render the page first!!)
// on user visit to the favorites page check if the favMovies.movies from the store has data, if it does it means we already loaded them
// so no need to dispatch(fetchFavMovies). If it does not that means we did not load them yet, so dispatch that action
// on favorite dispatch favorite action with movie payload ={id,name,url}
// on unfavorite dispatch unfavorite action with payload = id of movie

// THAT's IT
// I fixed the userReducer and actions
// I added new favMoviesReducer and actions and added lots of comments there!
export default rootReducer;
