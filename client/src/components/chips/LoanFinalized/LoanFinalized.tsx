import Image from 'next/image';
import frameIcon from '@/assets/frame.svg';
import useLoanData from '@/hooks/useLoanData';
import { useRouter } from 'next/navigation';
import ModalContent from '../ModalContent/ModalContent';

function LoanFinalized({ navType }: { navType: string }) {
  const router = useRouter();
  const { loanData } = useLoanData();

  const onContinue = () => {
    const { sessionStorage } = window;
    if (loanData) sessionStorage.setItem('loanData', JSON.stringify(loanData));

    router.push(`/depositing-collateral?type=${navType}`);
  };

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
        <h4 className="text-2xl font-semibold font-inter">Loan Finalized!</h4>
        <p className="text-sm text-[#141414] font-inter ">
          You can track the status on the next page.
        </p>
      </div>

      {/* continue button */}
      <div className="my-6">
        <button
          onClick={onContinue}
          className="py-[10px] px-6 bg-[#2C3B8D] rounded-full text-sm font-semibold text-white"
        >
          Continue
        </button>
      </div>
    </ModalContent>
  );
}

export default LoanFinalized;
