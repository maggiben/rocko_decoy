import { useEffect, useState } from "react";
import CoinCard from "../CoinCard/CoinCard";
import useLoanData from "@/hooks/useLoanData";

const ChooseCoins = ({ assets }: any) => {
  const { loanData, setLoanData } = useLoanData();
  const [selectedCoin, setSelectedCoin] = useState("");

  const initialize = () => {
    if (loanData?.cryptoName !== "") {
      setSelectedCoin(loanData?.cryptoName);
      if (setLoanData) {
        setLoanData((prevLoanData) => {
          return {
            ...prevLoanData,
            activeNextButton:true,
          }
        });
      }
    }
  };

  const updateLoanData = async (info: any) => {
    
    if (setLoanData) {
      setLoanData((prevLoanData) => {
        return {
            ...prevLoanData,
            cryptoName: info.coinShortName,
            cryptoIcon:info.coinIcon,
            activeNextButton: true,
          }
      })
    }
  }

  const handleSelect = async (info: any) => {
    console.log(info)
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

  useEffect(() => {
    initialize();
  }, []);

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
            isComingSoon={coin.comingSoon}
          />
        );
      })}
    </div>
  );
};

export default ChooseCoins;
