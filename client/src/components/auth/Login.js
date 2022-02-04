import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

//Actions
import { setAlert } from "../../actions/alert";

const Login = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //API actions

  //Form Actions
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login Successfull");
  };

  //Deconstruct state
  const { email, password } = formData;
  return (
    <Fragment>
      <section>
        <h3>Login</h3>
        <p>
          Or <Link to="/register">sign in</Link> to continue
        </p>
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="email">EMAIL</label>
          <input
            name="email"
            id="email"
            type="text"
            placeholder="hello@reallygreatsite.com"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input type="submit" value="Login" />
        </form>
      </section>
    </Fragment>
  );
};

export default connect(null, { setAlert })(Login);
