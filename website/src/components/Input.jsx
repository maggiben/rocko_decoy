import clsx from 'clsx'
import React from 'react'

function Input(props) {
  const { label, className, ...rest } = props
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor="input"
          className="font-medium text-[#141414] text-[14px] mb-[8px] block"
        >
          {label}
        </label>
      )}
      <input
        className={clsx(
          className,
          'block w-full rounded-[10px] border border-[#E6E6E6] bg-transparent md:py-[16px]   md:px-[16px] p-[10px] outline-0 text-[14px] font-normal ::placeholder-[#000]',
        )}
        {...rest}
      />
    </div>
  )
}

export default Input
