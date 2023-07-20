import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";
// import { getConfig } from "../../../config";
import { Auth0WalletConnector } from '@zerodevapp/wagmi';
import { configureChains, useAccount, useConnect, useDisconnect } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from 'wagmi/chains'
import { shortenAddress } from "../../../helper";


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

  // const config = getConfig();
  const { chains } = configureChains( [goerli], [publicProvider()] );
  const auth0Connector = new Auth0WalletConnector({chains, options: {
    // projectId: config.projectId,
    projectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
  }})

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const { connect, isLoading } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const connectWallet = async () => {
    setLoading(true)
    await connect({
        connector: auth0Connector
    })
    setLoading(false)
  }

  useEffect(() => {
    isConnected ? 
      navigate('/startloan') : 
      navigate('/');
  }, [isConnected]);

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
            {isConnected ? 
              <button className="signInButton" onClick={disconnect}>
                {/* {shortenAddress(address)} | Disconnect */}
                {address} | Disconnect
              </button>
              :
              <button className="signInButton" disabled={isLoading || loading} onClick={connectWallet}>
                Sign in | Get started
              </button>
            }
          </div>
          <div className="sidebarOpenBtn" onClick={menuIconClick}>
            <img src="./assets/icons/menu.png" alt="menu" className="menuIconImg" />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
