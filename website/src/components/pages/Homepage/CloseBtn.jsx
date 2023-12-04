import clsx from 'clsx'
import React from 'react'

function CloseBtn(props) {
  const { icon, className, onClick } = props
  return (
    <div
      onClick={onClick}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
      className={clsx(
        'p-[8px] w-[40px] h-[40px] rounded-full flex justify-center items-center',
        className,
      )}
    >
      {icon}
    </div>
  )
}

export default CloseBtn
