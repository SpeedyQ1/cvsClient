import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const newUser = await axios.post(
        "https://speedyqcvs.onrender.com/users/register",
        { email: email, password: password }
        );
        navigate("/");

    } catch (err) {
      console.log("Error:", err);
    }

    setEmail("");
    setPassword("");
  };
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="signup-container">
      <div>
        <form id="signup-form" onSubmit={handleSubmit}>
          <h2 id="signup-title">Sign Up</h2>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit-button" type="submit">
            Sign Up
          </button>
        </form>
        <p id="login-link">
          Already have an account?{" "}
          <Link  to="/">
            <u>Login Here</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
