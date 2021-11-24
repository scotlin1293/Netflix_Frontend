/* eslint-disable  import/no-named-as-default-member */
/* eslint-disable  import/no-named-as-default */

import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "../container/Homepage";
import Movie from "../pages/movie-show-page/Movie";
import MovieCategory from "../pages/movie-category-page/MovieCategory";
import SearchResult from "../pages/search-result-page/SearchResult";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login/" component={Login} exact />
      <Route path="/signup/" component={SignUp} exact />
      <Route path="/" component={Homepage} exact />
      <Route path="/action/" component={MovieCategory} exact />
      <Route path="/horror/" component={MovieCategory} exact />
      <Route path="/comedy/" component={MovieCategory} exact />
      <Route path="/top_rated/" component={MovieCategory} exact />
      <Route path="/search/" component={SearchResult} exact />
      <Route path="/:movie/:id" component={Movie} />
    </Switch>
  );
};

export default Routes;
