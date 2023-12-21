import React from 'react'

function FormWrapper({ className, children }) {
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const formData = new FormData(event.target)
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('Form submitted successfully!')
        window?.gtag('event', 'conversion', {
          send_to: 'AW-11337551378/iN6_CJ3d54AZEJKclZ4q',
        })
      } else {
        console.error('Form submission failed!')
      }
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  return (
    <form
      action="https://rocko.us11.list-manage.com/subscribe/post?u=a55ca9db1b050104dac6c18a3&amp;id=d64d1776bc&amp;f_id=0036a0e0f0"
      method="post"
      className={className}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}

export default FormWrapper
