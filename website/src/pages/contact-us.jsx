import React, { useState } from 'react'
import Layout from '../layout'
import Seo from '../components/seo'

export function Head() {
  return <Seo title="Contact Us" />
}
function ContactForm() {
  const FORM_ENDPOINT =
    'https://public.herotofu.com/v1/30422220-8d73-11ee-87e8-6d2ee9752960'

  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()

    const inputs = e.target.elements
    const data = {}

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value
      }
    }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Form response was not ok')
        }

        setSubmitted(true)
      })
      .catch(err => {
        // Submit the form manually
        console.log({ err })
        e.target.submit()
      })
  }

  if (submitted) {
    return (
      <Layout>
        <div
          className="flex justify-center items-center h-screen"
          style={{ marginBottom: '-169px' }}
        >
          <div>
            <h1 className="text-6xl">Thank you!</h1>
            <div className="text-lg">We&apos;ll be in touch soon.</div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-[675px] w-full container mx-auto px-6 lg:w-800 lg:px-24 mt-12">
        <h1 className="text-6xl">Contact Us</h1>
        <div className="text-lg mb-8">
          Please reach out with any questions or feature requests.
        </div>
        <form action={FORM_ENDPOINT} onSubmit={handleSubmit} method="POST">
          <div className="pt-0 mb-3">
            <input
              type="text"
              placeholder="Your name"
              name="name"
              className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-1 rounded outline-none"
              required
            />
          </div>
          <div className="pt-0 mb-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-1 rounded outline-none"
              required
            />
          </div>
          <div className="pt-0 mb-3">
            <textarea
              placeholder="Your message"
              name="message"
              className="focus:outline-none focus:ring relative w-full px-3 py-6 text-sm text-gray-600 placeholder-gray-400 bg-white border-1 rounded outline-none"
              required
            />
          </div>
          <div className="pt-0 mb-3">
            <button
              className="active:bg-[#293992] hover:bs-purple focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-[#293992] rounded-full outline-none"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ContactForm
