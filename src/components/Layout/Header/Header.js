import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const sideBarStyle = {
    width: menuCollapse ? "40%" : "-0%",
    transition: "width 0.4s ease-in-out",
    backgroundColor: "#3c6982",
    position: "fixed",
    color: "white",
    top: "56px",
    margin: "10px",
    borderRadius: "10px",
    zIndex: menuCollapse ? "1" : "0",
  };

  const { user, isAuthenticated, loginWithRedirect, loginWithPopup, logout } =
    useAuth0();

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated ?
      navigate('/startloan') :
      navigate('/');
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("--isauthenticated---", isAuthenticated);
  });

  return (
    <div>
      <div style={sideBarStyle} className="sidebar">
        <Sidebar />
      </div>
      <div className="container">
        <div className="headerBar" id="header">
          <div className="menu_items">
            <div>Rocko</div>
            <div>About Us</div>
            <div>FAQ</div>
          </div>
          <div className="signIn">
            {isAuthenticated ? (
              <button
                className="signInButton"
                onClick={() => logoutWithRedirect()}>
                {user.email} | Disconnect
              </button>
            ) : (
              <button className="signInButton" onClick={() => loginWithPopup()}>
                Sign in | Get started
              </button>
            )}
          </div>
          <div className="sidebarOpenBtn" onClick={menuIconClick}>
            <img
              src="./assets/icons/menu.png"
              alt="menu"
              className="menuIconImg"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
