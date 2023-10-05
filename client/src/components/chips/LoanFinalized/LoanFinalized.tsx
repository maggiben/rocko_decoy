import ModalContent from "../ModalContent/ModalContent"
import Link from "next/link";
import frameIcon from "@/assets/frame.svg";
import Image from "next/image";
import { IS_DEMO_MODE } from "@/constants/env";

const LoanFinalized = ({setOpenModalFor}:{setOpenModalFor:Function}) => {
  return (
    <ModalContent>
        <div className="w-16 h-16 rounded-full bg-[#EFF3FE] p-4">
          <Image
            src={frameIcon}
            alt=""
            width={34}
            height={27}
            className="w-full"
          />
      </div>
      <div className="space-y-2 ">
        <h4 className="text-2xl font-semibold font-inter">
        Loan Finalized!
        </h4>
        <p className="text-sm text-[#141414] font-inter ">
        You can track the status on the next page.
        </p>
      </div>
      
    {/* continue button */}
    <div className="my-6">
      {/* <Link href={IS_DEMO_MODE ? '/deposit-collateral' : '/depositing-collateral'} className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white"> */}
      <Link href={'/deposit-collateral'} className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white">
        Continue
      </Link>
    </div>
  </ModalContent>
  )
}

export default LoanFinalized