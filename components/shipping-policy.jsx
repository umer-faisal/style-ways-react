export default function ShippingPolicy() {
  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl md:text-3xl font-medium text-center text-primary mb-8">Shipping Privacy</h1>

        <div className="max-w-4xl mx-auto text-sm text-gray-700 space-y-6">
          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Order Processing Time</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>All orders are processed within <strong>5 business days</strong> (excluding weekends and holidays).</li>
              <li>If there are any delays due to high order volumes or unforeseen circumstances, we will notify you via email.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Shipping Rates & Delivery Estimates</h3>
            <p className="mb-2">Shipping charges for your order will be calculated and displayed at checkout. Estimated delivery times:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Standard Shipping:</strong> 3–5 business days.</li>
              <li><strong>Express Shipping:</strong> 1–2 business days.</li>
              <li><strong>Overnight Shipping:</strong> 1 business day (available for select locations).</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Order Tracking</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Once your order has shipped, you will receive a tracking number via email.</li>
              <li>You can track your order using the provided tracking link from the carrier.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Shipping Issues & Lost Packages</h3>
            <p className="mb-2">We are not responsible for lost or stolen packages once they have been marked as delivered by the carrier. If your package is missing or delayed:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Check the tracking information and delivery location first.</li>
              <li>If the carrier indicates delivery but you haven't received the package, contact the carrier or reach out to our support team for assistance.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Returns & Refunds</h3>
            <p className="mb-2">Please refer to our <a href="/returns" className="font-semibold text-gray-900">Return Policy</a> for details on returns and refunds related to shipping issues.</p>
          </section>

          <section>
            <h3 className="font-semibold text-lg text-primary mb-2">Contact</h3>
            <p>If you have any shipping related inquiries, contact our support team at:</p>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <p className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.5 5L21 8m0 8H3a2 2 0 01-2-2V8a2 2 0 012-2h18a2 2 0 012 2v6a2 2 0 01-2 2z"></path></svg>
                <span>Email: <a href="mailto:support@styleways.pk" className="font-semibold text-gray-900">support@styleways.pk</a></span>
              </p>

              <p className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.86 19.86 0 01-3.07-8.63A2 2 0 014.08 2h3a2 2 0 012 1.72c.12 1.05.38 2.07.77 3.03a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l1.05-1.05a2 2 0 012.11-.45c.96.39 1.98.65 3.03.77A2 2 0 0122 16.92z"></path></svg>
                <span>Phone: <a href="tel:03392351135" className="font-semibold text-gray-900">0339-2351135</a></span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
