import Header from "../../components/Layout/Header/Header";
import "./Home.css";
function Home() {
  return (
    <>
      <Header />
      <div className="body_container">
        <div className="crytoBacked_container">
          <div className="crytoBacked_header">
            Crypto-backed loans for as low as 3.84% APR
          </div>
          <div className="crytoBacked_body">
             Rocko helps you quickly and securely borrow from DeFi protocols
            using your crypto as collateral so you can access cash without
            having to sell your portfolio
          </div>
        </div>
        <div className="items_container">
          <div className="item">
            <div>
              <img src="./assets/icons/protocol.png" className="item_img" />{" "}
            </div>{" "}
            <div className="item_content">
              Borrow at low rates from popular DeFi protocols like Compound and
              Aave
            </div>
          </div>
          <div className="item">
            <div>
              <img src="./assets/icons/dollar.png" className="item_img" />{" "}
            </div>
            <div className="item_content">
              Borrow at low rates from popular DeFi protocols like Compound and
              Aave
            </div>
          </div>
          <div className="item">
            <div>
              <img src="./assets/icons/dollar.png" className="item_img" />
            </div>
            <div className="item_content">
              Borrow at low rates from popular DeFi protocols like Compound and
              Aave
            </div>
          </div>
        </div>
        <div>
          <button className="get_started_btn">Get Started</button>
          <div>
            or <span className="home_signIn">sign in</span>
          </div>
        </div>
        <div className="bottom_container">
          <div className="over">Over $10M in loans fulfilled and growing! </div>
          <div className="howItWorks">How it works</div>
        </div>
      </div>
    </>
  );
}

export default Home;
