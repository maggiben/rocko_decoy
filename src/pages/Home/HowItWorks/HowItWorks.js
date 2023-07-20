import "./HowItWorks.css";
function HowItWorks() {
  return (
    <>
      <div className="howItWorks_container">
        <div className="howItWorks_header">
          <div className="howItWorks_title">How it works</div>
          <div className="howItWorks_content">
             Create a custom loan through Rocko’s easy-to-use interface. Once
            finalized, simply transfer your collateral to your newly created
            Rocko wallet and you’ll automatically receive your loan to your
            preferred exchange account or wallet. You can then manage and repay
            your loan through your Rocko wallet.
          </div>
          <img src="./assets/images/howToWork.png" className="HowItWork_Img" />
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
