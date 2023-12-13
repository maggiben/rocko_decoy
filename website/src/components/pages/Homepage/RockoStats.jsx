import React from 'react'

function RockoStats() {
  const totalLoans = 15

  const avgLoanSize = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(18000)

  const avgApr = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
  }).format(5.45 / 100)

  return (
    <section className="bg-[#FCFCFC] lg:py-[100px] py-[50px] border-b border-[#E2E2E2]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-x-[8px] md:!flex-nowrap flex-wrap  ">
          <div className="md:border-l-[1px] border-[#E2E2E2] lg:pl-[40px] md:pl-[16px] md:max-w-[330px] w-full mb-[20px] md:mb-[0]">
            <span className="text-[#141414] lg:text-[64px] md:text-[40px] text-[25px] font-normal leading-7 md:leading-[64px]">
              ${totalLoans}
              <span className="lg:text-[40px] md-[25px] text-[16px]">M</span>
            </span>
            <p className="text-[#141414] text-[16px] font-normal leading-7">
              loans fulfilled through Rocko
            </p>
          </div>
          <div className="md:border-l-[1px] border-[#E2E2E2] lg:pl-[40px] md:pl-[16px] md:max-w-[330px] w-full mb-[20px] md:mb-[0]">
            <span className="text-[#141414] lg:text-[64px] md:text-[40px] text-[25px] font-normal leading-7 md:leading-[64px]">
              {avgApr}
            </span>
            <p className="text-[#141414] text-[16px] font-normal leading-7">
              average APR since launch
            </p>
          </div>
          <div className="md:border-l-[1px] border-[#E2E2E2] lg:pl-[40px] md:pl-[16px] md:max-w-[330px] w-full ">
            <span className="text-[#141414] lg:text-[64px] md:text-[40px] text-[25px] font-normal leading-7 md:leading-[64px]">
              {avgLoanSize}
            </span>
            <p className="text-[#141414] text-[16px] font-normal leading-7">
              Average loan size
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RockoStats
