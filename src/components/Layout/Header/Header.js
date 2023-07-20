import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";
import { getConfig } from "../../../config";
import { Auth0WalletConnector } from '@zerodevapp/wagmi';
import { configureChains, useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from 'wagmi/chains'

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const config = getConfig();
  const { chains } = configureChains( [goerli], [publicProvider()] );
  const auth0Connector = new Auth0WalletConnector({chains, options: {
    // projectId: config.projectId,
    projectId: 'b5486fa4-e3d9-450b-8428-646e757c10f6',
  }})
  console.log(auth0Connector)


  const [loading, setLoading] = useState(false)
  const { connect, error, isLoading, pendingConnector } = useConnect()
  const { address, connector, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  const connectWallet = async () => {
    setLoading(true)
    await connect({
        connector: auth0Connector
    })
    setLoading(false)
  }

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
            {isConnected ? 
              <button className="signInButton" onClick={disconnect}>Disconnect</button>  
              :            
              <button className="signInButton" disabled={isLoading || loading} onClick={connectWallet}>
                Sign in | Get started
              </button>}
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
