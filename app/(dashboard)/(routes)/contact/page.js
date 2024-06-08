import React from 'react'

function contactUs() {
  return (
    <div>
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<section className="bg-gray-100">
  <h1 className='text-black text-center text-4xl top-5 font-bold pt-6'>Contact Us</h1>
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8  mt-3">
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div className="lg:col-span-2 lg:py-12">
        <p className="max-w-xl text-lg">
        The Contact Us page is your gateway to reaching out to our team for any inquiries regarding our secure file storage services. Whether you need assistance with your account, have questions about our security features, or want to provide feedback, our support team is here to help. Fill out the contact form or use the provided contact details to get in touch. Your data security is our top priority, and we're committed to providing you with the best service possible.
        </p>

        <div className="mt-8">
          <a href="#" className="text-2xl font-bold text-pink-600"> 
            <strong className='text-primary'>+94 76 105 9565 / </strong>
            <strong className='text-primary'>+94 76 395 7588</strong></a>

          <address className="mt-2 not-italic">SLIIT Malabe Campus, New Kandy Road, Malabe.</address>
        </div>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form action="#" className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="name">Name</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="phone">Phone</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                id="phone"
              />
            </div>
          </div>


          <div>
            <label className="sr-only" htmlFor="message">Message</label>

            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default contactUs
