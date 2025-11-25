export default function About() {
  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-2">We are StyeWays</h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-sm md:text-base">
          Welcome to StyeWays – your go-to online store for high-quality, innovative,
          and budget-friendly products. We believe in making shopping easy, convenient, and
          exciting by offering a wide variety of carefully curated items across multiple
          categories, including tech gadgets, home essentials, mobile accessories, fitness
          gear, fashion, and more.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto bg-gray-200 rounded-lg p-8 shadow-sm">
          <h3 className="text-lg md:text-xl font-medium text-center text-primary mb-2">At StyeWays, we are committed to:</h3>
          <p className="text-center text-sm text-gray-600 mb-6">Our talented stylists have put together outfits that are perfect for the season. They’ve variety of ways to inspire your next fashion-forward look.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center px-3">
              <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                {/* leaf icon */}
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12s4-8 9-8 9 8 9 8-4 8-9 8S3 12 3 12z"></path></svg>
              </div>
              <h4 className="font-semibold text-sm text-primary">Quality Products</h4>
              <p className="text-xs text-gray-600 mt-1">Every item in our collection is selected with attention to quality and functionality.</p>
            </div>

            <div className="flex flex-col items-center text-center px-3">
              <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                {/* price tag icon */}
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 7a5 5 0 017.07 0L21 13v6a2 2 0 01-2 2h-6l-6.93-6.93A5 5 0 017 7z"></path></svg>
              </div>
              <h4 className="font-semibold text-sm text-primary">Affordable Pricing</h4>
              <p className="text-xs text-gray-600 mt-1">Get the best value for your money without compromising on excellence.</p>
            </div>

            <div className="flex flex-col items-center text-center px-3">
              <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                {/* customer support icon */}
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1"></path></svg>
              </div>
              <h4 className="font-semibold text-sm text-primary">Customer Satisfaction</h4>
              <p className="text-xs text-gray-600 mt-1">We prioritize a seamless shopping experience, ensuring fast delivery and responsive support.</p>
            </div>

            <div className="flex flex-col items-center text-center px-3">
              <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-3">
                {/* star / trend icon */}
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.88 7.82 20 9 12.91l-5-3.64 5.91-.99L12 2z"></path></svg>
              </div>
              <h4 className="font-semibold text-sm text-primary">Trendsetting Selection</h4>
              <p className="text-xs text-gray-600 mt-1">Stay ahead with the latest trends in tech, fashion, and home accessories.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-6">
        <p className="max-w-4xl mx-auto text-primary font-semibold text-base md:text-lg">Join thousands of happy customers who trust StyleWays for their shopping needs. Browse our collections and experience the perfect blend of quality, convenience, and variety.</p>
        <a href="/products" className="inline-block mt-4 px-6 py-3 rounded-md font-semibold text-primary bg-transparent">Shop with us today!</a>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 justify-items-center">
          <img src="/images/gallery1.jpg" alt="gallery 1" className="w-full h-32 object-cover rounded-md" />
          <img src="/images/gallery2.jpg" alt="gallery 2" className="w-full h-32 object-cover rounded-md" />
          <img src="/images/gallery3.jpg" alt="gallery 3" className="w-full h-32 object-cover rounded-md" />
          <img src="/images/gallery4.jpg" alt="gallery 4" className="w-full h-32 object-cover rounded-md" />
        </div>
      </div>
    </div>
  )
}
