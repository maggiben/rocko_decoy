import * as React from 'react'

import EmailImg from '../../images/email.svg'
import FormWrapper from '../shared/FormWrapper'

function Subscribe({
  singleBlog,
  tagline = 'Get cash without having to sell your crypto',
  subheading = 'Be one of the first to get early access to Rocko',
  cta = 'Subscribe',
}) {
  return (
    <section
      className={`subscribe_container_parent ${
        singleBlog
          ? 'subscribe_container_parent_singleblog_true'
          : 'subscribe_container_parent_singleblog_false'
      }`}
    >
      <div
        className={`${
          singleBlog
            ? 'subscribe_container_singleblog_true'
            : 'subscribe_container_singleblog_false'
        } subscribe_container`}
      >
        <div className="subscribe_container_image_container">
          <EmailImg
            alt="blog2"
            height={40}
            width={40}
            className="subscribe_container_image"
          />
        </div>
        <div className="subscribe_container_info">
          <h2
            className={`${
              singleBlog
                ? 'subscribe_container_info_h1_singleblog_true'
                : 'subscribe_container_info_h1_singleblog_false'
            } subscribe_container_info_h1`}
          >
            {tagline}
          </h2>
          <p className="mb-20">{subheading}</p>
          <FormWrapper className="subscribe_container_info_input_container">
            <input
              name="EMAIL"
              id="EMAIL"
              type="email"
              placeholder="Enter Email Address"
              data-singleblog={!singleBlog}
              className="subscribe_container_info_input"
            />
            <button type="submit" className="subscribe_container_info_button">
              {cta}
            </button>
          </FormWrapper>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
