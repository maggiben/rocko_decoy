/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import closeIcon from '@/assets/Close.svg';
import ModalContent from '../ModalContent/ModalContent';

function AlreadyOpenModal({
  setOpenModalFor,
  loanId,
}: {
  setOpenModalFor: Function;
  loanId: number;
}) {
  const router = useRouter();

  const onClickBorrowMore = () => {
    setOpenModalFor('');
    router.push(`/loan-dashboard/${loanId}?active=true&borrow-more=true`);
  };

  const onReturn = () => {
    setOpenModalFor('');
    router.push(`/loan-dashboard/${loanId}?active=true`);
  };

  return (
    <ModalContent>
      <div className="flex items-start justify-between gap-2 ">
        <h4 className="text-2xl font-semibold font-inter">
          You already have an open loan
        </h4>
        {/* close button start */}
        <div>
          <button
            type="button"
            onClick={() => setOpenModalFor('')}
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
      {/* select option */}
      <div className="space-y-3">
        <p className="font-normal text-[#141414]">
          You can borrow more through your loan dashboard or by using the
          &#34;Borrow more&#34; button below.
        </p>
      </div>
      {/* continue button */}
      <div className="flex gap-x-3">
        <button
          type="button"
          onClick={onClickBorrowMore}
          className="py-[10px] px-6 rounded-3xl text-white font-semibold bg-[#2C3B8D]"
        >
          Borrow more
        </button>
        <button
          type="button"
          onClick={onReturn}
          className="py-[10px] px-6 rounded-3xl text-[#2C3B8D] bg-[#EEEEEE] font-semibold"
        >
          Return to loan dashboard
        </button>
      </div>
    </ModalContent>
  );
}

export default AlreadyOpenModal;
