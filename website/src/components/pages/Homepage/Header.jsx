import React from 'react'
import Title from '../../Title'
import Input from '../../Input'
import FormWrapper from '../../shared/FormWrapper'

function Header(props) {
  const { title, subTitle = '', description, content } = props
  return (
    <div className="banner bg-[#081D21] lg:pt-[114px] pt-[50px] px-[16px]  lg:pb-[32px] pb-[32px]  text-center">
      <Title title={title} />
      <p className="text-center text-white lg:text-[20px] md:text-[18px] text-[16px] font-medium leading-7 lg:my-[32px] my-[20px] md:max-w-[630px] mx-[auto]">
        {subTitle}
      </p>
      <FormWrapper>
        <Input
          placeholder="Type your email here"
          name="EMAIL"
          id="EMAIL"
          type="email"
          className="!bg-[#fff] mb-[40px] !py-[12px] !px-[15px] max-w-[380px] w-full outline-0 mx-[auto] text-[#141414]"
        />
        <button
          type="submit"
          className="gradient-button uppercase text-[#006AFF] py-[18px] px-[32px] text-sm font-semibold rounded-full"
        >
          Join the waitlist
        </button>
      </FormWrapper>
      <p className="text-[#ffffff66] mx-[auto] text-[10px] font-normal lg:mt-[32px] mt-[20px]">
        {description}
      </p>
      <p className="text-[#ffffff66] mx-[auto] text-[10px] font-normal">
        {content}
      </p>
    </div>
  )
}

export default Header
