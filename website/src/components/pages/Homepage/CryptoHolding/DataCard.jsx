import React from 'react'

function DataCard(props) {
  const { heading, content, className } = props
  return (
    <div className={className}>
      <h3 className="font-medium md:text-[28px] text-[22px] text-[#141414] mb-4 leading-10">
        {heading}
      </h3>
      <p className="font-normal lg:text-[20px] text-[16px] text-[#141414] leading-8">
        {content}
      </p>
    </div>
  )
}

export default DataCard
