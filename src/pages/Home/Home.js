import HowItWorks from "./HowItWorks/HowItWorks";
import WhyUseRocko from "./WhyUseRocko/WhyUseRocko";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="home_container">
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
              Receive funds directly to your preferred exchange or wallet within
              minutes
            </div>
          </div>
          <div className="item">
            <div>
              <img src="./assets/icons/dollar.png" className="item_img" />
            </div>
            <div className="item_content">
              Repay your loan at anytime and receive your collateral back
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
        </div>
        <HowItWorks />
      </div>
      <WhyUseRocko />
    </>
  );
}

export default Home;
