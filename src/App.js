import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login";
import Movies from "./components/Movies"
import Artists from "./components/Artists";
import Genres from "./components/Genres";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route
            className="movie_data_detail_title"
            path="/"
            exact
            component={Login}
          ></Route>
          <Route
            className="movie_data_detail_title"
            path="/movies"
            exact
            component={Movies}
          ></Route>
          <Route
            className="movie_data_detail_title"
            path="/moviedetails/:id"
            exact
            component={MovieDetails}
          ></Route>
           <Route
            className="movie_data_detail_title"
            path="/artists"
            exact
            component={Artists}
          ></Route>
           <Route
            className="movie_data_detail_title"
            path="/genres"
            exact
            component={Genres}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
