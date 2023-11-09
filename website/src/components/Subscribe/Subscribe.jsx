import * as React from "react"

import emailImg from "../../images/email.svg"
import FormWrapper from "../shared/FormWrapper"

const Subscribe = ({ singleBlog }) => {
  
  return (
    <section
      className={`subscribe_container_parent ${
        singleBlog
          ? "subscribe_container_parent_singleblog_true"
          : "subscribe_container_parent_singleblog_false"
      }`}
    >
      <div
        className={`${
          singleBlog
            ? "subscribe_container_singleblog_true"
            : "subscribe_container_singleblog_false"
        } subscribe_container`}
      >
        <div className="subscribe_container_image_container">
          <img
            src={emailImg}
            alt="blog2"
            height={40}
            width={40}
            className="subscribe_container_image"
          />
        </div>
        <div className="subscribe_container_info">
          <h1
            className={`${
              singleBlog
                ? "subscribe_container_info_h1_singleblog_true"
                : "subscribe_container_info_h1_singleblog_false"
            } subscribe_container_info_h1`}
          >
            Get the latest from Rocko in your inbox.
          </h1>
          <FormWrapper
              
            className={`subscribe_container_info_input_container`}
          >
            <input
              name="EMAIL"
              id="EMAIL"
              type="email"
              placeholder="Enter Email Address"
              data-singleblog={!singleBlog ? true : false}
              className={`subscribe_container_info_input`}
            />
            <button
              type="submit"
              className="subscribe_container_info_button"
            >
              Subscribe
            </button>
          </FormWrapper>
         
        </div>
      </div>
    </section>
  )
}

export default Subscribe
