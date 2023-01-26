import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useInput } from "../hooks/useInput";
import { log, success, error } from "../utils/logs";
import axios from "axios";

const Login = () => {
  const { isAuthenticated, toggleAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const email = useInput("email");
  const password = useInput("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    log("login attempt...");
    try {
      const user = { email: email.value, password: password.value };
      const response = await axios.post("/api/users/login", user);
      toggleAuth(response);
      success(`logged user ${user.email}`);
      navigate("/secret");
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  return (
    <section>
      <h1>Sign In</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username" className="label">
            E-mail:
          </label>
          <div className="control">
            <input
              {...email}
              placeholder="Type your e-mail here"
              type="text"
              id="e-mail"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <div className="control">
            <input
              {...password}
              placeholder="Type your password here"
              type="password"
              id="password"
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link">Sign In</button>
          </div>
        </div>
      </form>
      <br />
      <p>
        Need an Account?
        <br />
        <span className="line">
          <a href="register">Sing Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
