import clsx from 'clsx'
import React, { useState } from 'react'
import CloseBtn from '../CloseBtn'
import CloseIcon from '../CloseIcon'

function FeatureCard(props) {
  const { children, className, title, description } = props

  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(prev => !prev)
  }

  return (
    <div
      style={{ transform: `rotateY(${active ? '180' : '0'}deg)` }}
      className={clsx(
        className,
        'perceptive-[1000px] transform-style-3d md:max-w-[427px] min-h-[300px] sm:min-h-[460px] w-full md:p-[20px] p-[16px] rounded-[16px] transition duration-500 ease-in-out',
      )}
    >
      <div className="relative transform-style-3d">
        <div className="backface-visibility-hidden absolute">{children}</div>
        <div className="backface-visibility-hidden absolute transform-rotate-y-180">
          <p className="text-[20] sm:text-[28px] font-500 leading-[32px] sm:leading-[40px] mb-2 sm:mb-4">
            {title}
          </p>
          <p className="text-[16] sm:text-[20px] font-400 leading-[20px] sm:leading-[32px]">
            {description}
          </p>
        </div>
      </div>
      <CloseBtn
        icon={
          <CloseIcon
            fill="#006AFF"
            height={24}
            width={24}
            style={{ rotate: '45deg' }}
          />
        }
        className="cursor-pointer bg-[#FFF] backface-visibility-hidden absolute bottom-[20px] right-[20px] sm:bottom-[40px] sm:right-[40px]"
        onClick={handleClick}
      />
      <CloseBtn
        icon={<CloseIcon fill="white" height={24} width={24} />}
        className="cursor-pointer bg-[#006AFF] transform-rotate-y-180 backface-visibility-hidden absolute bottom-[20px] left-[20px] sm:bottom-[40px] sm:left-[40px]"
        onClick={handleClick}
      />
    </div>
  )
}

export default FeatureCard
