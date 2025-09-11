export default function Privacy() {
  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl md:text-3xl font-medium text-center mb-8">Privacy Policy</h1>

        <div className="max-w-4xl mx-auto text-sm text-[#333333] space-y-6">
          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Introduction</h3>
            <p>
              Welcome to Zenify Express! Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, www.zenifyexpress.com.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Information We Collect</h3>
            <p>We collect different types of information, including:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Personal Information:</strong> When you place an order, register, or contact us, we may collect your name, email, phone number, and shipping address.</li>
              <li><strong>Payment Information:</strong> We do not store your payment details. All transactions are securely processed through third-party payment gateways.</li>
              <li><strong>Browsing Data:</strong> We collect non-personal information such as your IP address, device type, and browser cookies to improve your shopping experience.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">How We Use Your Information</h3>
            <p>We use the information collected for the following purposes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>To process and fulfill your orders.</li>
              <li>To improve our website, products, and services.</li>
              <li>To communicate with you regarding promotions, offers, and updates.</li>
              <li>To enhance security and prevent fraudulent activities.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Data Protection & Security</h3>
            <p>
              We take appropriate measures to protect your personal information from unauthorized access, alteration, or misuse. Our website uses SSL encryption to ensure secure transactions.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Cookies & Tracking Technologies</h3>
            <p>
              We use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings, but this may impact certain website functionalities.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Sharing of Information</h3>
            <p>
              We do not sell, trade, or rent your personal data. However, we may share your information with trusted third-party service providers (such as delivery partners and payment processors), and when required by law.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Your Rights</h3>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Request access to your personal data.</li>
              <li>Correct or delete your information.</li>
              <li>Opt out of promotional communications.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-xl text-[#333333] mb-1">Contact Us</h3>
            <p>If you have any questions regarding this Privacy Policy, feel free to reach out:</p>

            <div className="mt-4 space-y-2 text-sm text-[#333333]">
              <p className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.5 5L18 8m0 8H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2z"></path></svg>
                <span>Email: <a href="mailto:support@styleways.pk" className="font-semibold text-[#333333]">support@zenifyexpress.com</a></span>
              </p>

              <p className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.2a2 2 0 011.7.95l1.2 2.3a2 2 0 01-.45 2.3l-1.1 1.1a11 11 0 005 5l1.1-1.1a2 2 0 012.3-.45l2.3 1.2A2 2 0 0121 18.8V21a2 2 0 01-2 2A19 19 0 013 5z"></path></svg>
                <span>Phone: <a href="tel:0339-2351135" className="font-semibold text-[#333333]">0339-2351135</a></span>
              </p>
            </div>

            <p className="mt-6 text-sm text-[#333333]">Thank you for trusting StyleWays!</p>
          </section>
        </div>
      </div>
    </div>
  )
}
