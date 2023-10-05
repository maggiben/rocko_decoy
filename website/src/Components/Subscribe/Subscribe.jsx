import * as React from "react"
import email from "../../images/email.png";

const Subscribe = () => {
  return (
    <section className="px-4 md:px-0">
      <div className="container md:mx-auto p-10 rounded-[20px] bg-[#F9F9F9] border-[1px] border-[#E2E2E2] mt-16 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10">
        <div className="w-[96px] h-[96px] rounded-full flex justify-center items-center shrink-0 bg-[#0E2A32]">
          <img
            src={email}
            alt="blog2"
            height={40}
            width={40}
            className="rounded-[20px] object-cover"
          />
        </div>
        <div className="grow">
          <h1 className="text-[28px] mb-4 text-center md:text-left">
            Get the latest from Rocko in your inbox.
          </h1>
          <div className="xl:w-4/5 space-y-4 md:space-y-0 md:space-x-[10px] flex flex-col md:flex-row justify-center items-center">
            <input
              type="text"
              name="email"
              placeholder="Enter Email Address"
              className="border-[1px] border-[#E6E6E6] w-full lg:w-3/4 px-4 py-[10px] placeholder:text-black rounded-3xl text-sm"
            />
            <button className="px-12 py-[12px] rounded-3xl bg-[#2C3B8D] text-white text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;