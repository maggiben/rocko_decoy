import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";
const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
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
            <div>Sign in</div>
            <div>|</div>
            <div>Get start</div>
          </div>
          <div className="sidebarOpenBtn" onClick={menuIconClick}>
            <img src="./assets/icons/menu.png" className="menuIconImg" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
