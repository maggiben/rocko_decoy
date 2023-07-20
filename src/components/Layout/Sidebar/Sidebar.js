import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sideBar">
      <div className="menuItem">Rocko</div>
      <div className="menuItem">About Us</div>
      <div className="menuItem">FAQ</div>
      <div className="menuItem">Sign in</div>
      <div className="menuItem">Get started</div>
    </div>
  );
}

export default Sidebar;
