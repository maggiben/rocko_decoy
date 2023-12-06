import clsx from 'clsx'
import React from 'react'

function StepBtn(props) {
  const { title, subTitle, active, onPress, tab } = props
  return (
    <div
      className={clsx(
        'flex flex-col justify-center text-[#444] h-[82px] border-l-[2px] border-[#E2E2E2] pl-[26px]',
        active && 'text-[#ddd] relative',
      )}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
      onClick={() => onPress(tab)}
    >
      <span className="absolute left-[-2px] top-0 h-[42px] bg-[#0E2A30] w-[2px]" />
      <p className="text-[18px] text-[#141414] font-medium">{title}</p>
      <p
        className={`text-[#545454] text-[16px] transition-all ${
          active ? '' : 'hidden'
        }`}
      >
        {subTitle}
      </p>
    </div>
  )
}
export default StepBtn
