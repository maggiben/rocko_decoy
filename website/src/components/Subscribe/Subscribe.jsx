import * as React from "react"

import emailImg from "../../images/email.svg"

import emailjs from "@emailjs/browser"

const Subscribe = ({ singleBlog }) => {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState("")
  const form = React.useRef()

  const handleSubmit = e => {
    e.preventDefault()
    if (!email) {
      setError("Email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      setSuccess("")
      return
    }

    emailjs
      .sendForm(
        "service_qywgfbg",
        "template_2w59omf",
        form.current,
        "RHCvxVpyncplziaa6"
      )
      .then(
        result => {
          console.log(result.text)
        },
        error => {
          console.log(error.text)
        }
      )

    setError("")
    setSuccess("Thank you for subscribing")
    setEmail("")
  }
 
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setError("")
      setSuccess("")
    }, 3000)

    return () => clearTimeout(timeout)
  }, [error, success])
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
          <form
            ref={form}
            onSubmit={handleSubmit}
            data-singleblog={!singleBlog ? true : false}
            className={`subscribe_container_info_input_container`}
          >
            <input
              type="text"
              name="email"
              placeholder="Enter Email Address"
              data-singleblog={!singleBlog ? true : false}
              className={`subscribe_container_info_input`}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="subscribe_container_info_button"
            >
              Subscribe
            </button>
          </form>
          {/* error  */}
          {error && (
            <p
              className={`text-red-500 text-sm font-semibold`}
            >
              {error}
            </p>
          )}
          {/* success */}
          {success && (
            <p
              className={`text-green-500 text-sm font-semibold `}
            >
              {success}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Subscribe
