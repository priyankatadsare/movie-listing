import axios from "axios";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Search from "../../assets/index";
import "./Movies.css";
import NavbarMenu from "../../components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form, Input, message } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Movies extends Component {
  state = {
    movies: [],
    movieDetails: {},
    selectedValue: [],
    setSelectedValue: [],
    isLoading: false,
    addModal: false,
    movieData: {},
    userType: "",
  };

  componentDidMount() {
    this.getMovieList();
    let userId = localStorage.getItem("user");
    console.log("User Type", userId);
    this.setState({ userType: userId });
  }

  getMovieList(searchTerm) {
    console.log("searchTerm", searchTerm);
    // let searchTerm=''
    if (searchTerm === undefined) {
      searchTerm = "a";
    }
    // this.setState({ isLoading: true });
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie/?api_key=d88282ba749c9234e734f0fc771addd4&query=${searchTerm}`
      )
      .then((response) => {
        console.log("response-->", response);
        this.setState({ movies: response.data.results, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  handleSearchInput = async () => {
    this.getMovieList(this.state.searchTerm);
    console.log("this.state", this.state);
  };

  handleChange = (e) => {
    console.log("e-->", e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  showAddModal = () => {
    this.setState({ addModal: true });
  };

  handleAddCancel = () => {
    this.setState({ addModal: false });
  };

  handleAddOk = () => {
    this.setState({ addModal: false });
  };

  onMovieSubmit = (values) => {
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
      .then((apiData) => this.setState({ movieData: apiData }));
    message.success("Movie Added Successfully");
  };

  render() {
    const { movies, selectedOption, isLoading } = this.state;
    console.log("movies", this.state.movies);
    return (
      <Fragment>
        <NavbarMenu />
        <div>
          {!isLoading ? (
            <div className="movies_box_wrapper">
              <h2>Movies</h2>
              <div className="line"></div>
              {this.state.userType == "admin" && (
                <div className="row">
                  <button className="add_button" onClick={this.showAddModal}>
                    Add Movie
                  </button>
                </div>
              )}
              <form
                onSubmit={this.handleFormSubmit}
                autoComplete="off"
                className="input-group movie_search_group"
              >
                <input
                  className="movie_search_input"
                  type="search"
                  name="searchTerm"
                  placeholder="Search Movie Name Here…"
                  aria-label="Search"
                  onChange={this.handleChange}
                />
                <span className="movie_search_span">
                  <img
                    className="movie_search_icon"
                    src={Search}
                    alt="search"
                    onClick={this.handleSearchInput}
                  />
                </span>
              </form>
              <div>
                <div className="movie_data_container">
                  {movies &&
                    movies.map((data, i) => (
                      <center>
                        <Card
                          className="movie_data_wrapper"
                          onClick={this.handleRedirect}
                          key={i}
                        >
                          <div className="movie_data_header">
                            <img
                              className="movie_data_image"
                              src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
                              alt="poster"
                            />
                          </div>
                          <div
                            className="movie_data_detail"
                            onClick={this.handleRedirect}
                          >
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
              <p>Loading...</p>
            </div>
          )}
        </div>
        <div>
          <Modal
            title="Movie Details"
            visible={this.state.addModal}
            onCancel={this.handleAddCancel}
            onOk={this.handleAddOk}
          >
            <div>
              <Form
                {...layout}
                name="control-hooks"
                onFinish={this.onMovieSubmit}
              >
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
}

export default Movies;
