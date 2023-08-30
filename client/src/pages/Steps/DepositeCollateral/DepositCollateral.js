
const DepositeCollateral = () => {
    return (
      <main className="container mx-auto px-[15px] py-4 sm:py-6 lg:py-10">
          <h1 className="text-[28px] lg:text-3xl font-medium text-center lg:text-left">
            Depositing Collateral
          </h1>
          <section className="my-6">
            <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-6">
              <p>Estimated time remaining</p>
              <h1 className="text-2xl font-semibold mb-4">15 Minutes</h1>
              <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
                <p>Collateral Received</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99935 2.75033C5.52409 2.75033 2.74935 5.52506 2.74935 9.00033C2.74935 12.4756 5.52409 15.2503 8.99935 15.2503C12.4746 15.2503 15.2493 12.4756 15.2493 9.00033C15.2493 5.52506 12.4746 2.75033 8.99935 2.75033ZM0.666016 9.00033C0.666016 4.39795 4.39698 0.666992 8.99935 0.666992C13.6017 0.666992 17.3327 4.39795 17.3327 9.00033C17.3327 13.6027 13.6017 17.3337 8.99935 17.3337C4.39698 17.3337 0.666016 13.6027 0.666016 9.00033Z"
                    fill="#CBCBCB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.25 9.00033C15.25 5.54855 12.4518 2.75033 9 2.75033V0.666992C13.6024 0.666992 17.3333 4.39795 17.3333 9.00033H15.25Z"
                    fill="#276EF1"
                  />
                </svg>
              </div>
              <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
                <p className="text-gray-400">
                  Collateral Deposited in Lending Protocol
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-[395px]:w-[20px] max-[395px]:h-[20px]"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99935 2.75033C5.52409 2.75033 2.74935 5.52506 2.74935 9.00033C2.74935 12.4756 5.52409 15.2503 8.99935 15.2503C12.4746 15.2503 15.2493 12.4756 15.2493 9.00033C15.2493 5.52506 12.4746 2.75033 8.99935 2.75033ZM0.666016 9.00033C0.666016 4.39795 4.39698 0.666992 8.99935 0.666992C13.6017 0.666992 17.3327 4.39795 17.3327 9.00033C17.3327 13.6027 13.6017 17.3337 8.99935 17.3337C4.39698 17.3337 0.666016 13.6027 0.666016 9.00033Z"
                    fill="#CBCBCB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.25 9.00033C15.25 5.54855 12.4518 2.75033 9 2.75033V0.666992C13.6024 0.666992 17.3333 4.39795 17.3333 9.00033H15.25Z"
                    fill=""
                  />
                </svg>
              </div>
              <div className="px-4 py-6 rounded-lg bg-[#F9F9F9] flex justify-between items-center mb-3">
                <p className="text-gray-400">Loan Delivered to Your Account</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99935 2.75033C5.52409 2.75033 2.74935 5.52506 2.74935 9.00033C2.74935 12.4756 5.52409 15.2503 8.99935 15.2503C12.4746 15.2503 15.2493 12.4756 15.2493 9.00033C15.2493 5.52506 12.4746 2.75033 8.99935 2.75033ZM0.666016 9.00033C0.666016 4.39795 4.39698 0.666992 8.99935 0.666992C13.6017 0.666992 17.3327 4.39795 17.3327 9.00033C17.3327 13.6027 13.6017 17.3337 8.99935 17.3337C4.39698 17.3337 0.666016 13.6027 0.666016 9.00033Z"
                    fill="#CBCBCB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.25 9.00033C15.25 5.54855 12.4518 2.75033 9 2.75033V0.666992C13.6024 0.666992 17.3333 4.39795 17.3333 9.00033H15.25Z"
                    fill=""
                  />
                </svg>
              </div>
            </div>
          </section>
      </main>
    )
  }
  
  export default DepositeCollateral