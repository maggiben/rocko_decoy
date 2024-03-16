import React, { useEffect } from 'react'
import Layout from '../layout'
import Title from '../components/Title'
import Input from '../components/Input'
import FormWrapper from '../components/shared/FormWrapper'
import Mission from '../assets/images/mission.svg'

export default function About() {
  useEffect(() => {
    document.title =
      "About Rocko's Team and Mission: Crypto-Backed Loans at Competitve Rates"
  }, [])
  return (
    <Layout>
      <div className="banner bg-[#081D21] lg:pt-[120px] py-[50px] px-[16px]  lg:pb-[120px]  text-center">
        <div className="max-w-[894px] w-full mx-[auto] text-center">
          <div className="rounded-full h-[38px] w-[38px] bg-[#15292c00] overflow-hidden mx-[auto] mb-[16px]">
            {' '}
            <Mission />
          </div>
          <p className="text-[#ffffff99] text-[24px] leading-[28px] font-medium mb-[16px]">
            Our Mission
          </p>
          <h2 className="defi text-[#fff] lg:text-[48px] lg:leading-[56px]  font-medium sm:-text-[30px] text-[25px]">
            Help people access DeFi in a secure and simple manner to get the
            most value from their crypto assets
          </h2>
        </div>
      </div>
      <div className="max-w-[675px] w-full lg:py-[80px] py-[40px] m-[auto] px-[15px]">
        <h2 className="defi lg:text-[40px] md:text-[35px] text-[22px] text-[#141414] leading-[56px] font-normal lg:mb-[24px] mb-[16px]">
          Who we are
        </h2>
        <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal">
          We&lsquo;re a team of experienced fintech founders who have built and
          launched innovative consumer financial products such as the Gemini
          Credit Card, MarcusPay by Goldman Sachs, and Ondo Finance. We started
          Rocko as we&lsquo;re passionate about crypto and DeFi, but find it too
          complex for most people to use. We want to make DeFi more accessible
          so that everyone can take advantage of its benefits and improve their
          financial lives.
        </p>
        <p className="text-[#141414] lg:text-[18px] text-[16px leading-8  font-normal lg:pt-[24px] pt-[20px]">
          Please don&lsquo;t hesitate to reach out with product feedback and
          ideas for us to improve Rocko using the contact tab above. Thanks for
          your support!{' '}
        </p>
      </div>
      <div className="banner bg-[#081D21] lg:pt-[98px] pt-[50px] px-[16px]  pb-[32px]   text-center">
        <Title title="Be one of the first to get a crypto-backed loan using Rocko" />
        <FormWrapper className="lg:mt-[32px] mt-[24px]">
          <Input
            placeholder="Type your email here"
            className="!bg-[#fff] text-[16px] font-normal mb-[32px] max-w-[448px] w-full outline-0 mx-[auto] text-[#141414] placeholder-[#141414]"
          />
          <button
            type="submit"
            className=" uppercase text-[#006AFF] bg-white py-[14px] px-[32px] text-sm font-semibold rounded-full"
          >
            Join the waitlist
          </button>
        </FormWrapper>
      </div>
    </Layout>
  )
}
