import React from "react";

const HoverTooltip = ({ text }) => {
  return (
    <div className="relative group">
      <img width={16} height={16} src="./assets/error_outline.svg" alt="" className="" />

      {/* tooltip text */}
      <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded absolute bottom-8 left-1/2 transform -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 group-hover:z-20">
        {/* text here */}
        {text}
      </div>

      {/* tooltip arrow box */}
      <div className="arrow-down absolute bottom-6 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 left-1/2 transform -translate-x-1/2 bg-gray-800 w-4 h-4 rotate-45 -z-1 group-hover:-z-2"></div>
    </div>
  );
};

export default HoverTooltip;
