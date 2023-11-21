import { ReactNode } from 'react';

function ModalContent({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 bg-white max-w-[496px] w-full rounded-[20px] flex flex-col gap-8">
      {' '}
      {children}
    </div>
  );
}

export default ModalContent;
