import React from 'react'
import { Link } from 'gatsby'
import Title from '../../Title'

function Header(props) {
  const { title, subTitle = '', description, content } = props
  return (
    <div className="banner bg-[#081D21] lg:pt-[114px] py-[50px] px-[16px]  lg:pb-[90px]  text-center">
      <Title title={title} />
      <p className="text-center text-white lg:text-[20px] md:text-[18px] text-[16px] font-medium leading-7 lg:my-[32px] my-[20px]">
        {subTitle}
      </p>
      <Link
        to="/waitlist"
        variant="custom"
        className=" uppercase text-[#006AFF] bg-white py-[11px] px-[24.6px] text-sm font-semibold rounded-full"
      >
        Join the waitlist
      </Link>
      <p className="text-[#ffffff66] mx-[auto]  max-w-[410px] text-[10px] font-normal lg:mt-[32px] mt-[20px]">
        {description}
      </p>
      <p className="text-[#ffffff66] mx-[auto]  max-w-[410px] text-[10px] font-normal">
        {content}
      </p>
    </div>
  )
}

export default Header
