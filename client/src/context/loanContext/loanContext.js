import { createContext, useState } from "react";

export const loneContext = createContext({
  loanData: {
    borrowing: 0,
    protocol: "",
    currentAPR: 0,
    coin: "",
    sixMonthInterest: 0,
    twelveMonthInterest: 0,
    twentyFourMonthInterest: 0,
    paymentMethod: "",

    buffer: 0,
    loanToValue: 0,
    collateralPrice: 0,
    subCollateralPrice: 0,
    collateralNeeded: 0,
    liquidationPenalty: 0,
    liquidationThreshold: 0,
    liquidationPrice: 0,
    subLiquidationPrice: 0,
    rewardRate: 0,
    rewardAmount: 0,
    coinIcon:'',
    cryptoIcon: '',
    cryptoName: '',
    activeNextButton: false,
    nextValidation: "",
  },
  loanSteps: [],
  currentStep: 0,
  setLoanData: function (value) {
    throw new Error("Function not implemented.");
  },
  setCurrentStep: function (value) {
    throw new Error("Function not implemented.");
  },
});

const LoneProvider = ({ children }) => {
  const [loanData, setLoanData] = useState({
    borrowing: 0,
    protocol: "",
    currentAPR: 0,
    coin: "",
    sixMonthInterest: 0,
    twelveMonthInterest: 0,
    twentyFourMonthInterest: 0,
    paymentMethod: "",
    buffer: 0,
    collateralNeeded: 0,
    loanToValue: 0,
    collateralPrice: 0,
    subCollateralPrice: 0,
    liquidationPenalty: 0,
    liquidationThreshold: 0,
    liquidationPrice: 0,
    subLiquidationPrice: 0,
    rewardRate: 0,
    rewardAmount: 0,
    coinIcon:'',
    cryptoIcon: '',
    cryptoName: '',
    activeNextButton:false,
    nextValidation: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const loanSteps = [
    // step-1 need to select currencies usdc or usd.
    {
      id: 1,
      title: "What do you want to borrow?",
      currency: [
        {
          id: "currency-1",
          name: "USDC",
          fullName: "USD Coin",
          symbol: "./assets/coins/USD Coin (USDC).svg",

          currentAPR: 0, // apr is  calculated in percentage
        },
        {
          id: "currency-2",
          name: "USD",
          fullName: "US Dollar",
          symbol: "./assets/coins/USD.svg",
          label: "Coming Soon",
          currentAPR: 2.56, // apr is calculated in percent
        },
      ],
    },

    // step-2 Choose which asset you will post as collateral.
    {
      id: 2,
      title: "Choose which asset you will post as collateral.",
      assets: [
        {
          id: "asset-1",
          name: "ETH",
          fullName: "Ether",
          symbol: "./assets/coins/Ether (ETH).svg",

          loanToValue: 0.7, // data is  in percentage
          liquidationThreshold: 0.82, // data is in percentage
          liquidationPenalty: 0.05, // data is in percentage
          collateralPrice: 8.3145,
          subCollateralPrice: 16548.6,
          liquidationPrice: 1902.48,
          subLiquidationPrice: 2264.82,
          comingSoon: false,
        },

        {
          id: "assets-2",
          name: "COMP",
          fullName: "Compound",
          symbol: "./assets/coins/Compound (COMP).svg",

          loanToValue: 0.8, // data is  in percentage
          liquidationThreshold: 0.1, // data is in percentage
          liquidationPenalty: 0.06, // data is in percentage
          collateralPrice: 7.3121,
          subCollateralPrice: 13823.6,
          liquidationPrice: 1712.48,
          subLiquidationPrice: 1864.82,
          comingSoon: true,
        },

        {
          id: "assets-3",
          name: "WBTC",
          fullName: "Wrapped Bitcoin",
          symbol: "./assets/coins/Wrapped Bitcoin (WBTC).svg",

          loanToValue: 0.9, // data is  in percentage
          liquidationThreshold: 0.6, // data is in percentage
          liquidationPenalty: 0.04, // data is in percentage
          collateralPrice: 9.0421,
          subCollateralPrice: 30823.6,
          liquidationPrice: 1212.48,
          subLiquidationPrice: 1264.82,
          comingSoon: true,
        },
        {
          id: "assets-4",
          name: "UNI",
          fullName: "Uniswap",
          symbol: "./assets/coins/Uniswap (UNI).svg",

          loanToValue: 0.8, // data is  in percentage
          liquidationThreshold: 0.8, // data is in percentage
          liquidationPenalty: 0.02, // data is in percentage
          collateralPrice: 9.3121,
          subCollateralPrice: 62823.6,
          liquidationPrice: 1542.48,
          subLiquidationPrice: 3864.82,
          comingSoon: true,
        },
      ],
    },
    // Choose the lending protocol to borrow from
    {
      id: 3,
      title: "Choose a lender and loan offer.",
      protocols: [
        {
          id: "protocol-2",
          name: "Aave",
          symbol: "/icons/Aave (AAVE).svg",
          interestRate:4.02,

          protocolInfos: [
            {
              id: "protocol-info-1",
              title: "Trailing APRs",
              tooltip: "tooltip information",
              options: [
                {
                  name: "30 Day",
                  value: '4.01%', //value will percentage
                  subInfo: "",
                },
                {
                  name: "365 Day",
                  value: '3.76%', //value will percentage
                  subInfo: "",
                },
              ],
            },
            {
              id: "protocol-info-2",
              title: "Collateral Parameters (ETH)",
              tooltip: "",
              options: [
                {
                  name: "Max Loan-to-Value",
                  value: '82.5%', //value will percentage
                  subInfo: "Max Loan-to-Value tooltip",
                },
                {
                  name: "Liquidation Threshold",
                  value: '86%', //value will percentage
                  subInfo: "Liquidation Threshold tooltip",
                },
                {
                  name: "Liquidation Penalty",
                  value: '5%', //value will percentage
                  subInfo: "Liquidation Penalty",
                },
              ],
            },
            {
              id: "protocol-info-3",
              title: "Rewards",
              tooltip: "tooltip information",
              options: [
                {
                  name: "Current Rate",
                  value: 'N/A', //value will percentage
                  subInfo: "",
                },
                {
                  name: "Trailing 365 average",
                  value: 'N/A', //value will percentage
                  subInfo: "",
                },
              ],
            },
          ],
        },
        {
          id: "protocol-3",
          name: "Notional Finance",
          symbol: "/icons/image 18.png",
          interestRate:5.64,
          protocolInfos: [
            {
              id: "protocol-info-1",
              title: "Trailing APRs",
              tooltip: "tooltip information",
              options: [
                {
                  name: "30 Day",
                  value: '5.87%', //value will percentage
                  subInfo: "",
                },
                {
                  name: "365 Day",
                  value: '6.2%', //value will percentage
                  subInfo: "",
                },
              ],
            },
            {
              id: "protocol-info-2",
              title: "Collateral Parameters (ETH)",
              tooltip: "",
              options: [
                {
                  name: "Max Loan-to-Value",
                  value: '70%', //value will percentage
                  subInfo: "Max Loan-to-Value tooltip",
                },
                {
                  name: "Liquidation Threshold",
                  value: '82%', //value will percentage
                  subInfo: "Liquidation Threshold tooltip",
                },
                {
                  name: "Liquidation Penalty",
                  value: '5%', //value will percentage
                  subInfo: "Liquidation Penalty",
                },
              ],
            },
            {
              id: "protocol-info-3",
              title: "Rewards",
              tooltip: "tooltip information",
              options: [
                {
                  name: "Current Rate",
                  value: 'N/A', //value will percentage
                  subInfo: "",
                },
                {
                  name: "Trailing 365 average",
                  value: 'N/A', //value will percentage
                  subInfo: "",
                },
              ],
            },
          ],
        },
      ],
    },
    // Choose how much collateral buffer you want.
    {
      id: 4,
      title: "Choose how much collateral buffer you want",
      risk: {
        minRisk: 0,
        maxRisk: 200,
      },
      description:
        "Your loan requires your collateral to maintain a certain value at all times, otherwise your collateral may be liquidated (i.e. sold) by the lender. By posting more collateral than required, you can reduce the projected liquidation price and the likelihood of this occurring. Learn more. ",
    },
    {
      id: 5,
      title: "Loan Summary",
    },
  ];

  return (
    <loneContext.Provider
      value={{
        loanData,
        setLoanData,
        loanSteps,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </loneContext.Provider>
  );
};

export default LoneProvider;
