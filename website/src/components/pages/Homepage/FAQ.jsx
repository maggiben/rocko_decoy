import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { Collapse } from 'react-collapse'
import clsx from 'clsx'
import MinusIcon from '../../../assets/svg-icons/minus.svg'
import PlusIcon from '../../../assets/svg-icons/plus.svg'

function FAQ(props) {
  const { className, items = [] } = props

  const [active, setActive] = useState({})

  const handleClick = id => {
    setActive({
      ...active,
      [id]: !active[id],
    })
  }

  useEffect(() => {
    document.title = 'FAQ for Rocko: Crypto-Backed Loans at Competitive Rates'
  }, [])

  return (
    <section className={clsx(className, 'bg-[#F9F9F9] lg:py-[80px] py-[50px]')}>
      <div className="mx-auto container">
        <h2 className="tracking-normal text-[#141414] lg:text-[48px] md:text-[35px] text-[22px] lg:max-w-[426px] mb-[40px]">
          Frequently Asked Questions
        </h2>
        {items.map(({ id, ques, answer }) => (
          <div
            key={id}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
            className="border-b-[1px] border-[#E2E2E2] lg:py-[24px] py-[16px] cursor-pointer"
            onClick={() => handleClick(id)}
          >
            <div className="flex justify-between items-center relative bg-[#F9F9F9] faq">
              <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal leading-7 lg:max-w-[775px]">
                {ques}
              </h4>
              <div
                className="cursor-pointer"
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
              >
                {active[id] ? (
                  <MinusIcon height={24} width={24} />
                ) : (
                  <PlusIcon />
                )}
              </div>
            </div>
            <div>
              <Collapse
                isOpened={active[id]}
                className={active === 'transition duration-500 '}
                style={{ transition: 'all 0.5s ease 0s' }}
              >
                <p className="text-[#545454] text-[16px] pt-[16px] leading-6 font-normal lg:max-w-[775px] ">
                  {React.createElement(answer)}{' '}
                </p>
              </Collapse>
            </div>
          </div>
        ))}
        <div className="text-[18px] font-400 leading-6 mt-[4px] text-[#545454] see-more">
          See more frequently asked questions
          <Link
            to="/faq"
            className="!text-[#2C3B8D] hover:!text-[#2C3B8D] underline decoration-1 hover:decoration-1 hover:underline ml-[3px]"
          >
            here
          </Link>
          .
        </div>
      </div>
    </section>
  )
}

export default FAQ
