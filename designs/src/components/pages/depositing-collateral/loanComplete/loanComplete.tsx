import ModalContent from "@/components/shared/modalContainer/modalContent/modalContent";
import frameIcon from "@/assets/frame.svg";
import Image from "next/image";
import Link from "next/link";

const LoanComplete = ({
  title,
  details,
  id,
  setHide = (value: boolean) => {},
}: {
  title: string;
  details: string;
  id: number;
  setHide?: (value: boolean) => void;
}) => {
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
        <h4 className="text-2xl font-semibold font-inter">{title}</h4>
        <p className="text-sm text-[#141414] font-inter ">{details}</p>
      </div>

      {/* continue button */}
      <div className="my-6">
        {id === 1 ? (
          <Link href={"/dashboard"}>
            <button className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white">
              okay
            </button>
          </Link>
        ) : (
          <button
            onClick={() => setHide(true)}
            className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white"
          >
            okay
          </button>
        )}
      </div>
    </ModalContent>
  );
};

export default LoanComplete;
