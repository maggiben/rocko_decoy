import React from "react";
import { financial } from "../../helper";

const GradientProgressBar = ({
  liquidationPrice,
  currentPrice,
  percentage1 = 0,
  percentage2 = 90,
}) => {
  const style = {
    width: "0",
    height: "0",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "10px solid black",
  };
  return (
    <div
      className="progress-bar"
      style={{
        borderRadius: "5px",
        width: "100%",
        height: "10px",
        position: "relative",
      }}>
      <div
        style={{
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(to right, #b52b2c,#c3692f,#dcd856,#6fc536)",
          borderRadius: "5px",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: `${percentage1}%`,
          top: "-25px",
          color: "#000",
        }}>
        <div style={{ position: "absolute", left: "-18px", paddingTop: "3px" }}>
          ${financial(liquidationPrice, 2)}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: `${percentage2}%`,
          top: "-25px",
          color: "#000",
        }}>
        <div
          style={{
            position: "absolute",
            left: "-18px",
            paddingTop: "3px",
            textAlign: "center",
          }}>
          ${financial(currentPrice, 2)}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: `${percentage1}%`,
          top: "20px",
          color: "#000",
        }}>
        <div style={style}></div>
        <div style={{ position: "absolute", left: "-18px", paddingTop: "3px" }}>
          Liquidation price
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: `${percentage2}%`,
          top: "20px",
          color: "#000",
        }}>
        <div style={style}></div>
        <div
          style={{
            position: "absolute",
            left: "-18px",
            paddingTop: "3px",
            textAlign: "center",
          }}>
          Current price
        </div>
      </div>
    </div>
  );
};

export default GradientProgressBar;
