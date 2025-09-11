import Terms from "../../components/terms-condition"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Terms />
      </main>
      <Footer />
    </div>
  )
}