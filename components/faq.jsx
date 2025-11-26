"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp, HelpCircle, ShoppingBag, Truck, CreditCard, Shield, Mail, Phone, Clock } from "lucide-react"

const faqData = [
  {
    category: "General",
    icon: HelpCircle,
    questions: [
      {
        question: "What is Style Ways?",
        answer: "Style Ways is your premier destination for trendy and high-quality clothing and lifestyle products. We offer a wide range of fashionable items including t-shirts, accessories, and lifestyle products to help you express your unique style."
      },
      {
        question: "How do I place an order?",
        answer: "Placing an order is easy! Simply browse our products, select your desired items and sizes, add them to your cart, and proceed to checkout. You'll need to provide shipping information and complete the payment process."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within Pakistan. We're working on expanding our shipping options to include international delivery. Please check our shipping policy for the most up-to-date information."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including credit cards, debit cards, and bank transfers. All payments are processed securely through our encrypted payment gateway."
      }
    ]
  },
  {
    category: "Orders & Shipping",
    icon: ShoppingBag,
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within Pakistan. Express shipping options are available for faster delivery. You'll receive tracking information once your order is shipped."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package's location and estimated delivery time."
      },
      {
        question: "What if my order is delayed?",
        answer: "If your order is delayed beyond the estimated delivery time, please contact our customer support team. We'll investigate the issue and provide you with updates on your order status."
      },
      {
        question: "Can I cancel my order?",
        answer: "Orders can be cancelled within 2 hours of placement if they haven't been processed yet. Once processing begins, cancellation may not be possible. Please contact us immediately if you need to cancel."
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free shipping on orders above Rs. 2,500. For orders below this amount, a nominal shipping fee applies."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    icon: Truck,
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some items like underwear and personalized products are not eligible for returns."
      },
      {
        question: "How do I return an item?",
        answer: "To return an item, contact our customer service team within 30 days of delivery. We'll provide you with a return authorization number and instructions for sending the item back."
      },
      {
        question: "How long do refunds take?",
        answer: "Once we receive your returned item, refunds are processed within 5-7 business days. The refund will be credited to your original payment method."
      },
      {
        question: "Can I exchange an item for a different size?",
        answer: "Yes! We offer size exchanges within 30 days of purchase. Contact our customer service team to arrange an exchange. You'll be responsible for return shipping costs unless the item was defective."
      }
    ]
  },
  {
    category: "Payment & Security",
    icon: CreditCard,
    questions: [
      {
        question: "Is my payment information secure?",
        answer: "Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your complete payment details on our servers."
      },
      {
        question: "What if my payment fails?",
        answer: "If your payment fails, please check your card details and available balance. You can also try a different payment method. If the issue persists, contact our customer support team."
      },
      {
        question: "Do you store my credit card information?",
        answer: "No, we do not store your complete credit card information. We only store the last 4 digits for order reference purposes. All payments are processed securely through our payment gateway."
      }
    ]
  },
  {
    category: "Product Information",
    icon: Shield,
    questions: [
      {
        question: "How do I choose the right size?",
        answer: "We provide detailed size charts for all our clothing items. Please refer to the size guide on each product page and measure yourself according to the instructions for the best fit."
      },
      {
        question: "Are your products authentic?",
        answer: "Yes, all our products are 100% authentic and sourced directly from verified suppliers. We guarantee the quality and authenticity of every item we sell."
      },
      {
        question: "What materials are used in your products?",
        answer: "We use high-quality materials including premium cotton, polyester blends, and other quality fabrics. Product descriptions include detailed material information for each item."
      },
      {
        question: "Do you offer plus sizes?",
        answer: "Yes, we offer a range of sizes including plus sizes for many of our products. Please check the size availability on individual product pages."
      }
    ]
  },
  {
    category: "Customer Support",
    icon: Mail,
    questions: [
      {
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team via email, phone, or through our contact form. We typically respond within 24 hours during business days."
      },
      {
        question: "What are your customer service hours?",
        answer: "Our customer service team is available Monday to Friday, 9 AM to 6 PM (Pakistan Standard Time). We also respond to emails and messages outside these hours."
      },
      {
        question: "Can I get help with styling advice?",
        answer: "Yes! Our team is happy to provide styling advice and product recommendations. Feel free to reach out with your questions about outfits, sizing, or product combinations."
      },
      {
        question: "Do you have a loyalty program?",
        answer: "We're working on launching a loyalty program soon! Stay tuned for updates on our website and social media channels."
      }
    ]
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8 ">
          {faqData.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <Card key={category.category} className="overflow-hidden pt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg text-primary">
                    <Icon className="h-5 w-5 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {category.questions.map((item, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`
                      const isOpen = openItems[key]
                      
                      return (
                        <div key={questionIndex} className="p-6">
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-0 h-auto text-left font-medium hover:bg-transparent"
                            onClick={() => toggleItem(categoryIndex, questionIndex)}
                          >
                            <span className="text-base">{item.question}</span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </Button>
                          
                          {isOpen && (
                            <div className="mt-4 text-muted-foreground leading-relaxed">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact Support Section */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our customer support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/contactus">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:03392351135">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </a>
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Available Monday - Friday, 9 AM - 6 PM (PST)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
