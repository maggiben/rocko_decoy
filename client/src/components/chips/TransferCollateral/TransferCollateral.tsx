import Image from 'next/image';
import QRCode from 'react-qr-code';
import StatusWarning from '@/assets/StatusWarning.svg';
import contentCopy from '@/assets/content_copy.svg';
import { useState } from 'react';
import closeIcon from '@/assets/Close.svg';
import ModalContent from '../ModalContent/ModalContent';
import ModalContainer from '../ModalContainer/ModalContainer';
import Warning from '../Warning/Warning';

type Props = {
  lowAmount: boolean;
  onOk: () => void;
  onCancel: () => void;
};

function TransferCollateral(props: Props) {
  const { lowAmount, onCancel, onOk } = props;
  const [warning, setWarning] = useState(false);

  if (warning) {
    return (
      <ModalContainer>
        <Warning
          goBack={() => setWarning(false)}
          proceedAnyway={() => {
            onOk();
          }}
        />
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <ModalContent className="max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-2 ">
          <div className="space-y-2 ">
            <h4 className="text-2xl font-semibold font-inter">
              Transfer Collateral
            </h4>
            <p className="text-sm text-[#141414] font-inter ">
              Please send the Amount Required to your Rocko wallet. Your loan
              will not be fulfilled until this amount is received.
            </p>
          </div>
          <div className="">
            <button
              onClick={onCancel}
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
        {lowAmount && (
          <div className=" p-4 rounded-[10px] bg-[#F7B13329] flex  items-start  justify-start gap-2 ">
            <Image src={StatusWarning} width={24} height={24} alt="warning" />
            <div>
              <p className="text-[16px] font-inter text-[#010304]">
                Amount received is less than the amount required to transfer.
              </p>
              <p className="text-[14px] font-inter text-[#010304]">
                Less than the Amount Required has been received by your Rocko
                wallet. Continuing could result in the transaction failing or
                receiving a loan with a smaller collateral buffer than intended.
              </p>
            </div>
          </div>
        )}
        <div className="border-2 rounded-2xl p-3 lg:p-6">
          {lowAmount && (
            <div className="border-b-2 py-[16px] flex justify-between items-center">
              <div>
                <p className="font-normal	text-blackSecondary text-[14px]">
                  Amount Received
                </p>
                <p className="font-normal	text-blackPrimary text-[16px]">
                  0 ETH
                </p>
              </div>
              <div className="flex items-center gap-x-[4px] bg-[#F7B13329] rounded-[5px] py-[3px] ps-[4px] pe-[8px] cursor-pointer">
                <Image
                  src={StatusWarning}
                  alt="contentCopy"
                  className="cursor-pointer"
                />
                <p className="text-[#141414] text-[12px] font-medium leading-4">
                  Less than amount required
                </p>
              </div>
            </div>
          )}

          <div className="border-b-2 py-[16px]">
            <p className="font-normal	text-blackSecondary text-[14px]">
              Amount Required{' '}
            </p>
            <p className="font-normal	text-blackPrimary text-[16px]">
              14.7341 ETH
            </p>
          </div>
          <div className=" flex items-center flex-col py-[16px]">
            <QRCode value="hello" size={200} />
            <p className="text-blackSecondary text-[14px] text-center mt-[12px]">
              Scan within your exchange mobile app
            </p>
          </div>
          <div className="flex justify-between items-center pt-[16px] border-t-2">
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
        </div>
        {/* continue button */}
        <div className="flex gap-x-[12px]  items-center">
          <button
            onClick={lowAmount ? onCancel : onOk}
            className="py-[10px] px-6 rounded-full text-sm font-semibold bg-[#2C3B8D] text-white"
          >
            {lowAmount ? 'Go back and add collateral' : 'Continue'}
          </button>
          {lowAmount && (
            <button
              onClick={() => setWarning(true)}
              className="py-[10px] px-6 rounded-full text-sm font-semibold bg-[#EEEEEE] text-[#2C3B8D]"
            >
              Proceed anyway
            </button>
          )}
        </div>
      </ModalContent>
    </ModalContainer>
  );
}

export default TransferCollateral;
