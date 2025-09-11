import Shipping from "../../components/shipping-policy"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Shipping />
      </main>
      <Footer />
    </div>
  )
}