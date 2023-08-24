import LoanSummary from "../home/loanSummary/loanSummary";
import { FC } from "react";
import { ProtocolStep } from "@/types/type";
import FilterOptions from "@/components/filterOptions/filterOptions";
import SortOptions from "@/components/sortOptions/sortOptions";
import Image from "next/image";
import HoverTooltip from "@/components/shared/tooltip/tooltip";

const StepThree: FC<ProtocolStep> = ({ title, protocols }) => {
  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      {/* title start  */}
      <div className="flex items-center justify-between flex-wrap">
        <h1 className="text-2xl lg:text-3xl text-blackPrimary lg:text-start text-center">
          Customize Your Loan
        </h1>
        <div className="flex items-center justify-start gap-[14px]">
          {/* filter btn */}
          <div className="py-[10px] px-4 flex items-center justify-start gap-2 bg-[#EEE] rounded-full relative group">
            <p className="text-[#2C3B8D] font-medium ">Filter</p>
            <p className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-blue text-white">
              3
            </p>

            {/* filter options */}
            <FilterOptions />
          </div>
          {/* sort btn */}
          <div className="py-[10px] px-4 flex items-center justify-start gap-2 bg-[#EEE] rounded-full relative group">
            <p className="text-[#2C3B8D] font-medium ">Sort by: APR (lowest)</p>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0001 11.3215L14.4108 6.91076L15.5894 8.08927L10.0001 13.6785L4.41084 8.08927L5.58936 6.91076L10.0001 11.3215Z"
                  fill="#2C3B8D"
                />
              </svg>
            </div>

            {/* sort options */}
            <SortOptions />
          </div>
        </div>
      </div>
      {/* title end  */}

      {/* Choose section  */}
      <section className="flex gap-4 lg:gap-10 my-6 flex-col sm:flex-row ">
        <div className="w-full">
          <div className="p-6 border border-whiteSecondary rounded-2xl">
            <p className=" text-xl font-medium  text-blackPrimary lg:text-start text-center">
              {title}
            </p>
            {protocols?.map((protocol) => (
              <div className="my-4" key={protocol.id}>
                {/* protocol name */}
                <div className="flex items-center justify-between flex-col md:flex-row gap-2">
                  <div className="flex items-center justify-start gap-1">
                    <Image
                      src={protocol.symbol || ""}
                      alt={protocol.name || ""}
                      width={20}
                      height={20}
                    />
                    <h1 className="font-medium text-xl text-blackPrimary">
                      {protocol.name}
                    </h1>
                  </div>

                  <div className="flex items-center justify-end gap-8">
                    <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
                      <p className="text-xl font-medium text-blackPrimary">
                        {protocol.interestRate} <span className="text-base">%</span>
                      </p>

                      <p className="font-medium text-xs text-[#276EF1] bg-[#EFF3FE] rounded-md py-[2px] px-2">
                        Floating Rate
                      </p>
                    </div>

                    <div className="rounded-full py-[10px] px-6 bg-[#eee] text-[#2C3B8D] text-sm font-semibold">
                      Select
                    </div>
                  </div>
                </div>

                {/* protocol info */}
                <div className="py-4 px-6 overflow-auto w-full">
                  <div className="flex items-start justify-between gap-4 w-full">
                    {protocol.protocolInfos?.map((protocolInfo) => (
                      <div
                        className="flex-1 max-w-[210px]"
                        key={protocolInfo.id}
                      >
                        {/* info title */}
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-blackPrimary">
                            {protocolInfo.title}
                          </p>
                          {protocolInfo.tooltip && (
                            <HoverTooltip text={protocolInfo.tooltip || ""} />
                          )}
                        </div>
                        {/* info */}
                        <div className="py-3">
                          {protocolInfo.options?.map((info) => (
                            <div
                              className="space-y-3"
                              key={info.name + "=" + info.subInfo}
                            >
                              <p className="text-sm text-[#545454] flex items-center justify-start gap-1">
                                <span className="">{info.name} </span>
                                {info.subInfo && (
                                  <HoverTooltip text={info.subInfo || ""} />
                                )}
                              </p>
                              <p className="font-semibold text-blackPrimary">
                                {info.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="p-6 border border-[#E2E2E2] flex-1 rounded-2xl">
          <LoanSummary />
        </div> */}
      </section>
    </main>
  );
};

export default StepThree;
