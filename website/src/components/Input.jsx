import React from 'react'

function Input(props) {
  const { label, value, type, onChange } = props
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
        className="block w-full rounded-[10px] border border-[#E6E6E6]  bg-transparent py-[10px] px-[16px]"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default Input
