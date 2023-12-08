import React, { useEffect, useRef, useState } from 'react'
import EmailIcon from '../../../../assets/svg-icons/email.svg'
import PhoneIcon from '../../../../assets/svg-icons/phone.svg'
import StepBtn from './StepBtn'
import PictureCard from '../PictureCard'
import SelectInput from '../../../SelectInput'
import Input from '../../../Input'

function CollateralAssets() {
  const [tabIndex, setTabIndex] = useState(1)

  const CollateralBufferOptions = [{ value: 'Below', label: 'Below' }]
  const containerRef = useRef(null)

  const handleActiveTab = (ratio = 0.4, isIntersecting = false) => {
    const activeTab = (() => {
      if (ratio <= 0.8 && ratio >= 0.1) return 2
      if (isIntersecting) return 1
      return 3
    })()
    setTabIndex(activeTab)
  }

  const autoScrollTabs = () =>
    setInterval(() => {
      setTabIndex(index => {
        if (index === 3) return 1
        return index + 1
      })
    }, 2000)

  useEffect(() => {
    let timer = autoScrollTabs()
    if (!containerRef.current) {
      return () => {}
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer)
        timer = autoScrollTabs()
        handleActiveTab(entry.intersectionRatio, entry.isIntersecting)
      },
      { threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    )
    observer.observe(containerRef.current)

    return () => {
      clearInterval(timer)
      observer.unobserve(containerRef.current)
    }
  }, [containerRef])

  return (
    <section className="lg:py-[80px] py-[50px] border-b border-[#E2E2E2] bg-[#FCFCFC]">
      <div className="container mx-auto px-4">
        <div className="lg:mb-[80px] mb-[50px]" ref={containerRef}>
          <h2 className="tracking-normal text-[#141414] lg:text-[48px] md:text-[35px] text-[22px] lg:max-w-[891px] mb-[48px]">
            Set up text and email alerts to help manage your loan and collateral
            assets
          </h2>
        </div>
        <div className="flex justify-between items-center lg:flex-nowrap flex-wrap gap-8 lg:gap-0">
          <div className="flex flex-col gap-8">
            <div>
              <StepBtn
                title="Set up alerts"
                subTitle="Set up alerts to monitor your collateral assets and interest rate."
                tab={1}
                active={tabIndex === 1}
                onPress={setTabIndex}
              />
            </div>
            <div>
              <StepBtn
                title="Choose alert type"
                subTitle="Receive alerts by text, email, or both."
                tab={2}
                active={tabIndex === 2}
                onPress={setTabIndex}
              />
            </div>
            <div>
              <StepBtn
                title="Set alert parameters"
                subTitle="Choose how often to receive them and set up multiple at different levels"
                tab={3}
                active={tabIndex === 3}
                onPress={setTabIndex}
              />
            </div>
          </div>
          {tabIndex === 1 && (
            <PictureCard
              noPadding
              className="flex justify-center items-center h-[500px]"
            >
              <div className="h-[84px] flex items-center gap-[12px] p-[12px] bg-white rounded-[16px] w-full mt-[121px] mb-[143px] mx-4 sm:mx-12">
                <div className="p-[8px] w-[40px] h-[40px] bg-[#EEE] rounded-full flex justify-center items-center">
                  <EmailIcon height={24} width={24} />
                </div>
                <div className="text-[#010304] text-[16px] font-medium">
                  Create new alert
                </div>
              </div>
            </PictureCard>
          )}
          {tabIndex === 2 && (
            <PictureCard
              noPadding
              className="flex justify-center items-center h-[500px]"
            >
              <div className="w-full bg-white rounded-[16px] mt-[91px] mb-[107px] mx-4 sm:mx-12">
                <div className="flex justify-between items-center py-[20px] mx-[16px] border-b-[1px]">
                  <div className="text-[#141414] text-[16px] gap-x-[12px] flex items-center">
                    <EmailIcon />
                    email@rocko.com
                  </div>
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    className="rounded border-[#141414] text-[#141414] h-[24px] w-[24px] focus:ring-[#141414]"
                  />
                </div>
                <div className="flex justify-between items-center py-[20px] mx-[16px]">
                  <div className="text-[#141414] text-[16px] gap-x-[12px] flex items-center">
                    <PhoneIcon />
                    555.555.5555
                  </div>
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    className=" rounded border-gray-[#141414] text-[#141414] h-[24px] w-[24px]  focus:ring-[#141414] appearance indeterminate:bg-[#141414] "
                  />
                </div>
              </div>
            </PictureCard>
          )}
          {tabIndex === 3 && (
            <PictureCard
              noPadding
              className="flex justify-center items-center h-[500px]"
            >
              <form
                action=""
                className="bg-white p-[24px] rounded-[20px] w-full m-6"
              >
                <h4 className="text-[#141414] text-[16px] font-semibold mb-[16px]">
                  Alert when
                </h4>
                <div className="flex justify-between items-center gap-x-[8px] gap-y-[16px] mb-[16px] md:mb-[24px] flex-wrap sm:flex-nowrap">
                  <SelectInput
                    options={CollateralBufferOptions}
                    onSelect={() => {}}
                    value=""
                    label="Collateral buffer is"
                  />
                  <Input label="Percent" type="number" />
                </div>
                <h4 className="text-[#141414] text-[16px] font-semibold mb-[16px]">
                  Alert Frequencey
                </h4>
                <div className="flex justify-between items-end gap-x-[8px]  gap-y-[16px] flex-wrap sm:flex-nowrap">
                  <Input label="Repeat every" type="number" />
                  <SelectInput
                    options={CollateralBufferOptions}
                    onSelect={() => {}}
                    value=""
                    label=""
                  />
                </div>
              </form>
            </PictureCard>
          )}
        </div>
      </div>
    </section>
  )
}

export default CollateralAssets
