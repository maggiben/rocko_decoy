import Image from "next/image";
import React from "react";
import email from "@/assets/Blogs/email.png";

const Subscribe = ({ singleBlog }: { singleBlog?: boolean }) => {
  /* //! just simple typescript used here */
  return (
    <section
      className={`px-4 md:px-0 container mx-auto ${
        singleBlog ? "my-6" : "mt-16"
      }`}
    >
      <div
        className={`${
          singleBlog ? "px-6 py-8" : "p-10"
        } rounded-[20px] bg-[#F9F9F9] border-[1px] border-[#E2E2E2] flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10`}
      >
        <div className="w-[96px] h-[96px] rounded-full flex justify-center items-center shrink-0 bg-[#0E2A32]">
          <Image
            src={email}
            alt="blog2"
            height={40}
            width={40}
            className="rounded-[20px] object-cover"
          />
        </div>
        <div className="grow">
          <h1
            className={`${
              singleBlog ? "text-2xl" : "text-[28px]`"
            } mb-4 text-center md:text-left`}
          >
            Get the latest from Rocko in your inbox.
          </h1>
          <div
            className={`${
              singleBlog ? "w-full" : "xl:w-4/5"
            } space-y-4 md:space-y-0 md:space-x-[10px] flex flex-col md:flex-row justify-center md:justify-start items-center`}
          >
            <input
              type="text"
              name="email"
              placeholder="Enter Email Address"
              className={`border-[1px] border-[#E6E6E6] ${
                singleBlog ? "w-full" : "w-full lg:w-3/4"
              } px-4 py-[10px] placeholder:text-black rounded-3xl text-sm`}
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
