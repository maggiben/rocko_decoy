"use client";
import CoinCard from "../coinCard/coinCard";
import { useState } from "react";
import useLoanData from "@/hooks/useLoanData";

const ChooseCoins = ({ assets }: any) => {
  const { loanData, setLoanData, loanSteps, currentStep, setCurrentStep } =
    useLoanData();

  // console.log(loanData)
  const [selectedCoin, setSelectedCoin] = useState("");
  const handleSelect = (info: any) => {
    console.log(info, "choose coin");
    setSelectedCoin(info.coinShortName);
    if (setLoanData) {
      setLoanData((prevLoanData) => {
        return {
          ...prevLoanData,
          cryptoName: info.coinShortName,
          cryptoIcon:info.coinIcon,
          loanToValue: parseFloat(info.loanToValue),
          liquidationThreshold: parseFloat(info.liquidationThreshold),
          liquidationPenalty: parseFloat(info.liquidationPenalty),
          collateralPrice: info.collateralPrice,
          subCollateralPrice: info.subCollateralPrice,
          liquidationPrice: info.liquidationPrice,
          subLiquidationPrice: info.subLiquidationPrice,
        };
      });
    }
  };
  return (
    <div className="my-4 py-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {assets.map((coin: any) => {
        return (
          <CoinCard
            key={coin.id}
            coinIcon={coin.symbol}
            coinShortName={coin.name}
            coinName={coin.fullName}
            selectedCoin={selectedCoin}
            handleSelect={handleSelect}
            loanToValue={coin.loanToValue}
            liquidationThreshold={coin.liquidationThreshold}
            liquidationPenalty={coin.liquidationPenalty}
            collateralPrice={coin.collateralPrice}
            subCollateralPrice={coin.subCollateralPrice}
            liquidationPrice={coin.liquidationPrice}
            subLiquidationPrice={coin.subLiquidationPrice}
          />
        );
      })}
    </div>
  );
};

export default ChooseCoins;
