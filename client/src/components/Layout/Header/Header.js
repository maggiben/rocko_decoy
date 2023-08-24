import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { configureChains, useAccount, useConnect, useDisconnect } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { goerli } from 'wagmi/chains';
import { Auth0WalletConnector } from '@zerodevapp/wagmi';
import { useUserInfo } from "../../../hooks/useZerodev";

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

  const { chains } = configureChains( [goerli], [publicProvider()] );
  const auth0Connector = new Auth0WalletConnector({chains, options: {
    projectId: process.env.REACT_APP_ZERODEV_PROJECT_DEFAULT_ID,
  }});
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    console.log(userInfo)
  })

  const OnLogin = async () => {
    await connect({
      connector: auth0Connector
    });
  };

  const OnLogout = async () => {
    await disconnect();
  };

  // TODO Alberto, please adjust this with a permanent fix so routing will work
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated)
  //     navigate('/')
  // }, [isLoading, isAuthenticated])

  return (
    <div>
      <div style={sideBarStyle} className="sidebar">
        <Sidebar />
      </div>
      <div className="container">
        <div className="headerBar" id="header">
          <div className="menu_items">
            {!isConnected && (
              <>
                <div>Rocko</div>
                <div>About Us</div>
                <div>FAQ</div>
              </>
            )}
            {isConnected && (
              <>
                <Link className="link" to='/dashboard'>Dashboard</Link>
                <Link className="link" to='/startloan'>Request loan</Link>
                <div>FAQ</div>
              </>
            )}
          </div>
          <div className="signIn">
            {isConnected ? (
              <button
                className="signInButton"
                onClick={() => OnLogout()}>
                {userInfo ? address : ""} | Disconnect
              </button>
            ) : (
              <button className="signInButton" onClick={() => OnLogin()}>
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
