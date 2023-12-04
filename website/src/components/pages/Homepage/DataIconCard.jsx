import React from 'react'

function DataIconCard(props) {
  const { className, cardHeading, icon: Icon, CardContent } = props
  return (
    <div className={className}>
      <div className="p-[12px] w-[56px] h-[56px] bg-[#0F2E35] rounded-full flex justify-enter items-center lg:mb-[32px] mb-[20px]">
        <Icon height="32" width="32" />
      </div>
      <h3 className="text-[#0D272D] text-[18px] font-medium mb-[8px]">
        {cardHeading}
      </h3>
      <p className="text-[#545454] text-[16px]">{CardContent}</p>
    </div>
  )
}

export default DataIconCard
