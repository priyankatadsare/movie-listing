import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const history = useHistory();

  const [msg, setMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleUsernameChange = (e) => {
    console.log("userName-->", e.target.value);
    setUserName(e.target.value);
    localStorage.setItem("user", e.target.value);
  };

  const handlePassswordChange = (e) => {
    console.log("password-->", e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    setButtonClicked(true);
    if (userName === "" || password === "") {
      setMsg("The Username or Password can not be blank");
    } else if (userName === "admin" && password === "admin") {
      setLoginSuccess(true);
    } else if (userName === "user" && password === "user") {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
      setMsg("Either Username or Password is incorrect");
    }
  };

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
                    onChange={handleUsernameChange}
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
                      onChange={handlePassswordChange}
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
                  <a href="#" type="submit" onClick={handleLogin}>
                    Log In
                  </a>
                </center>
                {loginSuccess && history.push("/movies")}
                {buttonClicked && !loginSuccess && (
                  <p style={{ color: "red" }}>{msg}</p>
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
export default Login;
