import Image from "next/image";
import HoverTooltip from "../shared/tooltip/tooltip";
import { FC, useState } from "react";
import { ProtocolProps } from "@/types/type";

const Protocol: FC<ProtocolProps> = ({
  interestRate,
  id,
  name,
  protocolInfos,
  symbol,
  selectProtocol,
  handleProtocol,
}) => {
  return (
    <div className="py-8  overflow-auto">
      {/* protocol name */}
      <div className="flex items-center justify-between flex-col md:flex-row gap-2">
        <div className="flex items-center justify-start gap-1">
          <Image src={symbol || ""} alt={name || ""} width={20} height={20} />
          <h1 className="font-medium text-xl text-blackPrimary">{name}</h1>
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-8 ">
          <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
            <p className="text-xl font-medium text-blackPrimary">
              {interestRate} <span className="text-base">%</span>
            </p>

            <p className="font-medium text-xs text-[#276EF1] bg-[#EFF3FE] rounded-md py-[2px] px-2">
              Floating Rate
            </p>
          </div>

          <button
            onClick={() => {
              if (handleProtocol) {
                handleProtocol(name);
              }
            }}
            className={`rounded-full py-[10px] px-6  text-sm font-semibold ${
              selectProtocol === name
                ? "text-[#eee] bg-[#2C3B8D] "
                : "bg-[#eee] text-[#2C3B8D]"
            }`}
          >
            Select
          </button>
        </div>
      </div>

      {/* protocol info */}
      <div className="py-4 px-6 w-full mt-4">
        <div className="flex items-start justify-between gap-4 w-full">
          {protocolInfos?.map((protocolInfo) => (
            <div className="flex-1 min-w-[205px]" key={id}>
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
              <div className="py-3 space-y-3">
                {protocolInfo.options?.map((info) => (
                  <div className="" key={info.name + "=" + info.subInfo}>
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
  );
};

export default Protocol;
