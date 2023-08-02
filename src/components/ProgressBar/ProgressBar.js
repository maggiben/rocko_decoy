import React, { useState } from "react";
import "./ProgressBar.css";
// import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const ProgressBar = ({setBufferCollateral, bufferCollateral}) => {
  return (
    <>
      <div>
        <RangeSlider
          style={{
            width: "441px",
            height: "15px"
          }}
          value={bufferCollateral}
          onChange={e => {setBufferCollateral(e.target.value)}}
          min={0}
          max={500}
          step={100}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Higher risk</span>
          <span>{bufferCollateral}%</span>
          <span>Lower risk</span>
        </div>
      </div>
    </>
    // <div style={{ width: "85%" }}>
    //   <input
    //     type="range"
    //     value={minValue}
    //     min={0}
    //     max={1000}
    //     step={step}
    //     onChange={handleMinChange}
    //     style={{
    //       width: "100%",
    //       height: "25px",
    //       borderRadius: "10px",
    //       // background: "#05B516",
    //       outline: "none",
    //       opacity: "0.7",
    //       transition: ".2s",
    //       hover: {
    //         opacity: "1",
    //       },
    //     }}
    //   />
    // </div>
  );
};

export default ProgressBar;
