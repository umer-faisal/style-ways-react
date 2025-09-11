import Reeturn from "../../components/return"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function ReturnPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Return />
      </main>
      <Footer />
    </div>
  )
}