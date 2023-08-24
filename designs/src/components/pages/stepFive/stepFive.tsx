import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

interface InnerInfo {
  description: string | JSX.Element;
  details?: string | number | JSX.Element;
  subDetails?: string;
}

interface Info {
  description: string | JSX.Element;
  details?: string | number | JSX.Element;
  subDetails?: string;
  subDescription?: InnerInfo[];
}

interface Term {
  rule: JSX.Element;
}

const invoice: Info[] = [
  {
    description: "Lending Protocol",
    details: "Compound Finance",
  },
  {
    description: "Loan Amount",
    details: `${10000} USDC `,
    subDetails: `~$10000.00`,
  },
  {
    description: "Current APR",
    details: 3.84 + "%",
  },
  {
    description: "Amount Required for Loan",
    details: `${14.7341} ETH`,
    subDetails: `$27,647.01`,
    subDescription: [
      {
        description: "Collateral",
        details: `${14.6241} ETH`,
        subDetails: `$27,647.01`,
      },
      {
        description: "Rocko Service Fee",
        details: `${0.11} ETH`,
        subDetails: `$200.00`,
      },
    ],
  },
  {
    description: "Collateral Buffer",
    details: 1.0 + "%",
  },
  {
    description: "Estimated Time to Receive Loan",
    details: "<15 Minutes*",
  },
  {
    description: "Collateral Parameters & Loan Terms",
    subDescription: [
      {
        description: (
          <p className="lg:flex items-center lg:gap-x-1 inline">
            Loan-to-value-ratio <BsExclamationCircle className="inline" />
          </p>
        ),
        details: `${83} %`,
      },
      {
        description: (
          <p className="lg:flex items-center lg:gap-x-1 inline">
            Liquidation Threshold <BsExclamationCircle className="inline" />
          </p>
        ),
        details: `${90} %`,
      },
      {
        description: (
          <p className="lg:flex items-center lg:gap-x-1 inline">
            Liquidation Penalty <BsExclamationCircle className="inline" />
          </p>
        ),
        details: `${5} %`,
      },
      {
        description: (
          <p className="lg:flex items-center lg:gap-x-1 inline">
            Loan Term <BsExclamationCircle className="inline" />
          </p>
        ),
        details: `Open Ended`,
      },
      {
        description: (
          <p className="lg:flex items-center lg:gap-x-1 inline">
            Minimum Monthly Payment <BsExclamationCircle className="inline" />
          </p>
        ),
        details: `None`,
      },
      {
        description: (
          <p className="lg:flex items-center lg:gap-x-1 inline">
            Protocol Rewards <BsExclamationCircle className="inline" />
          </p>
        ),
        details: `${2.01} %`,
      },
    ],
  },
];

const terms: Term[] = [
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm lg:text-base">
        By finalizing your loan request, you will receive a Rocko wallet that
        will help facilitate and manage your loan. Rocko will have no access or
        control over funds inside your wallet
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm lg:text-base">
        You will be asked to authorize a transaction for the loan amount
        required (shown above). If your Rocko wallet does not receive the loan
        amount required, your loan may not be fulfilled.
      </li>
    ),
  },
  {
    rule: (
      <li className="mb-1 ml-3 text-slate-600 text-sm lg:text-base">
        Rocko’s service fee will be taken out of the initial amount transferred
        to your Rocko wallet. More info on Rocko’s service fee can be found
        <a href="" className="underline ml-2">
          here
        </a>
        .
      </li>
    ),
  },
];

const StepFive: React.FC = () => {
  return (
    <main className="pt-20 lg:pt-28 px-4 md:px-6 lg:pl-8">
      <h1 className="text-2xl lg:text-3xl font-semibold">Finalize Your Loan</h1>
      {/* ---------------------- First Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-5">
          <h3 className="text-xl font-medium mb-3">Loan Summary</h3>
          <div className="divide-y-2">
            {invoice.map((info, i) => (
              <React.Fragment key={i}>
                <div className="flex pb-3 pt-2 flex-wrap items-start">
                  <p className="font-medium w-1/2">{info?.description}</p>
                  <div className="pl-1 lg:pl-0 w-1/2">
                    <p>{info?.details}</p>
                    {info?.subDetails && (
                      <p className="w-1/2 text-sm text-gray-500">
                        {info?.subDetails}
                      </p>
                    )}
                  </div>
                  {info?.subDescription &&
                    info?.subDescription.map((innerInfo, i) => (
                      <React.Fragment key={i}>
                        <div className="w-1/2 pl-1 lg:pl-6 pt-2">
                          {innerInfo?.description}
                        </div>
                        <div className="pt-2 lg:pt-0 pl-1 lg:pl-0">
                          <p>{innerInfo?.details}</p>
                          {innerInfo?.subDetails && (
                            <p className="w-1/2 text-sm text-gray-500">
                              {innerInfo?.subDetails}
                            </p>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="mt-2 p-5 bg-gray-100 rounded-2xl">
            <p className="text-slate-600 text-sm lg:text-base">
              *Loan fulfillment times are subject to the Ethereum network.
              Fulfillment may be delayed during periods of high congestion
            </p>
          </div>
        </div>
      </section>
      {/* ---------------------- First Section End ------------------------ */}
      {/* ---------------------- Second Section Start ------------------------ */}
      <section className="my-6">
        <div className="lg:w-3/5 border-2 rounded-2xl p-3 lg:p-5">
          <h3 className="text-xl font-medium mb-3">
            Where do you want to receive your loan?
          </h3>
          <div className="md:flex justify-between mb-7">
            <div className="flex items-center">
              <input
                type="radio"
                id="wallet1"
                name="contact"
                value="email"
                className="w-7 h-7 border-2 border-black"
              />
              <label htmlFor="wallet1" className="pl-4">
                <p className="font-semibold">
                  Coinbase or Gemini Account{" "}
                  <span className="font-medium text-sm lg:text-base lg:ml-3 bg-[#EFF3FE] py-1 px-2 rounded-xl text-[#276EF1] inline-block my-2 lg:my-0">
                    Recommended
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Minimize risk of funds being sent to an incorrect address
                </p>
              </label>
            </div>
            <div className="text-center md:text-left mt-3 lg:mt-0">
              <button className="bg-[#EEEEEE] w-32 h-10 rounded-3xl text-[#2C3B8D] mt-2 lg:mt-0">
                Sign in
              </button>
            </div>
          </div>
          <div className="md:flex justify-between mb-7">
            <div className="flex items-center">
              <input
                type="radio"
                id="wallet2"
                name="contact"
                value="email"
                className="w-7 h-7 border-2 border-black"
              />
              <label htmlFor="wallet2" className="pl-4">
                <p className="font-semibold">Ethereum Wallet</p>
              </label>
            </div>
            <div className="text-center md:text-left mt-3 lg:mt-0">
              <button className="bg-[#EEEEEE] w-32 h-10 rounded-3xl text-[#2C3B8D] mt-2 lg:mt-0">
                Connect
              </button>
            </div>
          </div>
          <div className="flex items-center mb-7">
            <input
              type="radio"
              id="wallet3"
              name="contact"
              value="email"
              className="w-7 h-7 border-2 border-black"
            />
            <label htmlFor="wallet3" className="pl-4">
              <p className="font-semibold">Other Exchange or Wallet Address</p>
            </label>
          </div>
          <div className="mt-2 p-5 bg-gray-100 rounded-2xl">
            <ul className="list-disc">
              {terms.map((term, i) => (
                <React.Fragment key={i}>{term.rule}</React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* ---------------------- Second Section End ------------------------ */}
    </main>
  );
};

export default StepFive;
