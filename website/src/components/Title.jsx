import React from 'react'

function Title(props) {
  const { title } = props
  return (
    <div className="text-white font-semibold lg:text-[64px] md:text-[40px] sm:-text-[30px] text-[25px] text-center lg:leading-[72px] md:max-w-[840px] m-[auto]">
      {title}
    </div>
  )
}

export default Title
