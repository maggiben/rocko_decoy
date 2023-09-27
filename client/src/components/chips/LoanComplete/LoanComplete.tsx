import ModalContent from "../ModalContent/ModalContent";
import frameIcon from "@/assets/frame.svg";
import Image from "next/image";
import Link from "next/link";

const LoanComplete = () => {
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
    Loan Complete
    </h4>
    <p className="text-sm text-[#141414] font-inter ">
    Your loan has been fulfilled and you can access your funds in the exchange account or wallet address provided. 
    </p>
  </div>
  
{/* continue button */}
<div className="my-6">
  <Link href={'/manage'} className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white">
    Okay
  </Link>
</div>
</ModalContent>
  )
}

export default LoanComplete