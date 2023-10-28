import ModalContent from "@/components/shared/modalContainer/modalContent/modalContent";
import closeIcon from "@/assets/Close.svg";
import Image from "next/image";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdCall } from "react-icons/io";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import SelectOptionOne from "../collateralBufferAlerts/selectOption/SelectOptionOne";
import { useState } from "react";
import { BufferAlertType } from "@/types/type";
import SelectOptionTwo from "../collateralBufferAlerts/selectOption/SelectOptionTwo";

const ArifTestModal = ({
  setOpenModalFor,
  title,
}: {
  setOpenModalFor: Function;
  title: string;
}) => {
  const [collateralBufferAlert, setCollateralBufferAlert] =
    useState<BufferAlertType>({
      alertMethods: {
        email: "",
        sms: "",
      },
      currentCollateralBuffer: {
        position: "",
        percentage: undefined,
      },
      frequency: {
        repeat: 0,
        interval: "",
      },
    });
  const [repeatValue, setRepeatValue] = useState<string | number>("");
  const [percentValue, setPercentValue] = useState<string | number>("");

  const handleCollateralForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* const email = e.target.email.checked;
    const call = e.target.call.checked; */
  };
  const handleKey = (
    event: React.KeyboardEvent<HTMLInputElement>,
    type?: string
  ) => {
    const keyPressed = event.key;
    const isDecimalDigit = /^\d+$/.test(keyPressed);
    const isAllowedHexChar = /^[a-eA-E]+$/.test(keyPressed);

    if (
      ((type === "repeat" ? !isDecimalDigit : null) &&
        !(event.key === "Backspace")) ||
      isAllowedHexChar
    ) {
      event.preventDefault();
    }
    if (event.key === "-") {
      event.preventDefault();
    }
  };
  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type?: string
  ) => {
    const value = parseFloat(e.target.value);
    if (value < 0) {
      type === "repeat" ? setRepeatValue(0) : setPercentValue(0);
    } else if (value > 100) {
      type === "repeat" ? setRepeatValue(100) : setPercentValue(100);
    } else {
      type === "repeat" ? setRepeatValue(value) : setPercentValue(value);
    }
  };
  return (
    <ModalContent>
      {/* //!header-buttons */}
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-[#EEE] cursor-pointer p-2 w-fit">
          <BiLeftArrowAlt className="h-[18px] w-[18px] text-[#323232]" />
        </div>
        <div>
          <button
            onClick={() => setOpenModalFor("")}
            className="w-8 h-8 rounded-full p-2 bg-[#EEE] block"
          >
            <Image
              src={closeIcon}
              alt=""
              width={16}
              height={16}
              className="w-full"
            />
          </button>
        </div>
      </div>
      <h4 className="text-2xl font-semibold font-inter">{title}</h4>
      {/* //!form */}
      <form onSubmit={handleCollateralForm}>
        <div className="max-h-[50vh] overflow-auto mb-4 alert-container">
          <p className="font-semibold mb-4">Select alert method(s)</p>
          {/* //!Alert-type */}
          <div className="p-4 form-border rounded-2xl h-full mb-6">
            <div className="flex items-center gap-x-3">
              <div className="rounded-full bg-[#EEE] p-2 w-max">
                <AiOutlineMail className="h-5 w-5 text-[#323232]" />
              </div>
              <label htmlFor="email" className="grow">
                email@rocko.com
              </label>
              <input
                type="checkbox"
                name="email"
                id="email"
                className="checkbox"
              />
            </div>
            <hr className="my-4" />
            <div className="flex items-center gap-x-3">
              <div className="rounded-full bg-[#EEE] p-2 w-max">
                <IoMdCall className="h-5 w-5 text-[#323232]" />
              </div>
              <label htmlFor="call" className="grow">
                555.555.5555
              </label>
              <input
                type="checkbox"
                name="call"
                id="call"
                className="checkbox"
              />
            </div>
          </div>
          {/* //!Alert when */}
          <p className="font-semibold mb-4">Alert when</p>
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-2 mb-6">
            <div className="w-full">
              <p className="text-sm font-[500] mb-2">Collateral buffer is</p>
              <SelectOptionOne
                setCollateralBufferAlert={setCollateralBufferAlert}
              />
            </div>
            <div className="w-full">
              <label htmlFor="percent" className="text-sm font-[500] block">
                Percent
              </label>
              <div className="mt-2 relative">
                <input
                  type="number"
                  name="percent"
                  id="percent"
                  className="number-input w-full form-border focus:outline-none px-4 py-[15px] rounded-xl text-sm"
                  onKeyDown={(e) => handleKey(e, "percent")}
                  onInput={(e) =>
                    handleNumberInput(
                      e as React.ChangeEvent<HTMLInputElement>,
                      "percent"
                    )
                  }
                  value={percentValue}
                />
                <span
                  className={`text-gray-400 absolute right-4 text-lg top-3`}
                >
                  %
                </span>
              </div>
            </div>
          </div>
          {/* //!Alert Frequencey */}
          <p className="font-semibold mb-4">Alert Frequencey</p>
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-2 mb-6">
            <div className="w-full">
              <label htmlFor="repeat" className="text-sm font-[500] block">
                Repeat every
              </label>
              <input
                type="number"
                name="repeat"
                id="repeat"
                className="number-input w-full form-border focus:outline-none px-4 py-[15px] rounded-xl text-sm mt-2"
                onKeyDown={(e) => handleKey(e, "repeat")}
                onInput={(e) =>
                  handleNumberInput(
                    e as React.ChangeEvent<HTMLInputElement>,
                    "repeat"
                  )
                }
                value={repeatValue}
              />
            </div>
            <div className="w-full md:self-end">
              <SelectOptionTwo
                setCollateralBufferAlert={setCollateralBufferAlert}
              />
            </div>
          </div>
          <div className="bg-[#F9F9F9] rounded-2xl p-4 mb-2">
            <p className="text-sm">
              Your email and phone number can be updated via your profile page
              which is located in the top right corner
            </p>
          </div>
        </div>
        {/* //!buttons */}
        <div className="flex gap-x-3">
          <button
            type="submit"
            className={`py-[10px] px-6 rounded-3xl bg-[#2C3B8D] text-white font-semibold`}
          >
            Save
          </button>
          <button
            className={`py-[10px] px-6 rounded-3xl text-[#2C3B8D] bg-[#EEEEEE] font-semibold`}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalContent>
  );
};

export default ArifTestModal;
