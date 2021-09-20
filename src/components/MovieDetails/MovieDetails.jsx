import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./MovieDetails.css";
import "bootstrap/dist/css/bootstrap.css";
class MovieDetails extends Component {
  state = {
    movieDetails: {},
  };

  componentDidMount = () => {
    console.log("this props", this.props.location);
    const id = this.props.location.pathname.replace("/moviedetails/", "");
    console.log("id---", id);
    this.handleDetailData(id);
  };

  handleDetailData = async (id) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=d88282ba749c9234e734f0fc771addd4`
      )
      .then((response) => {
        console.log("movieDetails response-->", response);
        this.setState({ movieDetails: response.data });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };
  render() {
    const { movieDetails } = this.state;
    console.log(" moviedetails--->", this.state.movieDetails);
    return (
      <div>
        {movieDetails && (
          <div className="movie_details_data_wrapper">
            <div>
              <img
                className="movie_details_data_image"
                src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`}
                alt="poster"
              />
            </div>
            <div className="movie_details_block">
              <h3 className="movie_details_data_header">
                Title: {movieDetails.title}
              </h3>
              <p className="movie_details_data_text">
                Release Date: {movieDetails.release_date}
              </p>
              <p className="movie_details_data_text">
                Status: {movieDetails.status}
              </p>
              {movieDetails.genres && (
                <table>
                  <tbody>
                    <tr>
                      <td>
                        Genres:{" "}
                        {movieDetails.genres.map((data, i) => {
                          return `  ${data.name}, `;
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(MovieDetails);
