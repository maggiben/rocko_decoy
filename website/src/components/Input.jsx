import clsx from 'clsx'
import React from 'react'

function Input(props) {
  const { label, value, type, onChange, placeholder, className } = props
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
        type={type}
        id="input"
        className={clsx(
          className,
          'block w-full rounded-[10px] border border-[#E6E6E6] bg-transparent py-[16px] px-[16px] outline-0 text-[16px] font-normal ::placeholder-[#000]',
        )}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
