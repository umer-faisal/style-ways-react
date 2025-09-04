import AccountPage from "../../components/account-page"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function Account() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AccountPage />
      </main>
      <Footer />
    </div>
  )
}
