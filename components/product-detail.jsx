"use client"

import { useState } from "react"
import { useCart } from "../contexts/cart-context"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock product data - in a real app this would come from an API
const getProductById = (id) => {
  const products = [
    {
      id: 1,
      name: "DROP SHOULDER EMBROIDERED TEE",
      price: 99.99,
      originalPrice: 129.99,
      images: ["/wireless-headphones.png"],
      rating: 4.5,
      reviews: 128,
      category: "Electronics",
      inStock: true,
      stockCount: 15,
      description:
        "Premium wireless headphones with active noise cancellation technology. Experience crystal-clear audio quality with deep bass and crisp highs. Perfect for music lovers, commuters, and professionals.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Quick charge: 5 min = 2 hours",
        "Bluetooth 5.0 connectivity",
        "Premium leather ear cushions",
        "Built-in microphone for calls",
      ],
      specifications: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        Impedance: "32 ohms",
        Weight: "250g",
        Connectivity: "Bluetooth 5.0, 3.5mm jack",
        Battery: "30 hours playback",
      },
    },
    {
    id: 2,
    name: "Beige Drop-Shoulder",
    price: 1499,
    originalPrice: 1800,
    images: ["/biege-dropshoulder/front.png", "/biege-dropshoulder/back.png"],
    rating: 4.8,
    reviews: 9,
    category: "Drop-Shoulder",
    inStock: true,
    description: "Advanced fitness tracking and smart notifications",
    sizes: ["S","M","L","XL"],
  },
  {
    id: 3,
    name: "black-tee ",
    price: "1250",
    originalPrice: 1499,
    images: ["/black-tee/front.png", "/black-tee/back.png"],
    rating: 4.3,
    reviews: 156,
    category: "Accessories",
    inStock: true,
    description: "Durable laptop backpack with multiple compartments",
    sizes: ["XS","S","M","L","XL"],
  },
  {
    id: 9,
    name: "Janan Sports Perfume",
    price: 2499,
    originalPrice: 2999,
    images: ["/janan-sports/janan-sports-new.jpg"],
    rating: 4.7,
    reviews: 128,
    category: "Perfumes",
    inStock: true,
    stockCount: 25,
    description: "Top Notes: Bergamot, Lemon, Pineapple, Pink Pepper, Blackcurrant, Plum, Mandarin, Marine Notes. Heart Notes: Rose, Geranium, Jasmine, Lily of the valley. Base Notes: Cedarwood, Patchouli, Ambergris, Tonka, Vanilla, Musk",
    features: [
      "Premium floral fragrance blend",
      "Long-lasting 8-10 hours",
      "Elegant and sophisticated scent",
      "Perfect for special occasions",
      "Beautifully packaged gift-ready bottle",
      "Suitable for all skin types",
    ],
    specifications: {
      "Fragrance Type": "Amber, Chypre, Citrus, Musky, Woody",
      "Top Notes": "Bergamot, Lemon, Pineapple, Pink Pepper, Blackcurrant, Plum, Mandarin, Marine Notes",
      "Base Notes": "Rose, Geranium, Jasmine, Lily of the valley",
      "Longevity": "8-10 hours",
      "Sillage": "Moderate to Strong",
    },
    volumes: {
      "30ml": { price: 999, originalPrice: 1299 },
      "50ml": { price: 1599, originalPrice: 1999 },
      "100ml": { price: 2499, originalPrice: 2999 },
    },
  },
  {
    id: 10,
    name: "David Backham Perfume",
    price: 2199,
    originalPrice: 2699,
    images: ["/david-backham/david-bekham-new.jpg"],
    rating: 4.5,
    reviews: 95,
    category: "Perfumes",
    inStock: true,
    stockCount: 30,
    description: "Top Notes: Bergamot, Lemon, Pineapple, Pink Pepper, Blackcurrant, Plum, Mandarin, Marine Notes. Heart Notes: Rose, Geranium, Jasmine, Lily of the valley. Base Notes: Cedarwood, Patchouli, Ambergris, Tonka, Vanilla, Musk",
    features: [
      "Refreshing aquatic scent",
      "Perfect for daily wear",
      "6-8 hours longevity",
      "Light and energizing",
      "Unisex fragrance",
      "Great for hot weather",
    ],
    specifications: {
      "Fragrance Type": "Aquatic",
      "Top Notes": "Citrus, Marine",
      "Base Notes": "Sea Salt, White Musk",
      "Longevity": "6-8 hours",
      "Sillage": "Moderate",
    },
    volumes: {
      "30ml": { price: 899, originalPrice: 1149 },
      "50ml": { price: 1399, originalPrice: 1799 },
      "100ml": { price: 2199, originalPrice: 2699 },
    },
  },
  {
    id: 11,
    name: "Musky Woods Cologne",
    price: 2799,
    originalPrice: 3299,
    images: ["/perfume-woods.png", "/perfume-woods-side.png"],
    rating: 4.8,
    reviews: 156,
    category: "Perfumes",
    inStock: true,
    stockCount: 20,
    description: "Bold and masculine scent with sandalwood, cedar, and musk. Perfect for evening wear and sophisticated occasions.",
    features: [
      "Bold masculine fragrance",
      "Long-lasting 10-12 hours",
      "Perfect for evening events",
      "Sophisticated and elegant",
      "Premium wood-based notes",
      "Signature scent material",
    ],
    specifications: {
      "Fragrance Type": "Woody",
      "Top Notes": "Cedar, Pine",
      "Base Notes": "Sandalwood, Musk",
      "Longevity": "10-12 hours",
      "Sillage": "Strong",
    },
    volumes: {
      "30ml": { price: 1099, originalPrice: 1399 },
      "50ml": { price: 1799, originalPrice: 2199 },
      "100ml": { price: 2799, originalPrice: 3299 },
    },
  },
  {
    id: 12,
    name: "Vanilla Dream Perfume",
    price: 2299,
    originalPrice: 2799,
    images: ["/perfume-vanilla.png", "/perfume-vanilla-side.png"],
    rating: 4.6,
    reviews: 112,
    category: "Perfumes",
    inStock: true,
    stockCount: 28,
    description: "Sweet and warm fragrance with vanilla, caramel, and soft floral notes. A comforting scent that lasts all day.",
    features: [
      "Sweet and warm fragrance",
      "Comforting vanilla base",
      "8-10 hours longevity",
      "Perfect for cozy occasions",
      "Delicious gourmand notes",
      "All-day comfort scent",
    ],
    specifications: {
      "Fragrance Type": "Gourmand",
      "Top Notes": "Caramel, Honey",
      "Base Notes": "Vanilla, Tonka Bean",
      "Longevity": "8-10 hours",
      "Sillage": "Moderate to Strong",
    },
    volumes: {
      "30ml": { price: 949, originalPrice: 1199 },
      "50ml": { price: 1499, originalPrice: 1899 },
      "100ml": { price: 2299, originalPrice: 2799 },
    },
  },
  {
    id: 13,
    name: "Citrus Fresh Spray",
    price: 1999,
    originalPrice: 2499,
    images: ["/perfume-citrus.png", "/perfume-citrus-side.png"],
    rating: 4.4,
    reviews: 87,
    category: "Perfumes",
    inStock: true,
    stockCount: 35,
    description: "Zesty and invigorating blend of lemon, bergamot, and orange. Light and energizing fragrance for everyday use.",
    features: [
      "Zesty citrus blend",
      "Light and refreshing",
      "4-6 hours longevity",
      "Perfect for daytime",
      "Energizing and uplifting",
      "Unisex fragrance",
    ],
    specifications: {
      "Fragrance Type": "Citrus",
      "Top Notes": "Lemon, Orange",
      "Base Notes": "Bergamot, White Tea",
      "Longevity": "4-6 hours",
      "Sillage": "Light to Moderate",
    },
    volumes: {
      "30ml": { price: 799, originalPrice: 999 },
      "50ml": { price: 1299, originalPrice: 1649 },
      "100ml": { price: 1999, originalPrice: 2499 },
    },
  },
  {
    id: 14,
    name: "Lavender Fields",
    price: 2399,
    originalPrice: 2899,
    images: ["/perfume-lavender.png", "/perfume-lavender-side.png"],
    rating: 4.7,
    reviews: 103,
    category: "Perfumes",
    inStock: true,
    stockCount: 22,
    description: "Calming and soothing scent with pure lavender essence. Perfect for relaxation and a peaceful day.",
    features: [
      "Calming lavender essence",
      "Therapeutic and relaxing",
      "6-8 hours longevity",
      "Perfect for bedtime",
      "Natural botanical scent",
      "Stress-relief fragrance",
    ],
    specifications: {
      "Fragrance Type": "Floral Herbal",
      "Top Notes": "Lavender, Chamomile",
      "Base Notes": "Woody Notes, Amber",
      "Longevity": "6-8 hours",
      "Sillage": "Moderate",
    },
    volumes: {
      "30ml": { price: 999, originalPrice: 1249 },
      "50ml": { price: 1599, originalPrice: 1999 },
      "100ml": { price: 2399, originalPrice: 2899 },
    },
  },
  ]

  return products.find((p) => p.id === Number.parseInt(id)) || products[0]
}

