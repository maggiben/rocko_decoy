import Image from "next/image";
import React from "react";
import errorOutline from "@/assets/error_outline.svg";

interface HoverTooltipProps {
  text: string;
}

const HoverTooltip: React.FC<HoverTooltipProps> = ({ text }) => {
  return (
    <div className="relative group">
      <Image width={16} height={16} src={errorOutline} alt="" className="" />
      {/* tooltip text */}
      <div className=" bg-gray-800 text-white text-xs py-1 px-2 rounded absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-30">
        {/* text here */}
        {text}
        <div className="arrow-down absolute left-1/2 transform -translate-x-1/2 -bottom-2 bg-gray-800 w-4 h-4 rotate-45 -z-20 "></div>
      </div>
      {/* tooltip text */}
    </div>
  );
};

export default HoverTooltip;
