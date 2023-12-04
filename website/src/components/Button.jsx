import React from 'react'
import clsx from 'clsx'

function Button(props) {
  const { variant = 'primary', className, children } = props

  return (
    <button
      type="button"
      className={clsx(
        'px-[28px] md:py-[14px] py-[10px] text-base rounded-full duration-500 text-[14px]',
        variant === 'primary' && 'text-white bg-blue hover:bg-[#6b3493]',
        variant === 'secondary' && 'text-blue bg-grayPrimary',
        variant === 'info' && 'text-white bg-[#ABB1D1]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
