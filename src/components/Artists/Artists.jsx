import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";
import "./Artists.css";
import NavbarMenu from "../../components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form, Input, message } from "antd";
import { Artists } from "../../constants/ListOptions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Artist extends Component {
  state = {
    selectedValue: [],
    setSelectedValue: [],
    isLoading: false,
    artistModal: false,
    artistData: {},
    userType: "",
  };

  componentDidMount() {
    let userId = localStorage.getItem("user");
    console.log("User Type", userId);
    this.setState({ userType: userId });
  }

  showArtistModal = () => {
    this.setState({ artistModal: true });
  };

  handleArtistCancel = () => {
    this.setState({ artistModal: false });
  };

  handleArtistOk = () => {
    this.setState({ artistModal: false });
  };

  onArtistSubmit = (values) => {
    console.log("Success");
    console.log("Values", values);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        artist: values.artist,
      }),
    };
    fetch("https://reqres.in/api/artists", requestOptions)
      .then((response) => response.json())
      .then((apiData) => this.setState({ artistData: apiData }));
    message.success("Artist Added Successfully");
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Fragment>
        <NavbarMenu />
        <div>
          {!isLoading ? (
            <div className="movies_box_wrapper">
              <h2>Artists</h2>
              <div className="line"></div>
              {this.state.userType == "admin" && (
                <div className="row">
                  <button className="add_button" onClick={this.showArtistModal}>
                    Add Artist
                  </button>
                </div>
              )}
              <div>
                <div className="movie_data_container">
                  {Artists &&
                    Artists.map((data, i) => (
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
            title="Artist Details"
            visible={this.state.artistModal}
            onCancel={this.handleArtistCancel}
            onOk={this.handleArtistOk}
          >
            <div>
              <Form
                {...layout}
                name="control-hooks"
                onFinish={this.onArtistSubmit}
              >
                <Form.Item
                  name="artist"
                  label="Artist Name"
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

export default Artist;
