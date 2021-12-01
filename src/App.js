import React, { useEffect, useState } from "react";
import Routes from "./routes/Routes";
import axios from "./axios/axios";
import { useDispatch } from "react-redux";
import { LastLocationProvider } from "react-router-last-location";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/uselocalstorage";
import { setupToken } from "./redux/actions/user-actions/userAction";
import { fetchFavMovies } from "./redux/actions/fav-movies-actions/favMoviesAction";
//just to debug and check the userReducer state
import { useSelector } from "react-redux";

export const TOKEN_STORAGE_ID = "netflix-token";

const App = () => {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favMovies = useSelector((state) => state.favMovies);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMv() {
      await dispatch(axios());
    }
    fetchMv();
    console.log(token);
    if (token) {
      (async function setUser() {
        await dispatch(setupToken(token));
        await dispatch(await fetchFavMovies());
      })();
      console.log(user);
      setLoading(false);
    } else {
      console.log("here");

      setLoading(false);
    }
  }, []);
  if (loading) {
    return <div />;
  } else {
    return (
      <BrowserRouter>
        <LastLocationProvider>
          <Navbar />
          <Routes />
          <Footer />
        </LastLocationProvider>
      </BrowserRouter>
    );
  }
};

export default App;