export default function ProductDetail({ productId }) {
  const product = getProductById(productId)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  
  // Determine if this product is clothing (has sizes or name/category hint)
  const isClothing = Array.isArray(product.sizes) || /(tee|shirt|drop|shoulder|dress|pant|jeans|hoodie|apparel|clothe)/i.test(
    `${product.category} ${product.name}`
  )

  // Determine if this product is a perfume
  const isPerfume = product.category === "Perfumes" && product.volumes

  const sizes = Array.isArray(product.sizes) ? product.sizes : ["XS", "S", "M", "L", "XL"]
  const [selectedSize, setSelectedSize] = useState(isClothing ? sizes[0] : "")
  
  // Volume selection for perfumes
  const volumes = product.volumes ? Object.keys(product.volumes) : []
  const [selectedVolume, setSelectedVolume] = useState(isPerfume ? (volumes.length > 0 ? volumes[volumes.length - 1] : "") : "")

  // Normalize product data and provide safe defaults
  const images = Array.isArray(product.images) ? product.images : product.image ? [product.image] : []
  
  // Calculate price based on selected volume for perfumes
  const getCurrentPrice = () => {
    if (isPerfume && selectedVolume && product.volumes?.[selectedVolume]) {
      return product.volumes[selectedVolume].price
    }
    return Number(product.price ?? 0)
  }
  
  const getCurrentOriginalPrice = () => {
    if (isPerfume && selectedVolume && product.volumes?.[selectedVolume]) {
      return product.volumes[selectedVolume].originalPrice
    }
    return Number(product.originalPrice ?? getCurrentPrice())
  }
  
  const priceNum = getCurrentPrice()
  const originalPriceNum = getCurrentOriginalPrice()
  const features = product.features ?? []
  const specifications = product.specifications ?? {}
  const stockCount = Number(product.stockCount ?? 0)

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, Math.min(stockCount || Infinity, prev + change)))
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    if (isClothing && !selectedSize) {
      // require size selection for clothing
      alert('Please select a size before adding to cart.')
      setIsAdding(false)
      return
    }
    if (isPerfume && !selectedVolume) {
      // require volume selection for perfumes
      alert('Please select a bottle size before adding to cart.')
      setIsAdding(false)
      return
    }
    // include selectedSize/selectedVolume and current price in item payload
    const itemToAdd = isClothing 
      ? { ...product, selectedSize, price: priceNum, originalPrice: originalPriceNum }
      : isPerfume
      ? { ...product, selectedVolume, price: priceNum, originalPrice: originalPriceNum }
      : product
    // Debug log: inspect item sent to cart
    console.log('Adding to cart:', itemToAdd)
    addItem(itemToAdd, quantity)

    // Simulate loading state
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  const discountPercentage =
    originalPriceNum > priceNum ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100) : 0

  // add: helper to format price and strip unnecessary ".00"
  const formatPrice = (value) => {
    const num = Number(value) || 0
    // whole numbers show without decimals, otherwise keep up to 2 decimals (trim trailing zeros)
    return num % 1 === 0 ? String(num) : num.toFixed(2).replace(/\.?0+$/, "")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images (carousel) */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={() => setSelectedImage((s) => (s - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  aria-label="Next image"
                  onClick={() => setSelectedImage((s) => (s + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 shadow-md"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl font-bold text-foreground">Rs {formatPrice(priceNum)}</span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">Rs {formatPrice(originalPriceNum)}</span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">
                    In Stock{product.stockCount != null ? ` (${product.stockCount} available)` : ''}
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-600">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            {isClothing && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Size:</span>
                <div className="inline-flex items-center space-x-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-2 border rounded text-sm ${selectedSize === s ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isPerfume && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Bottle Size:</span>
                <div className="inline-flex items-center space-x-2">
                  {volumes.map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setSelectedVolume(vol)}
                      className={`px-3 py-2 border rounded text-sm ${selectedVolume === vol ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="cursor-pointer"> 
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={stockCount ? quantity >= stockCount : false}
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1 cursor-pointer" size="lg" disabled={!product.inStock || isAdding} onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAdding ? "Adding..." : `Add to Cart - Rs ${formatPrice(priceNum * quantity)}`}
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="lg" className="cursor-pointer">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over Rs 3000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">2 Year Warranty</p>
                    <p className="text-xs text-muted-foreground">Full manufacturer warranty</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Easy returns and exchanges</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-primary text-primary font-medium">Description</button>
            <button className="py-4 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
              Specifications
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
              Reviews ({product.reviews})
            </button>
          </nav>
        </div>

        <div className="py-8">
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4">Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isPerfume && selectedVolume && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-foreground">Volume</span>
                    <span className="text-muted-foreground">{selectedVolume}</span>
                  </div>
                )}
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-foreground">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
