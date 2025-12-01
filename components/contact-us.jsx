"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
export default function ContactUs() {
  return (
    <div className="bg-white text-gray-900">
      {/* Full-width map banner */}
      <div className="w-full h-64 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0000000000005!2d67.00000000000001!3d24.860000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f0000000001%3A0x0000000000000000!2sGulshan-e-Iqbal%2C%20Karachi!5e0!3m2!1sen!2s!4v0000000000000"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Store location"
        />
      </div>

      <div className="container mx-auto px-8 sm:px-10 lg:px-16 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-4">Contact</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          We’d love to hear from you! Whether you have a question about our products, need assistance with your order, or want to share feedback, we’re here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Store info */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4">Visit Our Store</h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h3 className="font-medium flex items-center space-x-2 group">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5" />
                  </span>
                  <span>Address</span>
                </h3>
                <p className="mt-1 text-gray-600">Office No 512 Al Fiza glass tower Gulistan e Jauhar, Karachi</p>
              </div>

              <div>
                <h3 className="font-medium flex items-center space-x-2 group">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                  </span>
                  <span>Phone</span>
                </h3>
                <p className="mt-1 text-gray-600"><a href="tel:03392351135" className="font-semibold text-gray-800">0339-2351135</a></p>
              </div>

              <div>
                <h3 className="font-medium flex items-center space-x-2 group">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-primary shadow-sm transition-colors group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                  </span>
                  <span>Email</span>
                </h3>
                <p className="mt-1 text-gray-600"><a href="mailto:support@styleways.pk" className="font-semibold text-gray-800">support@styleways.pk</a></p>
              </div>

              <div>
                <h3 className="font-medium">Open Time</h3>
                <p className="mt-1 text-gray-600 text-sm">Monday – Saturday: <span className="font-semibold">9:00 AM – 9:00 PM</span></p>
                <p className="mt-1 text-gray-600 text-sm">Sunday: <span className="font-semibold">Closed</span></p>
              </div>

              <div className="flex items-center space-x-3 mt-4">
                <a
                  href="https://www.facebook.com/stylewayspk/"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 bg-white hover:bg-gradient-to-tr hover:from-primary hover:to-black hover:text-white shadow-sm transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.06 5.95 21.21 10.75 21.95v-6.92H8.08v-2.96h2.67V9.41c0-2.64 1.58-4.09 3.99-4.09 1.16 0 2.38.21 2.38.21v2.62h-1.34c-1.32 0-1.73.82-1.73 1.66v2.01h2.95l-.47 2.96h-2.48v6.92C18.05 21.21 22 17.06 22 12.07z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/stylewayspk/"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 bg-white hover:bg-gradient-to-tr hover:from-primary hover:to-black hover:text-white shadow-sm transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 4a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0116.5 5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <h2 className="text-xl font-semibold text-primary mb-4">Send Us a Message</h2>
            <p className="text-sm text-gray-600 mb-4">For any inquiries, simply fill out the form below, and we'll get back to you as soon as possible.</p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" name="name" placeholder="Name *" className="w-full border rounded px-3 py-2 text-sm" />
                <input type="email" name="email" placeholder="Email *" className="w-full border rounded px-3 py-2 text-sm" />
              </div>

              <textarea name="message" rows="6" placeholder="Message" className="w-full border rounded px-3 py-2 text-sm" />

              <button type="submit" className="w-full md:w-auto bg-black text-white px-6 py-3 rounded font-semibold">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
