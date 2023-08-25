import { FC, useState } from "react";
import { ProtocolStep } from "@/types/type";
import FilterOptions from "@/components/filterOptions/filterOptions";
import SortOptions from "@/components/sortOptions/sortOptions";
import Protocol from "@/components/protocolinfo/protocolinfo";
import useLoanData from "@/hooks/useLoanData";

type FilterOptionsProps = string;

const StepThree: FC<ProtocolStep> = ({ title, protocols }) => {
  const { loanData, setLoanData } = useLoanData();
  const [selectProtocol, setSelectProtocol] = useState("");
  const [sortOption, setSortOption] = useState("APR (lowest)");
  const [filterOptions, setFilterOptions] = useState<FilterOptionsProps[]>([]);

  const handleProtocol = (name: string) => {
    setSelectProtocol(name);
    if (setLoanData) {
      setLoanData((prevLoanData) => ({
        ...prevLoanData,
        activeNextButton: true,
      }));
    }
  };
  const handleFilterOption = (name: string, isChecked: boolean) => {
    const index = filterOptions.indexOf(name);

    if (index === -1) {
      setFilterOptions([...filterOptions, name]);
    } else {
      setFilterOptions(filterOptions.filter((item) => item !== name));
    }
  };

  return (
    <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
      {/* title start  */}
      <div className="flex items-center justify-between flex-wrap gap-6">
        <h1 className="text-2xl lg:text-3xl text-blackPrimary lg:text-start text-center">
          Customize Your Loan
        </h1>
        <div className="flex items-center justify-start max-[368px]:gap-1 min-[368px]:gap-4">
          {/* filter btn */}
          <div className="py-2 md:py-[10px] px-4 flex items-center justify-start gap-2 bg-[#EEE] rounded-full relative group">
            <p className="text-[#2C3B8D] font-medium max-[355px]:text-sm ">
              Filter
            </p>
            {filterOptions.length > 0 && (
              <p className="w-5 h-5 text-sm flex items-center justify-center rounded-full bg-blue text-white">
                {filterOptions.length}
              </p>
            )}

            {/* filter options */}
            <FilterOptions handleFilterOption={handleFilterOption} />
          </div>
          {/* sort btn */}
          <div className="py-2 md:py-[10px] px-4 flex items-center justify-start gap-2 bg-[#EEE] rounded-full relative group min-w-[150px]">
            <p className="text-[#2C3B8D] font-medium max-[355px]:text-sm ">
              Sort by: {sortOption}
            </p>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0001 11.3215L14.4108 6.91076L15.5894 8.08927L10.0001 13.6785L4.41084 8.08927L5.58936 6.91076L10.0001 11.3215Z"
                  fill="#2C3B8D"
                />
              </svg>
            </div>

            {/* sort options */}
            <SortOptions
              setSortOption={setSortOption}
              sortOption={sortOption}
            />
          </div>
        </div>
      </div>
      {/* title end  */}

      {/* Choose section  */}
      <section className="flex gap-4 lg:gap-10 my-6 flex-col sm:flex-row ">
        <div className="w-full">
          <div className="p-6 border border-whiteSecondary rounded-2xl">
            <p className=" text-xl font-medium  text-blackPrimary lg:text-start text-center">
              {title}
            </p>
            <div className="divide-y-2 divide-[#E2E2E2]">
              {protocols?.map((protocol) => (
                <Protocol
                  key={protocol.id}
                  interestRate={protocol.interestRate}
                  name={protocol.name}
                  protocolInfos={protocol.protocolInfos}
                  symbol={protocol.symbol}
                  id={protocol.id}
                  handleProtocol={handleProtocol}
                  selectProtocol={selectProtocol}
                />
              ))}
            </div>
          </div>
        </div>
        {/* <div className="p-6 border border-[#E2E2E2] flex-1 rounded-2xl">
          <LoanSummary />
        </div> */}
      </section>
    </main>
  );
};

export default StepThree;
