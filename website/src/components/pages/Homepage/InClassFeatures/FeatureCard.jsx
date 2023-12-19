import clsx from 'clsx'
import React from 'react'

function FeatureCard(props) {
  const { className, title, description, image } = props
  return (
    <div
      style={{}}
      className={clsx(
        className,
        ' md:max-w-[427px] w-full md:p-[20px] p-[16px] lg:p-[30px] rounded-[16px] ',
      )}
    >
      <div className="relative ">
        <div className="">
          {image}
          <p
            className={clsx(
              className,
              'text-[#0F2E35] lg:text-[28px] md:text-[25px] text-[18px] font-medium mt-[24px] mb-[16px] bg-transparent',
            )}
          >
            {title}
          </p>
          <p
            className={clsx(
              className,
              'text-[16] text-[#141414] sm:text-[20px] font-400 leading-[20px] sm:leading-[32px] bg-transparent',
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
