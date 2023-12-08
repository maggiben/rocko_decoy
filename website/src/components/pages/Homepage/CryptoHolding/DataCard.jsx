import { Link } from 'gatsby'
import React from 'react'

function DataCard(props) {
  const { heading, content, label, link, className } = props
  return (
    <div className={className}>
      <h3 className="font-medium md:text-[28px] text-[22px] text-[#141414] mb-4 leading-10">
        {heading}
      </h3>
      <p className="font-normal lg:text-[20px] text-[16px] text-[#141414] leading-8">
        {content}
      </p>
      <span className="font-normal lg:text-[18px] text-[16px] text-[#545454] leading-8 d-block mt-[20px]">
        {label}{' '}
        <Link
          className="font-normal lg:text-[18px] text-[16px] text-[#545454] leading-8 underline decoration-1"
          to="https://rocko.co/why-defi"
        >
          {link}
        </Link>
      </span>
    </div>
  )
}

export default DataCard
