import "./StartLoan.css";
function StartLoan() {
  return (
    <>
      <div className="startLoan_container">
        <div className="go_back">
          <img src="./assets/icons/leftarrow.png" className="goback_icon" />
          <span>Go back to home page</span>
        </div>
        <div className="customize_container">
          <div className="title">Customize your loan</div>
          <div className="input_form">
            <div className="borrow_number">
              <div className="label">How much do you want to borrow?</div>
              <input className="input_number" />
            </div>
            <div className="borrow_type">
              <div className="label">What do you want to borrow?</div>
              <div className="select_currency">
                <div className="currency_item">
                  <img
                    src="./assets/images/usdc.png"
                    className="currencyTypeImg"
                  />{" "}
                  <p>USDC</p>
                </div>
                <div>
                  <img
                    src="./assets/images/usd.png"
                    className="currencyTypeImg"
                  />{" "}
                  <p style={{ opacity: "0.5" }}>USD (coming soon!)</p>
                </div>
              </div>
            </div>
            <div className="description">
              Only USDC (a USD-backed stablecoin) is available at this time.
              However, you can convert USDC into USD on most crypto exchanges.
              Learn more.
            </div>
          </div>
          <p className="loan_amount">Loan amount: 1/3</p>
          <div className="back_next_container">
            <button className="btn">Back</button>
            <button className="btn">Next</button>
          </div>
        </div>
        <div className="summaryContainer">
          <div className="label">Loan summary</div>
          <div className="detail_container">
            <div className="detail_item">
              <div className="label">Borrowing:</div>
              <div className="detail">...</div>
            </div>
            <div className="detail_item">
              <div className="label">
                <div>Current APR:</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                />
              </div>
              <div className="detail">...</div>
            </div>
            <div className="detail_item">
              <div className="label">
                <div>Projected interest (in USD):</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                />
              </div>
              <div className="detail">...</div>
            </div>
            <div className="detail_item">
              <div className="label">
                <div>Collateral needed:</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                />{" "}
              </div>
              <div className="detail">...</div>
            </div>
            <div className="detail_item">
              <div className="label">
                <div>Liquidation price:</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                />{" "}
              </div>
              <div className="detail">...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartLoan;
