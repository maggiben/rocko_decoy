import "./StartLoan.css";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { financial } from "../../../helper";
import { useAccount } from "wagmi";
import { useLoan } from "../../../contract/single";
import { IS_DEMO_MODE } from "../../../constants/env";

import "swiper/swiper-bundle.min.css";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
SwiperCore.use([Navigation]);

function StartLoan() {
  const inputReference = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperObj = useRef(null);

  const { isConnected, isConnecting, isDisconnected } = useAccount();

  const navigate = useNavigate();
  useEffect(() => {
    if (!IS_DEMO_MODE && !isConnecting && !isConnected)
      navigate('/')
  }, [isConnecting, isConnected])

  const [borrowing, setBorrowing] = useState(0);
  const [APR, setAPR] = useState(0);
  const [LTV, setLTV] = useState(0);
  const [thresold, setThresold] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [price, setPrice] = useState(0);
  const [bufferCollateral, setBufferCollateral] = useState(100);
  
  const loanAmount = borrowing;
  const collateralNeededInUSD = loanAmount / LTV * (1 + bufferCollateral / 100);
  const collateralNeeded = collateralNeededInUSD / price;
  const liquidationPrice = loanAmount / thresold / collateralNeeded;

  const {
    getETHPrice,
    getBorrowAPR,
    getLTV,
    getPenalty,
    getThreshold
  } = useLoan()

  useEffect(() => {
    getETHPrice()
    .then(value => setPrice(value))
    .catch(e => console.log(e))

    getBorrowAPR()
    .then(value => setAPR(value))
    .catch(e => console.log(e))

    getLTV()
    .then(value => setLTV(value))
    .catch(e => console.log(e))

    getPenalty()
    .then(value => setPenalty(value))
    .catch(e => console.log(e))

    getThreshold()
    .then(value => setThresold(value))
    .catch(e => console.log(e))
  })

  const [borrowMethod, setBorrowMethod] = useState(1);
  const [collateralMethod, setCollateralMethod] = useState(1);
  
  const next = () => {
    if (activeIndex == 0 && borrowing < 1000) {
      inputReference.current.focus();
      return
    }

    if (swiperObj && swiperObj.current) {
      swiperObj.current.slideNext();
    }
  };
  const prev = () => {
    if (swiperObj && swiperObj.current) {
      swiperObj.current.slidePrev();
    }
  };

  return (
    <>
      <div className="startLoan_container">
        <Link to="/">
          <div className="go_back">
            <img
              src="./assets/icons/leftarrow.png"
              alt="leftarrow"
              className="goback_icon"
            />
            <span>Go back to home page</span>
          </div>
        </Link>

        <div className="customize_container">
          <div className="title">Customize your loan</div>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
              swiperObj.current = swiper;
            }}
            onSlideChange={(swiper) => {
              console.log(swiper.activeIndex);
              setActiveIndex(swiper.activeIndex);
            }}>
            <SwiperSlide>
              {" "}
              <div className="input_form">
                <div className="borrow_number">
                  <div className="label">How much do you want to borrow?</div>
                  <input
                    ref={inputReference} 
                    className="input_number"
                    name="borrowing"
                    value={borrowing}
                    onChange={(e) => {
                      e.preventDefault();
                      setBorrowing(e.target.value);
                    }}
                  />
                  {borrowing < 1000 && (
                    <div style={{ fontSize: "12px", marginLeft: "12px", color: "red" }}>Min Borrow Value: 1000 USDC</div>
                  )}
                </div>
                <div className="borrow_type">
                  <div className="label">What do you want to borrow?</div>
                  <div className="select_currency">
                    <div className="currency_item">
                      <img
                        src="./assets/images/usdc.png"
                        alt="usdc"
                        className={
                          borrowMethod === 1
                            ? "currencyTypeImgSelected"
                            : "currencyTypeImg"
                        }
                        onClick={() => setBorrowMethod(1)}
                      />{" "}
                      <p>USDC</p>
                    </div>
                    <div>
                      <img
                        src="./assets/images/usd.png"
                        className={
                          borrowMethod === 2
                            ? "currencyTypeImgSelected"
                            : "currencyTypeImg"
                        }
                        onClick={() => setBorrowMethod(2)}
                        alt="usd"
                      />{" "}
                      <p style={{ opacity: "0.5" }}>USD (coming soon!)</p>
                    </div>
                  </div>
                </div>
                <div className="description">
                  Only USDC (a USD-backed stablecoin) is available at this time.
                  However, you can convert USDC into USD on most crypto
                  exchanges. Learn more.
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              {" "}
              <div className="input_form">
                <div className="borrow_type">
                  <div className="label2">
                    Choose which asset you will post as collateral
                  </div>
                  <div className="select_currency">
                    <div className="currency_item">
                      <img
                        src="./assets/images/eth.png"
                        alt="usdc"
                        className={
                          collateralMethod === 1
                            ? "currencyTypeImgSelected"
                            : "currencyTypeImg"
                        }
                        onClick={() => setCollateralMethod(1)}
                      />
                      <p>ETH</p>
                    </div>
                    <div className="currency_item">
                      <img
                        src="./assets/images/usd.png"
                        alt="usdc"
                        className={
                          collateralMethod === 2
                            ? "currencyTypeImgSelected"
                            : "currencyTypeImg"
                        }
                        onClick={() => setCollateralMethod(2)}
                      />
                      <p>Comp</p>
                    </div>
                    <div className="currency_item">
                      <img
                        src="./assets/images/WBTC.png"
                        alt="usdc"
                        className={
                          collateralMethod === 3
                            ? "currencyTypeImgSelected"
                            : "currencyTypeImg"
                        }
                        onClick={() => setCollateralMethod(3)}
                      />
                      <p>WBTC</p>
                    </div>
                    <div className="currency_item">
                      <img
                        src="./assets/images/Uniswap.png"
                        alt="usdc"
                        className={
                          collateralMethod === 4
                            ? "currencyTypeImgSelected"
                            : "currencyTypeImg"
                        }
                        onClick={() => setCollateralMethod(4)}
                      />
                      <p>Uniswap</p>
                    </div>
                  </div>
                </div>
                <div className="borrow_type">
                  <div className="label">Asset Parameters</div>
                  <div className="detail_container select_currency">
                    <div className="text_center">
                      <div
                        className=""
                        style={{
                          paddingBlock: "5px !important",
                          display: "flex",
                        }}>
                        <div>Loan-to-value</div>
                        <img
                          src="./assets/icons/exclamation.png"
                          className="exclamation"
                          alt="exclamation"
                          style={{ marginTop: "3px", marginLeft: "2px" }}
                        />
                      </div>
                      <div className="detail">{LTV * 100}%</div>
                    </div>
                    <div className="text_center">
                      <div
                        className=""
                        style={{
                          paddingBlock: "5px !important",
                          display: "flex",
                        }}>
                        <div>Liquidation threshold</div>
                        <img
                          src="./assets/icons/exclamation.png"
                          className="exclamation"
                          alt="exclamation"
                          style={{ marginTop: "3px", marginLeft: "2px" }}
                        />
                      </div>
                      <div className="detail">{thresold * 100}%</div>
                    </div>
                    <div className="text_center">
                      <div
                        className=""
                        style={{
                          paddingBlock: "5px !important",
                          display: "flex",
                        }}>
                        <div>Liquidation penalty</div>
                        <img
                          src="./assets/icons/exclamation.png"
                          className="exclamation"
                          alt="exclamation"
                          style={{ marginTop: "3px", marginLeft: "2px" }}
                        />
                      </div>
                      <div className="detail">{financial(penalty * 100, 1)}%</div>
                    </div>
                  </div>
                </div>
                <div className="description">
                  Lending protocols determine which assets are able to be used
                  as collateral as well as the asset parameters. Learn
                  more.Lending protocols determine which assets are able to be
                  used as collateral as well as the asset parameters.{" "}
                  <span className="text_underline">Learn more.</span>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              {" "}
              <div className="input_form">
                <div className="borrow_type">
                  <div className="label2">
                    Choose how much collateral buffer you want
                  </div>
                  <div className="select_currency progressbar">
                    <ProgressBar setBufferCollateral={setBufferCollateral} bufferCollateral={bufferCollateral}/>
                  </div>
                </div>

                <div className="description">
                  Your loan requires your collateral to maintain a certain USD
                  value, otherwise your collateral may be liquidated (i.e. sold)
                  by the lender. By posting more collateral than required, you
                  can reduce the projected liquidation price and the likelihood
                  of this occurring.{" "}
                  <span className="text_underline">Learn more.</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <p className="loan_amount">Loan amount: {activeIndex + 1}/3</p>
          <div className="back_next_container">
            <button className="btn" onClick={prev}>
              Back
            </button>

            {activeIndex === 2 ? (
              <Link 
                to='/reviewloan'
                state= {{
                  loanAmount: {loanAmount},
                  APR: {APR},
                  collateral: {collateralNeeded},
                  collateralNeededInUSD: {collateralNeededInUSD},
                  bufferCollateral: {bufferCollateral}
                }}
              >
                <button className="btn" style={{ width: "250px" }}>
                  Continue to loan review
                </button>
              </Link>
            ) : (
              <button className="btn" onClick={next}>
                Next
              </button>
            )}
          </div>
        </div>

        <div className="summaryContainer">
          <div className="label">Loan summary</div>
          <div className="detail_container">
            <div className="text_center">
              <div className="label">Borrowing:</div>
              <div className="detail label">
                {loanAmount ? loanAmount + " USDC" : "..."}
              </div>
            </div>
            <div className="text_center">
              <div className="label">
                <div>Current APR:</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                  alt="exclamation"
                />
              </div>
              <div
                className="detail label"
                style={{ fontSize: "19px !important" }}>
                {financial(APR, 2)}%
              </div>
            </div>
            <div className="text_center">
              <div className="label">
                <div>Projected interest (in USD):</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                  alt="exclamation2"
                />
              </div>
              <div className="detail">
                <div style={{ display: "block !important" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "180px",
                    }}>
                    <span>6 months:</span> 
                    <span style={{ fontWeight: "600" }}>
                      { loanAmount ? 
                        "$" + financial(loanAmount * APR / 200, 2)
                        :
                        <>...</>
                      }
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "180px",
                    }}>
                    <span>12 months:</span>
                    <span style={{ fontWeight: "600" }}>
                      { loanAmount ? 
                        "$" + financial(loanAmount * APR / 100, 2)
                        :
                        <>...</>
                      }
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "180px",
                    }}>
                    <span>24 months:</span>
                    <span style={{ fontWeight: "600" }}>
                      { loanAmount ? 
                        "$" + financial(loanAmount * APR / 50, 2)
                        :
                        <>...</>
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text_center">
              <div className="label">
                <div>Collateral needed:</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                  alt="exclamation3"
                />{" "}
              </div>
              <div className="detail">
                <div className="detailbold">{financial(collateralNeeded, 4)} Eth</div>
              </div>
              <div className="detail">(${financial(collateralNeededInUSD, 2)})</div>
            </div>
            <div className="text_center">
              <div className="label">
                <div>Liquidation price:</div>
                <img
                  src="./assets/icons/exclamation.png"
                  className="exclamation"
                  alt="exclamation4"
                />{" "}
              </div>
              <div className="detail">
                <div className="detailbold">
                  {loanAmount ? "$" + financial(liquidationPrice, 2) : "..."}
                </div>
              </div>
              <div className="detail">Current price of Eth:  
                <div className="detailbold"> ${financial(price, 3)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartLoan;
