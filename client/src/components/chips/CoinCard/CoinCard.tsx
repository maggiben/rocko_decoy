import { CoinCardProps } from '@/types/type';
import Image from 'next/image';
import { FC } from 'react';

const CoinCard: FC<CoinCardProps> = ({
  coinIcon,
  coinName,
  coinShortName,
  selectedCoin,
  handleSelect,
  currentAPR,
  loanToValue,
  liquidationThreshold,
  liquidationPenalty,
  collateralPrice,
  subCollateralPrice,
  liquidationPrice,
  subLiquidationPrice,
  isComingSoon,
}) => (
  <div
    style={isComingSoon ? { pointerEvents: 'none' } : {}}
    onClick={() =>
      handleSelect({
        coinIcon,
        coinName,
        coinShortName,
        selectedCoin,
        currentAPR,
        loanToValue,
        liquidationThreshold,
        liquidationPenalty,
        collateralPrice,
        subCollateralPrice,
        liquidationPrice,
        subLiquidationPrice,
      })
    }
    className={`px-1 py-6 md:px-6 md:py-6 flex flex-col  gap-2 w-full mx-auto border-2  rounded-[20px] cursor-pointer items-center lg:items-start text-center lg:text-start justify-between ${
      coinShortName === selectedCoin
        ? 'border-[#2C3B8D] bg-whiteTertiary'
        : 'border-whiteSecondary bg-white '
    }`}
  >
    <div className="flex items-center flex-col md:flex-row gap-2 justify-start">
      <Image width={40} height={40} src={coinIcon} alt="Ether" className="" />
      {isComingSoon && (
        <div className="px-2 py-[2px] bg-[#EEE] rounded-[5px] text-[#545454] font-medium  text-[11px]">
          {coinShortName === 'USD' ? 'U.S. Coinbase users only' : 'Coming Soon'}
        </div>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-xl font-medium text-blackPrimary mt-8">
        {coinShortName}
      </p>
      <p className="text-sm text-blackSecondary min-h-[20px]">{coinName}</p>
    </div>
  </div>
);

export default CoinCard;
