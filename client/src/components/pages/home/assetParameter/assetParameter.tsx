import { AssetParameterProps } from "@/types/type";
import { FC } from "react";
import HoverTooltip from "@/components/shared/tooltip/tooltip";

const AssetParameter: FC<AssetParameterProps> = ({ active, title, value }) => {
  return (
    <div className="">
      <div
        className={`flex items-center justify-start gap-1 text-sm ${
          active ? "text-blackPrimary" : "text-blackSecondary "
        } `}
      >
        {title}
        <HoverTooltip text={`${title} tooltip`} />
      </div>
      <p className="font-semibold text-blackPrimary">{value ? `${value}%` : "--"} </p>
    </div>
  );
};

export default AssetParameter;
