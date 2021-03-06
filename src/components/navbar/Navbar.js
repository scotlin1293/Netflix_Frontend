/* eslint-disable  import/no-named-as-default-member */
/* eslint-disable  import/no-named-as-default */

import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { Redirect, NavLink } from "react-router-dom";
import styles from "./styles/Navbar.module.css";
import NFLogo from "./img/NF.png";
import SearchResult from "../../pages/search-result-page/SearchResult";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorage from "../../hooks/uselocalstorage";
import { setupToken } from "../../redux/actions/user-actions/userAction";

export const TOKEN_STORAGE_ID = "netflix-token";

function Navbar() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [show, handleShow] = useState(false);
  const moviesData = useSelector((state) => state.allMovies);
  const movies = moviesData ? moviesData.movieCollection : [];
  const [search, setSearch] = useState([]);
  const [isSearchActive, setSearchActive] = useState(false);
  const [isImageClicked, setIsImageClicked] = useState(false);

  const logout = () => {
    dispatch(setupToken(""));
    setToken("");
  };
  const getUniqueMovies = (movies, key) => {
    const unique = movies
      .map((movie) => movie[key])
      .map((movie, i, final) => final.indexOf(movie) === i && i)
      .filter((movie) => movies[movie])
      .map((movie) => movies[movie]);
    return unique;
  };

  const clearInputField = () => {
    setSearch([]);
    setSearchActive(false);
    document.querySelectorAll("input")[0].value = "";
  };

  const uniqueMovies = getUniqueMovies(movies, "id");

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearch([]);
      setSearchActive(false);
      return;
    }
    setSearchActive(true);
    setSearch(
      uniqueMovies.filter((movie) => {
        const name = movie.name || movie.title;
        return name.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  useEffect(() => {
    /* eslint-disable no-unused-expressions */
    // window.addEventListener("scroll", () => {
    //   window.scrollY > 95 ? handleShow(true) : handleShow(false);
    // });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  return (
    <>
      <div className={`${styles.navbar} ${show && styles.navbarColor}`}>
        <div className={styles["flex-container"]}>
          <div className={styles["flex-container-logo"]}>
            <NavLink to="/" className={styles["netflix-logo"]}>
              <img className={styles.logo} src={NFLogo} alt="Netflix Logo" />
            </NavLink>
            <div className={styles.links}>
              <NavLink
                className={styles.link}
                onClick={clearInputField}
                to="/"
                exact
                activeStyle={{ fontWeight: "bold" }}
              >
                Home
              </NavLink>
              <NavLink
                className={styles.link}
                onClick={clearInputField}
                to={{
                  pathname: "/action/",
                  state: { category: "ActionMovies", title: "Action" },
                }}
                exact
                activeStyle={{ fontWeight: "bold" }}
              >
                Action
              </NavLink>
              <NavLink
                className={styles.link}
                onClick={clearInputField}
                to={{
                  pathname: "/horror/",
                  state: { category: "HorrorMovies", title: "Horror" },
                }}
                exact
                activeStyle={{ fontWeight: "bold" }}
              >
                Horror
              </NavLink>
              <NavLink
                className={styles.link}
                onClick={clearInputField}
                to={{
                  pathname: "/comedy/",
                  state: { category: "ComedyMovies", title: "Comedy" },
                }}
                exact
                activeStyle={{ fontWeight: "bold" }}
              >
                Comedy
              </NavLink>
              <NavLink
                className={styles.link}
                onClick={clearInputField}
                to={{
                  pathname: "/top_rated/",
                  state: { category: "TopRated", title: "Top rated" },
                }}
                exact
                activeStyle={{ fontWeight: "bold" }}
              >
                Top rated
              </NavLink>
            </div>
          </div>
          <div className={styles["search-container"]}>
            <ImSearch className={`${styles.icons} ${styles["search-icon"]}`} />
            {isSearchActive && (
              <Redirect className={styles.link} to="/search" />
            )}
            {!isSearchActive && !isImageClicked && <Redirect to="/" />}
            <input
              type="text"
              placeholder="Title, people, genres"
              className={styles.input}
              onChange={handleSearch}
            />
            {user.token == "" ? (
              <div>
                <NavLink
                  className={styles.link}
                  onClick={clearInputField}
                  to={{
                    pathname: "/login/",
                  }}
                  exact
                  activeStyle={{ fontWeight: "bold" }}
                >
                  Login
                </NavLink>
                <NavLink
                  className={styles.link}
                  onClick={clearInputField}
                  to={{
                    pathname: "/signup/",
                  }}
                  exact
                  activeStyle={{ fontWeight: "bold" }}
                >
                  SignUp
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink
                  className={styles.link}
                  onClick={clearInputField}
                  to={{
                    pathname: "/favorites/",
                  }}
                  exact
                  activeStyle={{ fontWeight: "bold" }}
                >
                  My List
                </NavLink>
                <NavLink
                  className={styles.link}
                  onClick={logout}
                  to={{
                    pathname: "/",
                  }}
                  exact
                  activeStyle={{ fontWeight: "bold" }}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
      {isSearchActive ? (
        <SearchResult
          setIsImageClicked={setIsImageClicked}
          setSearchActive={setSearchActive}
          movies={search}
        />
      ) : null}
    </>
  );
}

export default React.memo(Navbar);
