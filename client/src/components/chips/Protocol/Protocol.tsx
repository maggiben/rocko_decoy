import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoanData, ProtocolProps } from '@/types/type';
import useLoanData from '@/hooks/useLoanData';
import { useLoanDB } from '@/db/loanDb';
import financial from '@/utility/currencyFormate';
import logger from '@/utility/logger';
import { NETWORK } from '@/constants/env';
import useSelectedNetwork from '@/hooks/useSelectedNetwork';
import { useProtocolConfig } from '@/protocols';
import { ProtocolConfig } from '@/protocols/types';
import HoverTooltip from '../HoverTooltip/HoverTooltip';
import EthIcon from '../../../assets/coins/ETH.svg';
import PlaceholderText from '../PlaceholderText/PlaceholderText';

const TOOLTIPS = require('../../../locales/en_tooltips');

const Protocol: FC<ProtocolProps> = ({
  name,
  symbol,
  chain,
  protocolInfo,
  selectProtocol,
  handleProtocol,
}) => {
  const { setSelectedNetwork } = useSelectedNetwork();
  const { loanData, setLoanData } = useLoanData();
  const [protocolData, setProtocolData] = useState<LoanData>(loanData);
  const [monthAvgAPR, setMonthAvgAPR] = useState<any>(0);
  const [threeMonthAvgAPR, setThreeMonthAvgAPR] = useState<any>(0);
  // const [yearAvgAPR, setYearAvgAPR] = useState<any>(0);
  // const [avgRewardRate, setAvgRewardRate] = useState<any>(0);
  const {
    getMonthAverageAPR,
    getThreeMonthAverageAPR,
    // getYearAverageAPR,
    // getYearAvgRewardRate,
    getRewardRate,
  } = useLoanDB();

  const calculateInterestAccrued = (
    borrowing: number,
    apr: number,
    days: number,
  ) => {
    const seconds = 60 * 60 * 24 * days;
    const interest =
      borrowing * (1 + apr / seconds) ** ((seconds * days) / 365) - borrowing;
    return interest;
  };

  const protocolConfig = useProtocolConfig().find(
    (c: ProtocolConfig) => c.chain === NETWORK,
  )!;

  // TODO - Update Loan Data Only AFTER Selection, we need display only values for each network
  // currently this is getting overwritten by the last network data fetched

  const updateLoanData = async (protoData: any, setData: any) => {
    try {
      const borrowing = Number(loanData?.borrowing);
      const buffer = Number(loanData?.buffer);
      const collateralPrice = Number(loanData?.collateralPrice);
      const currentAPR =
        (await protoData.getBorrowAPR?.(chain || 'sepolia')) || 0; // protocolData?.currentAPR;
      const loanToValue = await protoData.getLTV(); // Number(protocolData?.loanToValue);
      const penalty = await protoData.getPenalty(); // protocolData?.liquidationPenalty;
      const threshold = await protoData.getThreshold(); // Number(protocolData?.liquidationThreshold);
      const rewardRate = await getRewardRate(chain);
      const rewardAmount = loanData?.rewardAmount;
      const collateralInUSD = (borrowing / loanToValue) * (1 + buffer / 100);
      const collateral = collateralInUSD / collateralPrice;
      const liquidationPrice = borrowing / threshold / collateral;
      const decreaseToLiquidationPrice =
        ((collateralPrice - liquidationPrice) / collateralPrice) * 100;
      const interestSixMonths = calculateInterestAccrued(
        borrowing,
        currentAPR / 100,
        182.5,
      );
      const interestOneYear = calculateInterestAccrued(
        borrowing,
        currentAPR / 100,
        365,
      );
      const interestTwoYears = calculateInterestAccrued(
        borrowing,
        currentAPR / 100,
        365 * 2,
      );

      if (setData) {
        setSelectedNetwork(chain || NETWORK);
        setData((prevLoanData: any) => {
          const newLoanData = {
            ...prevLoanData,
            currentAPR,
            sixMonthInterest: interestSixMonths,
            twelveMonthInterest: interestOneYear,
            twentyFourMonthInterest: interestTwoYears,
            loanToValue,
            liquidationPenalty: penalty,
            liquidationThreshold: threshold,
            collateralNeeded: collateral,
            liquidationPrice,
            decreaseToLiquidationPrice,
            rewardRate,
            rewardAmount,
          };
          // console.log({ newLoanData });
          return newLoanData;
        });
      }
    } catch (e) {
      logger(`Cannot Update Loan Data: ${JSON.stringify(e, null, 2)}`);
    }
  };

  const formatNumber = (num: any, locale = 'en-US', decimals = 2) =>
    new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);

  const [totalBorrowed, setTotalBorrowed] = useState<number | undefined>(
    undefined,
  );
  const [availableToBeBorrowed, setAvailableToBeBorrowed] = useState<
    string | undefined
  >();

  const getBorrow = async () => {
    const value = await protocolConfig.getTotalBorrow();
    setTotalBorrowed(value);
  };

  const getUsdcBalance = async () => {
    const value = await protocolConfig.getUsdcBalance();
    setAvailableToBeBorrowed(value);
  };

  // Below is to USDC balance of comet contract as it's equal to available liquidity

  // async function getUsdcBalance() {
  //   const contractAddress = '0xc3d688B66703497DAA19211EEdff47f25384cdc3';
  //   const usdcAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
  //   const value = await getBalance(wagmiConfig, {
  //     address: contractAddress,
  //     token: usdcAddress,
  //   });

  //   const formattedBalance = value.formatted;

  //   setAvailableToBeBorrowed(formattedBalance);
  // }

  useEffect(() => {
    updateLoanData(protocolInfo, setProtocolData);

    getBorrow();
    getUsdcBalance();

    getMonthAverageAPR(chain)
      .then((_apr) => setMonthAvgAPR(_apr))
      .catch((e) => logger(JSON.stringify(e, null, 2), 'error'));

    getThreeMonthAverageAPR(chain)
      .then((_apr) => setThreeMonthAvgAPR(_apr))
      .catch((e) => logger(JSON.stringify(e, null, 2), 'error'));

    // getYearAvgRewardRate()
    //   .then((_rate) => setAvgRewardRate(_rate))
    //   .catch((e) => logger(JSON.stringify(e, null, 2), 'error'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        selectProtocol === `${name}-${chain}`
          ? 'py-8 rounded-t-lg bg-zinc-50'
          : 'py-8'
      }
    >
      <div className="px-5">
        {/* protocol name */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-1">
            <Image src={symbol || ''} alt={name || ''} width={20} height={20} />
            <h1 className="font-medium text-xl text-blackPrimary">{name}</h1>
            <p className="font-medium text-xs bg-[#E7EBFD] text-[#5E7CF1] rounded-md py-[2px] px-2">
              {chain}
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-8 ">
            <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
              <p className="text-xl font-bold text-[#141414]">
                {protocolData?.currentAPR ? (
                  <span style={{ fontSize: '32px' }}>
                    {financial(protocolData?.currentAPR, 2)}
                  </span>
                ) : (
                  <PlaceholderText />
                )}
                {/* <span style={{ fontSize: '32px' }}>
                  {protocolData?.currentAPR
                    ? financial(protocolData?.currentAPR, 2)
                    : null}
                </span> */}
                <span className="text-base">% APR</span>
              </p>

              <p className="font-medium text-xs text-[#7356BF] bg-[#F4F1FA] rounded-md py-[2px] px-2">
                Floating Rate
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (handleProtocol) {
                  handleProtocol(name, chain);
                  updateLoanData(protocolInfo, setLoanData);
                }
              }}
              className={`rounded-full py-[10px] px-6  text-sm font-semibold ${
                selectProtocol === `${name}-${chain}`
                  ? 'bg-[#eee] text-[#2C3B8D] border-[#2C3B8D] border-2'
                  : 'bg-[#eee] text-[#2C3B8D]'
              }`}
            >
              {selectProtocol === `${name}-${chain}` ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>

        {/* protocol info */}
        <div className="flex flex-col bg-[#F9F9F9] max-w-[615px] rounded-2xl p-4 my-2">
          <p className="text-sm text-[#545454]">
            {protocolConfig.description}{' '}
            <Link
              className="text-sm text-[#545454] underline"
              target="_blank"
              rel="noopener noreferrer"
              href="learn/the-top-defi-protocols-for-borrowing-compound-aave-and-makerdao"
            >
              Learn more.
            </Link>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:w-full">
          <div className="pl-6 pr-6 lg:w-full mt-4 lg:flex">
            <div className="lg:flex-1 lg:w-auto lg:max-w-[400px]">
              <h2 className="font-medium text-l text-blackPrimary pb-2">
                Key Loan Terms
              </h2>
              <div className="flex flex-col gap-4">
                <div className="sm:min-w-[180px]">
                  <div className="py-3 space-y-3">
                    <div className="">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">Current APR</span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        {financial(monthAvgAPR * 100, 2)}%
                      </p>
                    </div>
                    <div className="">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">Interest Rate Type</span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        {protocolConfig.rateType}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">Loan Term</span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        {protocolConfig.loanTerm}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex-1 lg:w-auto lg:max-w-[400px]">
              <div className="lg:py-4" />
              <div className="flex flex-col gap-4">
                <div className="sm:min-w-[180px]">
                  <div className="pt-0 lg:pt-3 pb-3 space-y-3">
                    <div className="">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">30 Day Trailing Average APR</span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        {financial(monthAvgAPR * 100, 2)}%
                      </p>
                    </div>
                    <div className="">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">90 Day Trailing Average APR</span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        {financial(threeMonthAvgAPR * 100, 2)}%
                      </p>
                    </div>
                    <div className="pb-3 lg:pb-0">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">Current Reward Rate</span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        {financial(Number(protocolData?.rewardRate) * 100, 2)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:flex-1 lg:w-auto lg:max-w-[400px]">
              <h2 className="font-medium text-l text-blackPrimary pb-2">
                Available Liquidity
              </h2>
              <div className="flex flex-col gap-4">
                <div className="sm:min-w-[180px]">
                  <div className="py-3 space-y-3">
                    <div className="">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">Available to Be Borrowed</span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        ${formatNumber(availableToBeBorrowed)}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-sm text-[#545454] flex gap-1">
                        <span className="">
                          Currently Borrowed (Including Interest)
                        </span>
                      </p>
                      <p className="font-semibold text-blackPrimary">
                        ${formatNumber(totalBorrowed)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-4 px-6 w-full mt-4">
          <div className="flex-1 min-w-[205px]">
            <div className="flex items-center gap-1">
              <p className="font-medium text-blackPrimary pb-4">
                Collateral Parameters
              </p>
            </div>
            <div className="flex border-b border-gray-300 py-2">
              <div className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4">
                <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                  <span className="">Collateral Asset</span>
                </p>
              </div>
              <div className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4">
                <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                  <span className="">Max Loan-to-Value</span>
                  <HoverTooltip text={TOOLTIPS.MAX_LTV} />
                </p>
              </div>
              <div className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4">
                <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                  <span className="">Liquidation Threshold</span>
                  <HoverTooltip text={TOOLTIPS.LIQUIDATION_THRESHOLD} />
                </p>
              </div>
              <div className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4">
                <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                  <span className="">Liquidation Penalty</span>
                  <HoverTooltip text={TOOLTIPS.LIQUIDATION_PENALTY} />
                </p>
              </div>
            </div>
            <div className="flex pt-1">
              <div
                className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4"
                style={{ display: 'inline-flex' }}
              >
                <Image src={EthIcon} width={24} height={24} alt="Eth icon" />
                <p className="font-semibold text-blackPrimary ml-2">ETH</p>
              </div>
              <div className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4">
                <p className="font-semibold text-blackPrimary justify-self-start text-left">
                  {Number(protocolData?.loanToValue) * 100}%
                </p>
              </div>
              <div className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4">
                <p className="font-semibold text-blackPrimary justify-self-start text-left">
                  {Number(protocolData?.liquidationThreshold) * 100}%
                </p>
              </div>
              <div className="flex-auto w-1/4 sm:min-w-[85px] lg:w-1/4">
                <p className="font-semibold text-blackPrimary justify-self-start text-left">
                  {financial(Number(protocolData?.liquidationPenalty) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protocol;
