import react from "react";
import "./WhyUseRocko.css";
function WhyUseRocko() {
  return (
    <>
      <div className="whyUseRocko_container">
        <div className="whyUseRocko_header">
          <div className="whyUseRocko_title">Why use Rocko?</div>
          <div className="leftItem">
            <div className="item_title">Access low-rate loans</div>
            <div className="item-content">
              Borrow cash to pay down higher rate debt, invest in other assets,
              and much more with low rate loans offered by lending protocols
            </div>
          </div>
          <div className="rightItemContainer">
            <div className="rightItem">
              <div className="item_title">Simple-to-use interface</div>
              <div className="item-content">
                Access flexible loans from DeFi lending protocols without
                needing any prior experience or technical expertise
              </div>
            </div>
          </div>
          <div className="leftItem">
            <div className="item_title">Access low-rate loans</div>
            <div className="item-content">
              Borrow cash to pay down higher rate debt, invest in other assets,
              and much more with low rate loans offered by lending protocols
            </div>
          </div>
          <div className="rightItemContainer">
            <div className="rightItem">
              <div className="item_title">
                Protect your collateral from liquidation
              </div>
              <div className="item-content">
                We provide recommended buffer amounts and offer notifications to
                protect your collateral
              </div>
            </div>
          </div>
          <div className="leftItem">
            <div className="item_title">Stay in control of your funds</div>
            <div className="item-content">
              Your Rocko smart wallet is self-custodial, meaning you and you
              only control it and any funds inside
            </div>
          </div>
          <div className="rightItemContainer">
            <div className="rightItem">
              <div className="item_title">
                Network transaction fees are covered
              </div>
              <div className="item-content">
                Avoid the headache from paying network transaction fees (i.e.
                gas fees) as we’ll cover any incurred through your Rocko smart
                wallet*
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyUseRocko;
