import React from 'react'
import clsx from 'clsx'

function PictureCard(props) {
  const { children, className, noPadding = false } = props
  return (
    <div
      className={clsx(
        'bg-[#081D20] relative lg:max-w-[542px] md:min-h-[420px] w-full rounded-[20px] overflow-hidden border-4 border-[#081D20]',
        noPadding ? '' : 'lg:p-[40px] md:p-[30px] p-[15px]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default PictureCard
