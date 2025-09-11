import Privacy from "../../components/privacy"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Privacy />
      </main>
      <Footer />
    </div>
  )
}