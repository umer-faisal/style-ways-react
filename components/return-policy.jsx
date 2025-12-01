export default function ReturnPolicy() {
  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl md:text-3xl font-medium text-center text-primary mb-8">Returns + Exchanges</h1>

        <div className="max-w-4xl mx-auto text-sm text-gray-700 space-y-6">
          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Delivery <span aria-hidden="true">📦</span></h3>
            <p className="mb-3">We aim to deliver your order as quickly as possible. Our delivery times and options include:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Standard Delivery</strong> – Estimated delivery within 3–5 business days.</li>
              <li><strong>Express Delivery</strong> – Get your order within 1–2 business days.</li>
              <li><strong>International Shipping</strong> – Delivery times vary by location.</li>
            </ul>
            <p className="mt-3">Once your order is dispatched, you’ll receive a tracking link via email. If you have any questions regarding delivery, feel free to reach out to our support team.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Returns & Refunds <span aria-hidden="true">🔄</span></h3>
            <ul className="list-disc list-inside space-y-2 mb-3">
              <li>Items must be unused and in their original packaging.</li>
              <li>Digital products & services may be non-refundable (please check our refund policy).</li>
              <li>Return shipping costs may apply.</li>
            </ul>
            <p>Once we receive and inspect your return, refunds will be processed within <strong>5 days</strong> to your original payment method.</p>
            <p className="mt-3">For assistance, contact our support team.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Help & Support <span aria-hidden="true">💬</span></h3>
            <p className="mb-3">Need help? We’re here for you!</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>FAQs</strong> – Check out our frequently asked questions for quick answers.</li>
              <li><strong>Live Chat</strong> – Chat with our support team for real-time assistance.</li>
              <li><strong>Email Support</strong> – Contact us at <a href="mailto:support@styleways.pk" className="font-semibold text-gray-900">support@styleways.pk</a> for any inquiries.</li>
              <li><strong>Call Us</strong> – Reach out to us at <a href="tel:03392351135" className="font-semibold text-gray-900">0339-2351135</a> during business hours.</li>
            </ul>
            <p className="mt-4">We’re committed to providing a smooth shopping experience. Let us know how we can help!</p>
          </section>
        </div>
      </div>
    </div>
  )
}
