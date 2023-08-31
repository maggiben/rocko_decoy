import { useState } from "react";
import CoinCard from "../CoinCard/CoinCard";
import useLoanData from "../../hooks/useLoanData";
import { useLoan } from "../../contract/single";
import { IS_DEMO_MODE } from "../../constants/env";

const ChooseCoins = ({ assets }) => {
  const { loanData, setLoanData, loanSteps, currentStep, setCurrentStep } =
    useLoanData();
  const {
      getETHPrice,
      getLTV,
      getPenalty,
      getThreshold,
      getRewardRate
  } = useLoan();

  // console.log(loanData)
  const [selectedCoin, setSelectedCoin] = useState("");

  const updateLoanData = async (info) => {
    if (IS_DEMO_MODE) { 
      if (setLoanData) {
        const ethPrice = await getETHPrice();
        setLoanData((prevLoanData) => {
          return {
            ...prevLoanData,
            cryptoName: info.coinShortName,
            cryptoIcon:info.coinIcon,
            loanToValue: parseFloat(info.loanToValue),
            liquidationThreshold: parseFloat(info.liquidationThreshold),
            liquidationPenalty: parseFloat(info.liquidationPenalty),
            collateralPrice: ethPrice,
            subCollateralPrice: info.subCollateralPrice,
            // liquidationPrice: info.liquidationPrice,
            subLiquidationPrice: info.subLiquidationPrice,
            activeNextButton:true,
          };
        });
      }
    } else {
      const loanToValue = await getLTV();
      const penalty = await getPenalty();
      const threshold = await getThreshold();
      const ethPrice = await getETHPrice();
      const rewardRate = await getRewardRate();
      const collateralInUSD = loanData?.borrowing / loanToValue * (1 + loanData?.buffer / 100);
      const collateral = collateralInUSD / ethPrice;
      const liquidationPrice = loanData?.borrowing / threshold / collateral;
      
      if (setLoanData) {
          setLoanData((prevLoanData) => {
              return {
                  ...prevLoanData,
                  cryptoName: info.coinShortName,
                  cryptoIcon:info.coinIcon,
                  loanToValue: loanToValue,
                  liquidationPenalty: penalty,
                  liquidationThreshold: threshold,
                  collateralPrice: ethPrice,
                  collateralNeeded: collateral,
                  liquidationPrice: liquidationPrice,
                  rewardRate: rewardRate,
                  activeNextButton:true,
                }
          })
      }
    }
  }

  const handleSelect = async (info) => {
    setSelectedCoin(info.coinShortName);
    if (info.coinShortName == "ETH") {
      await updateLoanData(info);
    } else {
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
            activeNextButton:true,
          };
        });
      }
    }
  };

  return (
    <div className="my-4 py-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {assets.map((coin) => {
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
