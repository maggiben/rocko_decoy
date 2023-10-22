"use client";
import { FC, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import ModalContainer from "@/components/shared/modalContainer/modalContainer";
import ModalContent from "@/components/shared/modalContainer/modalContent/modalContent";
import Image from "next/image";
import closeIcon from "@/assets/Close.svg";

interface Props {
  toggleAlert: boolean;
  setToggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
}
const ToggleBTN: FC<Props> = ({
  toggleAlert,
  setToggleAlert,
  description,
  title,
}) => {
  const [openModalFor, setOpenModalFor] = useState("");

  useEffect(() => {
    if (!toggleAlert) {
      setOpenModalFor(title);
    }
  }, [toggleAlert, title]);

  return (
    <div className="md:mt-1">
      <Switch
        checked={toggleAlert}
        onChange={setToggleAlert}
        className={`${toggleAlert ? "bg-black" : "bg-gray-300"}
          relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${toggleAlert ? "translate-x-[20px]" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>

      {openModalFor && (
        <>
          <ModalContainer>
            <ModalContent>
              <div className="">
                {/* title and close button */}
                <div className="flex items-start justify-between gap-2 ">
                  <h4 className="text-2xl font-semibold font-inter">
                    {openModalFor}
                  </h4>
                  {/* close button start */}
                  <div>
                    <button
                      onClick={() =>{
                        // console.log(openModalFor)
                        setToggleAlert(!!openModalFor)
                        setOpenModalFor("")
                      }}
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
                  {/* close button end */}
                </div>
                {/* title and close button end */}
                <p className="text-sm text-blackPrimary mt-2">{description}</p>

                {/* buttons */}
                <div className="flex items-center mt-12 gap-3">
                  <button
                    onClick={() => {
                      setOpenModalFor("");
                      setToggleAlert(false);
                    }}
                    className={`py-[10px] px-6  rounded-full text-sm font-semibold bg-[#2C3B8D] text-white
          `}
                  >
                    Turn Off Alerts
                  </button>
                  <button
                    onClick={() => {
                      setOpenModalFor("");
                      setToggleAlert(true);
                    }}
                    className="text-sm bg-[#EEE] text-[#2C3B8D] rounded-full px-7 py-3  font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </ModalContent>
          </ModalContainer>
        </>
      )}
    </div>
  );
};

export default ToggleBTN;
