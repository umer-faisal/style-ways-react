export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <a href="/" className="inline-flex items-center mb-4">
              <img src="/logo/final-logo.png" alt="styleways" className="h-16 w-16" />
            </a>
            <p className="text-white text-sm mb-2">
              Address: 512, Al Fiza Glass Tower, Block 10-A, Gulshan-e-Iqbal, Karachi
            </p>
            <p className="text-white text-sm mb-2">
              Email: <a href="mailto:support@styleways.pk" className="font-semibold text-white">support@styleways.pk</a>
            </p>
            <p className="text-white text-sm mb-4">
              Phone: <span className="font-semibold">0339-2351135</span>
            </p>

            <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="inline-flex items-center font-semibold underline mb-4">
              Get direction
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>

            <div className="flex items-center mt-6 space-x-4">
              <a href="https://www.facebook.com/stylewayspk/" aria-label="facebook" className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                {/* facebook svg */}
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.06 5.95 21.21 10.75 21.95v-6.92H8.08v-2.96h2.67V9.41c0-2.64 1.58-4.09 3.99-4.09 1.16 0 2.38.21 2.38.21v2.62h-1.34c-1.32 0-1.73.82-1.73 1.66v2.01h2.95l-.47 2.96h-2.48v6.92C18.05 21.21 22 17.06 22 12.07z"></path></svg>
              </a>

              <a href="https://www.instagram.com/stylewayspk/" aria-label="instagram" className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                {/* instagram svg */}
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 4a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0116.5 5z"></path></svg>
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-white mb-6">Help</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/privacy" className="text-white hover:text-offwhite">Privacy Policy</a>
              </li>
              <li>
                <a href="/return" className="text-white hover:text-primary">Returns + Exchanges</a>
              </li>
              <li>
                <a href="/shipping" className="text-white hover:text-primary">Shipping Privacy</a>
              </li>
              <li>
                <a href="/terms" className="text-white hover:text-primary">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-white mb-6">Useful Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/products" className="text-white hover:text-primary">Visit Our Store</a>
              </li>
              <li>
                <a href="/contactus" className="text-white hover:text-primary">Contact Us</a>
              </li>
              <li>
                <a href="/aboutus" className="text-white hover:text-primary">About Us</a>
              </li>
              <li>
                <a href="/faq" className="text-white hover:text-primary">FAQ</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-white text-sm">© 2025 StyleWays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
