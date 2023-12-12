import React from 'react'

function SelectInput(props) {
  const { options, value, onSelect, label } = props
  return (
    <div className="w-full">
      <label
        htmlFor="select"
        className="font-medium text-[#141414] text-[14px] mb-[8px] block relative after:w-[8px] after:h-[8px] after:border-[#B3B3B3] after:border-b after:border-r after:transform after:rotate-45 after:absolute after:right-3 after:bottom-[-37px]"
      >
        {label}
      </label>

      <select
        name="selected"
        id="select"
        className="block w-full block w-full rounded-[10px] border border-[#E6E6E6] outline-0 text-[#B3B3B3] py-[16px] px-[16px] appearance-none caret-[#444]"
      >
        {options.map(opt => (
          <option
            onSelect={onSelect}
            selected={opt.value === value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
