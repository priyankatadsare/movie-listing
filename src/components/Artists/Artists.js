import React, { useEffect, useState, Fragment } from "react";
import { Card } from "react-bootstrap";
import "./Artists.css";
import NavbarMenu from "../../components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form, Input, message } from "antd";
import { Artists } from "../../constants/ListOptions";

function Artist(props) {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [artistModal, setArtistModal] = useState(false);
  const [artistData, setArtistData] = useState({});
  const [userType, setUserType] = useState("");

  useEffect(() => {
    let userId = localStorage.getItem("user");
    console.log("User Type", userId);
    setUserType(userId);
  }, []);

  const showArtistModal = () => {
    setArtistModal(true);
  };

  const handleArtistCancel = () => {
    setArtistModal(false);
  };

  const handleArtistOk = () => {
    setArtistModal(false);
  };

  const onArtistSubmit = (values) => {
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
      .then((apiData) => setArtistData(apiData));
    message.success("Artist Added Successfully");
  };

  return (
    <Fragment>
      <NavbarMenu />
      <div>
        {!isLoading ? (
          <div className="movies_box_wrapper">
            <h2>Artists</h2>
            <div className="line"></div>
            {userType === "admin" && (
              <div className="row">
                <button className="add_button" onClick={showArtistModal}>
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
          visible={artistModal}
          onCancel={handleArtistCancel}
          onOk={handleArtistOk}
        >
          <div>
            <Form {...layout} name="control-hooks" onFinish={onArtistSubmit}>
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

export default Artist;
