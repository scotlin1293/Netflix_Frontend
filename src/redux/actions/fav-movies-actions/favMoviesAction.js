import { FAVORITE, UNFAVORITE, FETCH_FAVORITES } from "../actionType";
import request from "../../../axios/api";
import { useSelector } from "react-redux";

//call dispatch(favorite(movie)) with movie = {id, name, url} when someone favorites
//this sends a post request to add the movie to favorites for this user
const favorite = (movie) => async (dispatch) => {
  let data = movie;
  //that's how you access the store from anywhere, this is how your stor looks like (check rootReducer file)
  //to also check in google console do state=useSelector(state=>state); console.log(state), this will show all state data
  // state represents the store and its content, you can never change it by hand, that is why we build actions and dispatch them
  // to change the store. Please recheck the redux unit. I helped a lot but this is still your project
  let token = useSelector((state) => state.user.token);
  if (!token) throw new Error("User is not logged in");
  try {
    //need the token to favorite
    await request(`movies/`, data, "post", token);
    // dispatch
    dispatch({
      type: FAVORITE,
      payload: movie,
    });
  } catch (e) {}
};

//call dispatch(unfavorite(id)) when someone unfavorites
const unfavorite = (id) => async (dispatch) => {
  let token = useSelector((state) => state.user.token);
  if (!token) throw new Error("User is not logged in");

  try {
    await request(`movies/${id}`, "delete", (token = token));
    // dispatch
    dispatch({
      type: UNFAVORITE,
      payload: id,
    });
  } catch (e) {}
};

//call dispatch(fetchFavMovies()) when someone logs in and enters the favorites page the first time.
//Check first if the favmovies reducer contains stuff, if it does, it means the user previously checked his favorites
//therefore no need to reload, you just

const fetchFavMovies = () => async (dispatch) => {
  let token = useSelector((state) => state.user.token);
  if (!token) throw new Error("User is not logged in");
  try {
    let res = await request(`movies/`, (token = token));
    let movies = res.movies;
    // dispatch
    dispatch({
      type: FETCH_FAVORITES,
      payload: movies,
    });
  } catch (e) {}
};

export { favorite, unfavorite, fetchFavMovies };
