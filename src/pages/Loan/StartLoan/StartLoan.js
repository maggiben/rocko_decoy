import "./StartLoan.css";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";

import "swiper/swiper-bundle.min.css";

import ProgressBar from "../../../components/ProgressBar/ProgressBar";
SwiperCore.use([Navigation]);
function StartLoan() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperObj = useRef(null);

  const [borrowing, setBorrowing] = useState();
  const [borrowMethod, setBorrowMethod] = useState(1);
  const [collateralMethod, setCollateralMethod] = useState(1);
  const next = () => {
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
                    className="input_number"
                    name="borrowing"
                    value={borrowing}
                    onChange={(e) => {
                      e.preventDefault();
                      setBorrowing(e.target.value);
                    }}
                  />
                </div>
                <div className="borrow_type">
                  <div className="label">What do you want to borrow?</div>
                  <div className="select_currency">
                    <div className="currency_item">
                      <img
                        src="./assets/images/usdc.png"
                        alt="usdc"
                        className={
                          borrowMethod == 1
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
                          borrowMethod == 2
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
                        src="./assets/images/usdc.png"
                        alt="usdc"
                        className={
                          collateralMethod == 1
                            ? "currencyTypeImgSelected"
                            : "currencyTypeImg"
                        }
                        onClick={() => setCollateralMethod(1)}
                      />
                      <p>USDC</p>
                    </div>
                    <div className="currency_item">
                      <img
                        src="./assets/images/usd.png"
                        alt="usdc"
                        className={
                          collateralMethod == 2
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
                          collateralMethod == 3
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
                          collateralMethod == 4
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
                          style={{ marginTop: "3px" }}
                        />
                      </div>
                      <div className="detail">...</div>
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
                          style={{ marginTop: "3px" }}
                        />
                      </div>
                      <div className="detail">...</div>
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
                          style={{ marginTop: "3px" }}
                        />
                      </div>
                      <div className="detail">...</div>
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
                  <div className="select_currency">
                    <ProgressBar bgcolor={"#05B516"} completed={60} />
                  </div>
                </div>

                <div className="description">
                  Your loan requires your collateral to maintain a certain USD
                  value, otherwise your collateral may be liquidated (i.e. sold)
                  by the lender. By posting more collateral than required, you
                  can reduce the projected liquidation price and the likelihood
                  of this occurring.
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

            {activeIndex == 2 ? (
              <Link to="/reviewloan">
                <button className="btn" style={{ width: "198px" }}>
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
                {borrowing ? borrowing : "..."}
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
                3.84%
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
                      width: "160px",
                    }}>
                    <span>6 months:</span> $189.30
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "160px",
                    }}>
                    <span>12 months:</span> $384.60
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "160px",
                    }}>
                    <span>24 months:</span> $769.20
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
              <div className="detail">...</div>
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
              <div className="detail">...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartLoan;
