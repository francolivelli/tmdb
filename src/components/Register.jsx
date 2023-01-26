import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInput } from "../hooks/useInput";
import { log, success, error } from "../utils/logs";

const Register = () => {
  const navigate = useNavigate();
  const email = useInput("email");
  const password = useInput("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    log("register attempt...");
    try {
      await axios.post("/api/users/register", {
        email: email.value,
        password: password.value,
      });
      success(`new user registered`);
      navigate("/login");
    } catch ({ response }) {
      error(response.status, response.statusText);
    }
  };

  return (
    <section>
      <h1>Sign Up</h1>
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
              placeholder="Create your password"
              type="password"
              id="password"
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link">Sign Up</button>
          </div>
        </div>
      </form>
      <br />
    </section>
  );
};

export default Register;
