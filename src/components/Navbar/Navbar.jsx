import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";

class NavbarMenu extends Component {
  state = {
    userType: "",
  };

  componentDidMount() {
    let userId = localStorage.getItem("user");
    console.log("User Type", userId);
    this.setState({ userType: userId });
  }

  render() {
    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#">Movie App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav>
            <Nav.Link href="/movies">Movies</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/artists">Artists</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/genres">Genres</Nav.Link>
          </Nav>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>

            <Nav>
              <Nav.Link href="#">{this.state.userType}</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarMenu;
