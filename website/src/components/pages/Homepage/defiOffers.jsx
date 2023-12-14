import React from 'react'

export default function DefiOffers(props) {
  const { id, title, description } = props

  return (
    <div className="lg:mb-[24px] md:mb-[18px] mb-[16px]">
      <h5 className="text-[#141414] lg:text-[20px] md:text-[18px] text-[16px] leading-9 font-medium mb-[8px]">
        {id} {title}
      </h5>
      <p className="text-[#141414] lg:text-[18px] text-[16px leading-6 md:leading-8 font-normal">
        {description}
      </p>
    </div>
  )
}
