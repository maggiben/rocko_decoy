import * as React from "react"
import email from "../../images/email.png"

const Subscribe = ({ singleBlog }) => {
  return (
    <section
      className={`!px-4 !container !mx-auto subscribe_container_parent ${
        singleBlog ? "!my-6" : "!mt-16"
      }`}
    >
      <div
        className={`${
          singleBlog ? "!px-6 !py-8" : "!p-10"
        } !rounded-[20px] !bg-[#F9F9F9] !border-[1px] !border-[#E2E2E2] !flex !flex-col !items-center !gap-y-4 subscribe_container`}
      >
        <div className="!w-[96px] !h-[96px] !rounded-full !flex !justify-center !items-center !shrink-0 !bg-[#0E2A32]">
          <img
            src={email}
            alt="blog2"
            height={40}
            width={40}
            className="!rounded-[20px] !object-cover"
          />
        </div>
        <div className="!grow">
          <h1 className={`${singleBlog ? "!text-2xl" : "!text-[28px]"} !mb-4`}>
            Get the latest from Rocko in your inbox.
          </h1>
          <div
            data-singleblog={!singleBlog ? true : false}
            className={`subscribe_container_info_input_container !gap-y-4 !flex !flex-col !justify-center !items-center !w-full`}
          >
            <input
              type="text"
              name="email"
              placeholder="Enter Email Address"
              data-singleblog={!singleBlog ? true : false}
              className={`!w-full !border-[1px] !border-[#E6E6E6] !px-4 !py-[10px] !placeholder:text-black !rounded-3xl !text-sm subscribe_container_info_input`}
            />
            <button className="!px-12 !py-[12px] !rounded-3xl !bg-[#2C3B8D] !text-white text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
