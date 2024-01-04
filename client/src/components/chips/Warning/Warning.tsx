import Image from 'next/image';
import QRCode from 'react-qr-code';
import contentCopy from '@/assets/content_copy.svg';
import ModalContent from '../ModalContent/ModalContent';

type Props = { goBack: () => void; proceedAnyway: () => void };

function Warning(props: Props) {
  const { goBack, proceedAnyway } = props;
  return (
    <ModalContent className="max-h-[90vh] overflow-y-auto">
      <div className="flex items-start justify-between gap-2 ">
        <div className="space-y-2 ">
          <h4 className="text-2xl font-semibold font-inter">Warning </h4>
          <p className="text-sm text-[#141414] font-inter ">
            Less than the Amount Required has been received by your Rocko
            wallet. Continuing could result in the transaction failing or
            receiving a loan with a smaller collateral buffer than intended.
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-normal	text-blackSecondary text-[14px]">
              Amount Received
            </p>
            <p className="font-normal	text-blackPrimary text-[16px]">
              10.8278 ETH
            </p>
          </div>
        </div>
        <div className="py-[5px]">
          <p className="font-normal	text-blackSecondary text-[14px]">
            Amount Required
          </p>
          <p className="font-normal	text-blackPrimary text-[16px]">
            14.7341 ETH
          </p>
        </div>
        <div className="flex justify-between items-center pt-[5px]">
          <div>
            <p className="font-normal	text-blackSecondary text-[14px]">
              Address
            </p>
            <p className="font-normal	text-blackPrimary text-[16px] text-wrap">
              0xC02aaA39b223FE8D0A0e5C4F27eAD908
              <br />
              3C756Cc2
            </p>
          </div>
          <Image
            src={contentCopy}
            alt="contentCopy"
            className="cursor-pointer"
          />
        </div>
        <div className=" flex   flex-col py-[5px]">
          <QRCode value="hello" size={100} />
          <p className="text-blackSecondary text-[14px]   mt-[12px]">
            Scan within your exchange mobile app
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        <button
          onClick={goBack}
          className="py-[10px] px-6 rounded-full text-sm font-semibold bg-[#2C3B8D] text-white"
        >
          Go back and add collateral
        </button>
        <button
          onClick={proceedAnyway}
          className="text-[#141414] font-normal underline-offset-1 underline text-[12px] mt-[8px] w-full text-center p-0 m-0 outline-0 border-0"
        >
          Proceed anyway
        </button>
      </div>
    </ModalContent>
  );
}

export default Warning;
