import clsx from 'clsx'
import React from 'react'

function DataCard(props) {
  const { title, description, className, isNext = true } = props
  return (
    <div
      className={clsx(
        className,
        'pb-[60px] pl-[16px] lg:max-w-[520px] relative ',
        isNext
          ? 'after:w-[1px] after:h-[92.5%] after:absolute after:top-[20px] after:bg-[#0E2A30] after:left-[0]'
          : '',
      )}
    >
      <p className="leading-normal text-[18px] text-[#141414] font-medium relative before:w-[8px] before:h-[8px] before:absolute before:top-[9.5px] before:bg-[#0E2A30] before:rounded-[50%] before:left-[-18.8px] ">
        {title}
      </p>
      <p className="text-[#545454] text-[16px]">{description}</p>
    </div>
  )
}

export default DataCard
