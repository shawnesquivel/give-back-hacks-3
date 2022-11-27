import React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import happyFaces from "../assets/happyfaces.png";

import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = "/api/login";

const Login = () => {
  const { auth, setAuth } = useAuth(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // see if it we came from a previous path

  // Login State
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  // Successful submission: Show the Success JSX  (only use this for prototyping)
  // Now replaced with the Navigate feature
  // const [success, setSuccess] = useState(false);
  // Error Message
  const [errMsg, setErrMsg] = useState("");
  // Set User Focus on page load

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = JSON.stringify({ user, pwd });

      const response = await axios.post(LOGIN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const accessToken = response?.data?.token;

      console.log(response);
      // Reponse from server
      if (response.status === 200) {
        // Login success
        if (response.data.status === "OK") {
          // clear previous local storage
          localStorage.clear();

          console.log("Response Data", user, pwd, accessToken);
          setAuth({ user, pwd, accessToken });
          console.log("AUTH:", auth);

          // store the login token
          console.log(
            "Successful login: received token and set to local storage:",
            response.data
          );
          localStorage.setItem("token", JSON.stringify(response.data));

          if (location?.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/dashboard");
          }
        } else {
          setErrMsg("Incorrect username or password. Please try again.");
        }
      }

      setUser("");
      setPwd("");

      // Axios Post Fails
    } catch (err) {
      if (err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Username is taken");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };
  return (
    <>
      <div class="create-profile-row">
        <div class="create-profile-col__left">
          <div class="page-label">
            <h6>Sign In</h6>
            <h1>Welcome Back!</h1>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="label-col-container">
              <label htmlFor="username" className="create-profile__label">
                Username (user@gmail.com)
              </label>
              <input
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                type="text"
                id="username"
                autoComplete="off"
                value={user}
                required
                placeholder="example@email.com"
                className="create-profile__input"
              />
            </div>
            <div className="label-col-container">
              <label htmlFor="pwd" className="create-profile__label mb-1">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                value={pwd}
                id="pwd"
                required
                placeholder="password"
                className="create-profile__input"
              />
              <p id="uidnote" className="login-form__instructions">
                Forgot Password?
              </p>
            </div>

            <div className="flex-col-center">
              {errMsg ? (
                <p aria-live="assertive" className="login__error">
                  {errMsg}
                </p>
              ) : (
                ""
              )}

              <button
                disabled={user && pwd ? false : true}
                onSubmit={handleSubmit}
                className="btn-cta"
              >
                Sign In
              </button>
              <p className="register__text register__text--subtle">
                New here?{" "}
                <Link
                  to="/register"
                  className="register__text register__text--subtle text--underline"
                >
                  Sign Up instead
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div class="create-profile-col__right">
          <img
            class="image"
            src={happyFaces}
            alt="pastel circles on green background and a happy face"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
