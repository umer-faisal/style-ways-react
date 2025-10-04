import FAQ from "../../components/faq"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}