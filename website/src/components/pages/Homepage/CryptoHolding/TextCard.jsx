import clsx from 'clsx'
import React from 'react'

function TextCard(props) {
  const { text, className, icon: Icon } = props
  return (
    <div
      className={clsx(
        className,
        'flex items-center gap-[12px] bg-white p-[12px] mb-[18px] rounded-lg',
      )}
    >
      <div className="p-[8px] w-[40px] h-[40px] bg-[#0F2E35] rounded-full flex justify-center items-center">
        <Icon height={24} width={24} />
      </div>
      <div className="text-[#0D272D] text-[18px] font-medium">{text}</div>
    </div>
  )
}

export default TextCard
