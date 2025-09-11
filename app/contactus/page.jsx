import Contact from "../../components/contact-us"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}