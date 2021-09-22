import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Search from "../../assets/index";
import "./Movies.css";
import NavbarMenu from "../../components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form, Input, message } from "antd";
import { Ring } from "react-css-spinners";

function Movies(props) {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [userType, setUserType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getMovieList();
    let userId = localStorage.getItem("user");
    console.log("User Type", userId);
    setUserType(userId);
  });

  const getMovieList = (searchTerm) => {
    console.log("searchTerm", searchTerm);
    // let searchTerm=''
    if (searchTerm === undefined) {
      searchTerm = "a";
    }
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie/?api_key=d88282ba749c9234e734f0fc771addd4&query=${searchTerm}`
      )
      .then((response) => {
        console.log("response-->", response);
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  };

  const handleSearchInput = async () => {
    getMovieList(searchTerm);
  };

  const handleChange = (e) => {
    console.log("e-->", e.target.value);
    setSearchTerm(e.target.value);
  };

  const showAddModal = () => {
    setAddModal(true);
  };

  const handleAddCancel = () => {
    setAddModal(false);
  };

  const handleAddOk = () => {
    setAddModal(false);
  };

  const onMovieSubmit = (values) => {
    console.log("Success");
    console.log("Values", values);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        director: values.director,
        producer: values.producer,
      }),
    };
    fetch("https://reqres.in/api/movie", requestOptions)
      .then((response) => response.json())
      .then((apiData) => setMovieData(apiData));
    message.success("Movie Added Successfully");
  };

  console.log("movies", movies);
  return (
    <Fragment>
      <NavbarMenu />
      <div>
        {!isLoading ? (
          <div className="movies_box_wrapper">
            <h2>Movies</h2>
            <div className="line"></div>
            {userType === "admin" && (
              <div className="row">
                <button className="add_button" onClick={showAddModal}>
                  Add Movie
                </button>
              </div>
            )}
            <form
              //  onSubmit={handleFormSubmit}
              autoComplete="off"
              className="input-group movie_search_group"
            >
              <input
                className="movie_search_input"
                type="search"
                name="searchTerm"
                placeholder="Search Movie Name Here…"
                aria-label="Search"
                onChange={handleChange}
              />
              <span className="movie_search_span">
                <img
                  className="movie_search_icon"
                  src={Search}
                  alt="search"
                  onClick={handleSearchInput}
                />
              </span>
            </form>
            <div>
              <div className="movie_data_container">
                {movies &&
                  movies.map((data, i) => (
                    <center>
                      <Card className="movie_data_wrapper" key={i}>
                        <div className="movie_data_header">
                          <a href={`/moviedetails/${data.id}`}>
                            <img
                              className="movie_data_image"
                              src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
                              alt="poster"
                            />
                          </a>
                        </div>
                        <div className="movie_data_detail">
                          <Link
                            className="movie_data_detail_title"
                            to={`/moviedetails/${data.id}`}
                          >
                            {data.title}
                          </Link>

                          <div className="movie_data_detail_date">
                            {data.release_date}
                          </div>
                        </div>
                      </Card>
                    </center>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Ring color="black" size="40" />
          </div>
        )}
      </div>
      <div>
        <Modal
          title="Movie Details"
          visible={addModal}
          onCancel={handleAddCancel}
          onOk={handleAddOk}
        >
          <div>
            <Form {...layout} name="control-hooks" onFinish={onMovieSubmit}>
              <Form.Item
                name="name"
                label="Movie Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="director"
                label="Director Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="producer"
                label="Producer Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <center>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </center>
            </Form>
          </div>
        </Modal>
      </div>
      <div></div>
    </Fragment>
  );
}

export default Movies;
