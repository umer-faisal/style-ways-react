import { Suspense } from "react"
import CheckoutSuccess from "../../components/checkout-success"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading...</div>}>
          <CheckoutSuccess />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
