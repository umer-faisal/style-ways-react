import ProductDetail from "../../../components/product-detail"
import Header from "../../../components/header"
import Footer from "../../../components/footer"

export default function ProductDetailPage({ params }) {
  // getProductById now matches by slug first, then by ID, so we can pass the slug/ID directly
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductDetail productId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
