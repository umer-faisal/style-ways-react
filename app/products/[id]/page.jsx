import ProductDetail from "../../../components/product-detail"
import Header from "../../../components/header"
import Footer from "../../../components/footer"

// Expect slug in format "<name-slug>-<id>"
const extractIdFromSlug = (slug) => {
  if (!slug) return null
  const parts = String(slug).split("-")
  const idPart = parts[parts.length - 1]
  return idPart || null
}

export default function ProductDetailPage({ params }) {
  const idFromSlug = extractIdFromSlug(params.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductDetail productId={idFromSlug} />
      </main>
      <Footer />
    </div>
  )
}
