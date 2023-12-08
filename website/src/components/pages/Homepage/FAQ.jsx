import React, { useState } from 'react'

import { Collapse } from 'react-collapse'
import { Link } from 'gatsby'
import MinusIcon from '../../../assets/svg-icons/minus.svg'
import PlusIcon from '../../../assets/svg-icons/plus.svg'

function FAQ(props) {
  const { items = [] } = props

  const [active, setActive] = useState({})

  const handleClick = id => {
    setActive({
      ...active,
      [id]: !active[id],
    })
  }

  return (
    <section className="bg-[#F9F9F9] lg:py-[80px] py-[50px] mt-4">
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
            className="border-b-[1px] border-[#E2E2E2] py-[24px] cursor-pointer"
            onClick={() => handleClick(id)}
          >
            <div className="flex justify-between items-center relative bg-[#F9F9F9]">
              <h4 className="text-[#141414] w-4/5 text-[16px] sm:text-[20px] font-normal leading-7">
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
                <p className="text-[#545454] text-[16px] pt-[16px] leading-6 font-normal">
                  {React.createElement(answer)}{' '}
                </p>
              </Collapse>
            </div>
          </div>
        ))}
        <div className="text-[18px] font-400 leading-6 mt-[4px]">
          See more frequently asked questions{' '}
          <Link
            to="https://rocko.co/why-defi"
            className="text-[#006AFF] underline-offset-4"
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
