import { ReactNode } from "react";

const ModalContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-6 bg-white max-w-[496px] w-full max-[350px]:h-[98vh] rounded-[20px] flex flex-col gap-5 mx-8 md:mx-0 overflow-scroll sm:overflow-hidden">
      {children}
    </div>
  );
};

export default ModalContent;
