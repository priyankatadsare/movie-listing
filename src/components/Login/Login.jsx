import React, { Component } from "react";
import "./Login.css";

class LoginForm extends Component {
  state = {
    msg: "",
    checked: true,
    userName: "",
    password: "",
    loginSuccess: false,
    buttonClicked: false,
    adminUser: false,
    user: [],
  };

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  };

  handleUsernameChange = (e) => {
    console.log("userName-->", e.target.value);
    this.setState({ userName: e.target.value });
    localStorage.setItem("user", e.target.value);
  };

  handlePassswordChange = (e) => {
    console.log("password-->", e.target.value);
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    this.setState({ buttonClicked: true });
    if (this.state.userName === "" || this.state.password === "") {
      this.setState({ msg: "The Username or Password can not be blank" });
    } else if (
      this.state.userName === "admin" &&
      this.state.password === "admin"
    ) {
      this.setState({ loginSuccess: true });
    } else if (
      this.state.userName === "user" &&
      this.state.password === "user"
    ) {
      this.setState({ loginSuccess: true });
    } else {
      this.setState({
        loginSuccess: false,
        msg: "Either Username or Password is incorrect",
      });
    }
  };

  render() {
    return (
      <div>
        <div className="text-center mb-50">
          <a className="navbar-brand mr-0" href="dashboard1.html"></a>
        </div>

        <div className="row w-100">
          <div className="col-xxl-5 col-xl-4 col-lg-6 col-md-7 col-sm-9 mx-auto">
            <div className="card card-border">
              <div className="card-body">
                <form>
                  <h4 className="mb-20 text-center">Sign in to your account</h4>
                  <div className="form-group">
                    <div className="form-label-group">
                      <label htmlFor="userName">User Name</label>
                    </div>
                    <input
                      className="form-control"
                      id="firstName"
                      placeholder="Enter username or email ID"
                      name="text"
                      type="text"
                      onChange={this.handleUsernameChange}
                    />
                  </div>
                  <div className="form-group">
                    <div className="form-label-group">
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-group input-group-type-2 password-check">
                      <input
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        type="password"
                        onChange={this.handlePassswordChange}
                      />
                      <div className="input-group-append">
                        <a href="#" className="input-group-text">
                          <span className="feather-icon">
                            <i data-feather="eye"></i>
                          </span>
                          <span className="feather-icon d-none">
                            <i data-feather="eye-off"></i>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <center>
                    <a href="#" type="submit" onClick={this.handleLogin}>
                      Log In
                    </a>
                  </center>
                  {this.state.loginSuccess &&
                    this.props.history.push("/movies")}
                  {this.state.buttonClicked && !this.state.loginSuccess && (
                    <p style={{ color: "red" }}>{this.state.msg}</p>
                  )}

                  <p className="p-xs mt-10 text-center">
                    New to Movie App ?{" "}
                    <a href="https://www.google.com" className="link-theme">
                      <u>Create new accunt</u>
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
