import React, { useState } from 'react'
import EmailIcon from '../../../../assets/svg-icons/email.svg'
import ClosePlusIcon from '../../../../assets/svg-icons/plusicon.svg'
import PhoneIcon from '../../../../assets/svg-icons/phone.svg'
import StepBtn from './StepBtn'
import PictureCard from '../PictureCard'
import SelectInput from '../../../SelectInput'
import Input from '../../../Input'

function CollateralAssets() {
  const [tabIndex, setTabIndex] = useState(1)

  const collateralBufferOptions = [{ value: 'Below', label: 'Below' }]
  const alertFrequencyOptions = [{ value: 'Below', label: 'Hour(s)' }]

  return (
    <section className="lg:py-[80px] py-[50px] border-b border-[#E2E2E2] bg-[#FCFCFC]">
      <div className="container mx-auto px-4">
        <div className="lg:mb-[80px] mb-[50px]">
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
                  <ClosePlusIcon height={24} width={24} />
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
                    className="rounded border-[#141414] text-[#141414] h-[24px] w-[24px] accent-[#323232] focus:accent-[#323232]"
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
                    className="rounded border-[#141414] text-[#141414] h-[24px] w-[24px] accent-[#323232] focus:accent-[#323232] "
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
                <div className="flex justify-between items-center gap-x-[8px] gap-y-[16px] mb-[16px] md:mb-[24px] flex-wrap md:!flex-nowrap relative">
                  <SelectInput
                    options={collateralBufferOptions}
                    onSelect={() => {}}
                    value=""
                    label="Collateral buffer is"
                  />
                  <Input
                    label="Percent"
                    type="text"
                    className="!py-[15px] !px-[16px] !text-[16px]"
                  />
                  <span className="text-[#B3B3B3] text-[16px] absolute right-[16px] md:top-[44px] bottom-[16px]">
                    %
                  </span>
                </div>
                <h4 className="text-[#141414] text-[16px] font-semibold mb-[16px]">
                  Alert Frequencey
                </h4>
                <div className="flex justify-between items-end gap-x-[8px]  gap-y-[16px] flex-wrap md:!flex-nowrap">
                  <Input
                    label="Repeat every"
                    type="text"
                    className="!py-[15px] !px-[16px] !text-[16px]"
                  />
                  <SelectInput
                    options={alertFrequencyOptions}
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
