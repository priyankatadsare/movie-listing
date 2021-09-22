import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./MovieDetails.css";
import "bootstrap/dist/css/bootstrap.css";
import { Ring } from "react-css-spinners";

function MovieDetails(props) {
  const [movieDetails, setMovieDetails] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("props", props.location);
    const id = props.location.pathname.replace("/moviedetails/", "");
    console.log("id---", id);
    handleDetailData(id);
  }, []);

  const handleDetailData = async (id) => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=d88282ba749c9234e734f0fc771addd4`
      )
      .then((response) => {
        console.log("movieDetails response-->", response);
        setMovieDetails(response.data);
      })

      .catch((err) => {
        setError({ err });
      });
    setIsLoading(false);
  };

  console.log(" moviedetails--->", movieDetails);
  return (
    <div>
      {movieDetails && !isLoading ? (
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
              <b>Title:</b> <br />
              {movieDetails.title}
            </h3>
            <p className="movie_details_data_text">
              <b>Release Date:</b> <br />
              {movieDetails.release_date}
            </p>
            <p className="movie_details_data_text">
              <b>Status:</b> <br />
              {movieDetails.status}
            </p>
            <p className="movie_details_data_text">
              <b>Overview:</b> <br />
              {movieDetails.overview}
            </p>
            {movieDetails.genres && (
              <table>
                <tbody>
                  <tr>
                    <td>
                      <b>Genres:</b> <br />
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
      ) : (
        <Ring />
      )}
    </div>
  );
}

export default withRouter(MovieDetails);
