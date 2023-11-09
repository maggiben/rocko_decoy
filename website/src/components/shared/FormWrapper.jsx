import React from "react"
const FormWrapper = ({ className, children }) => {
  return (
    <>
      <form
        action="https://rocko.us11.list-manage.com/subscribe/post?u=a55ca9db1b050104dac6c18a3&amp;id=d64d1776bc&amp;f_id=0036a0e0f0"
        method="post"
        className={className}
      >
        {children}
      </form>
    </>
  )
}

export default FormWrapper
