import financial from '@/utility/currencyFormate';
import React, { useEffect, useRef, useState } from 'react';

function RangeInput() {
  const valueDivRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<number>(10);
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const [valueDivWidth, setValueDivWidth] = useState<number>(0);
  const [minimum, setMinimum] = useState<number>(0);

  const valueDivStyle = {
    left: `calc(${thumbPosition}% - ${80 / 2}px)`,
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    setThumbPosition(
      ((newValue - parseInt(event.target.min, 10)) /
        (parseInt(event.target.max, 10) - parseInt(event.target.min, 10))) *
        100,
    );
  };

  useEffect(() => {
    if (valueDivRef.current) setValueDivWidth(valueDivRef.current.offsetWidth);
  }, [value]);

  console.log({ value });

  return (
    <div className="flex items-center justify-between gap-1 md:gap-3 pb-[46px] pt-[70px]">
      <p className="text-sm md:text-base sm:block hidden">Higher Risk</p>
      <p className="text-sm md:text-base sm:hidden block">HR</p>

      <div className="flex-1 flex items-start">
        <div className="w-10 md:w-20 h-[6px]" />

        {/* fake bar space of right */}
        <div className=" flex-1">
          {/* rang slider container */}
          <div className="relative w-full">
            {/* fake bar start */}
            <div className="w-10 md:w-20 h-[6px] rounded-full bg-[#2C3B8D] mt-[3px] absolute top-1/2 -translate-y-1/2 right-[calc(100%-4px)]">
              <div className="frame h-3 w-3 bg-[#2C3B8D] rotate-180 absolute -top-2  -right-3 mt-[-3px]" />
              <div className="frame h-3 w-3 bg-[#2C3B8D] absolute top-[2px] -right-3 mt-[3px]" />
            </div>
            {/* fake bar end */}
            {/* initial fix value start */}
            <div className="flex items-center justify-between w-fit absolute  top-10 -left-14 ">
              <div className="text-center ">
                <p className="text-[#545454] text-xs whitespace-nowrap">
                  Minimum collateral required:
                </p>
                <p className="text-[#141414] text-xs whitespace-nowrap">
                  {financial(minimum, 4)} ETH ($
                  {financial(50 * minimum, 2)})
                </p>
              </div>
            </div>
            {/* initial fix value end */}
            <input
              type="range"
              className="range w-full "
              min="10"
              max="400"
              value={value}
              onChange={handleInputChange}
              data-value={value}
              style={{
                background: `linear-gradient(to right, #2C3B8D 0%, #2C3B8D ${thumbPosition}%, #E2E2E2 ${thumbPosition}%, #E2E2E2 100%)`,
              }}
            />{' '}
            <div
              ref={valueDivRef}
              className="absolute w-20 h-12 left-0 -top-16 text-center text-white bg-[#2C3B8D] rounded-full py-3 px-4"
              style={valueDivStyle}
            >
              <p className="">{value}%</p>
              {/*  <div className="w-1 h-10 bg-[#2C3B8D] absolute top-full left-1/2 -translate-x-1/2"></div> */}
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm md:text-base sm:hidden block">LR</p>
      <p className="text-sm md:text-base sm:block hidden">Lower Risk</p>
    </div>
  );
}

export default RangeInput;
