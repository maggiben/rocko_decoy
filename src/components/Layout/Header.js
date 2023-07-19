import React, { useState } from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="container">
      <div className="headerBar">
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
      </div>
    </div>
  );
};

export default Header;
