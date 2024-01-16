import React, { useState } from 'react'

function Tooltip(props) {
  const { title, timeout = 2000, onClick, children } = props
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    setShowTooltip(true)
    onClick?.()
    setTimeout(() => {
      setShowTooltip(false)
    }, timeout)
  }

  return (
    <button className='relative' onClick={handleClick}>
      {children}
      {showTooltip && (
        <div className="bg-white shadow text-[#141414] text-[12px] py-1 px-6 rounded-[16px] font-medium absolute top-[-35px] text-success">
          {title}
        </div>
      )}
    </button>
  )
}

export default Tooltip
