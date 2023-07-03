import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import React, { useEffect, useRef, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function Layout({ isLogIn, setIsLogIn }) {
  const [loginNav, setLoginNav] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoginNav(loginState());
  }, [isLogIn]);

  function loginState() {
    if (!isLogIn) {
      return (
        <Link to="/" className="nav-title">
          Login
        </Link>
      );
    } else {
      return (
        <div
          id="logoutBtn"
          className="navLink"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
            setIsLogIn(false);
          }}
        >
          <span id="logout-icon">
            <LogoutIcon />
          </span>
        </div>
      );
    }
  }

  return (
    <div>
      {isLogIn && (
        <div id="nav-container">
          <nav id="nav">
            <div id="nav-div-container">
              <Link className="nav-title" to="/create">
                CREATE
              </Link>
              <Link className="nav-title" to="/myprofile">
                MY CVs
              </Link>
            </div>
            {loginNav}
          </nav>
        </div>
      )}
      <div id="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
