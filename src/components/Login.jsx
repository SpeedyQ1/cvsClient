import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {

  const navigate = useNavigate();

  
  const handleSubmit = async (e) =>{
    e.preventDefault()
  

    try {
       const token = await axios.post(
        "http://localhost:3005/users",
        {email: email, password: password}
      );
      localStorage.setItem('token', JSON.stringify(token.data));
      navigate("/myprofile")
      window.location.reload()

    } catch (err) {
      if(err.response || err.response.status == 401){
        alert("incorrect usernamr or password")
      }
      console.log(err);
    }
  

    setEmail("")
    setPassword("")
  }


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  return (
    <div id="login-container">
      <div>
        <form id="login-form" onSubmit={handleSubmit}>
          <h2 id="login-title">Login</h2>
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
            Login
          </button>
        </form>
        <p id="registration-link">
          Don't have an account?{" "}
          <Link  to="/register">
            <u>Register Here</u>
          </Link>
        </p>
      </div>
    </div>
  );
  
  
}

export default Login

