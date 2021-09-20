import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";
import "./Genres.css";
import NavbarMenu from "../../components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form, Input, message } from "antd";
import { Genres } from "../../constants/ListOptions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Genre extends Component {
  state = {
    selectedValue: [],
    setSelectedValue: [],
    isLoading: false,
    genreModal: false,
    genreData: {},
    userType: "",
  };

  componentDidMount() {
    let userId = localStorage.getItem("user");
    console.log("User Type", userId);
    this.setState({ userType: userId });
  }

  showGenreModal = () => {
    this.setState({ genreModal: true });
  };

  handleGenreCancel = () => {
    this.setState({ genreModal: false });
  };

  handleGenresOk = () => {
    this.setState({ genreModal: false });
  };

  onGenreSubmit = (values) => {
    console.log("Success");
    console.log("Values", values);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        genre: values.genre,
      }),
    };
    fetch("https://reqres.in/api/genre", requestOptions)
      .then((response) => response.json())
      .then((apiData) => this.setState({ genreData: apiData }));
    message.success("Genre Added Successfully");
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Fragment>
        <NavbarMenu />
        <div>
          {!isLoading ? (
            <div className="movies_box_wrapper">
              <h2>Genres</h2>
              <div className="line"></div>
              {this.state.userType == "admin" && (
                <div className="row">
                  <button className="add_button" onClick={this.showGenreModal}>
                    Add Genres
                  </button>
                </div>
              )}
              <div>
                <div className="movie_data_container">
                  {Genres &&
                    Genres.map((data, i) => (
                      <center>
                        <Card className="movie_data_wrapper" key={i}>
                          <div className="movie_data_detail">
                            {data.label}
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
        <div></div>
        <div>
          <Modal
            title="Genre Details"
            visible={this.state.genreModal}
            onCancel={this.handleGenreCancel}
            onOk={this.handleGenresOk}
          >
            <div>
              <Form
                {...layout}
                name="control-hooks"
                onFinish={this.onGenreSubmit}
              >
                <Form.Item
                  name="genre"
                  label="Genre Name"
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
      </Fragment>
    );
  }
}

export default Genre;
