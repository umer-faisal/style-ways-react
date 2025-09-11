"use client"

import { useState, useEffect } from "react"
import { useCart } from "../contexts/cart-context"
import { useAuth } from "../contexts/auth-context"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { ArrowLeft, ArrowRight, CreditCard, Truck, Shield, CheckCircle, MapPin, Mail, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import emailjs from "emailjs-com"



const CHECKOUT_STEPS = [
	{ id: "shipping", title: "Shipping Information", icon: Truck },
	{ id: "review", title: "Review Order", icon: CheckCircle },
]

export default function CheckoutPage() {
	const { items, getItemCount, getTotal, clearCart } = useCart()
	const { user, isAuthenticated } = useAuth()
	const router = useRouter()

	const [currentStep, setCurrentStep] = useState(0)
	const [isProcessing, setIsProcessing] = useState(false)
	const [errors, setErrors] = useState({})

	const [shippingInfo, setShippingInfo] = useState({
		firstName: user?.name?.split(" ")[0] || "",
		lastName: user?.name?.split(" ")[1] || "",
		email: user?.email || "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "United States",
	})

	const [billingInfo, setBillingInfo] = useState({
		sameAsShipping: true,
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "United States",
	})

	const [paymentInfo, setPaymentInfo] = useState({
		method: "card",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
		cardName: "",
	})

	const itemCount = getItemCount()
	const subtotal = getTotal()
	const shipping = subtotal > 50 ? 0 : 9.99
	const tax = subtotal * 0.08
	const total = subtotal + shipping + tax

	useEffect(() => {
		if (items.length === 0) {
			router.push("/cart")
		}
	}, [items.length, router])

	const validateShipping = () => {
		const newErrors = {}
		const required = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"]

		required.forEach((field) => {
			if (!shippingInfo[field]) {
				newErrors[field] = "This field is required"
			}
		})

		if (shippingInfo.email && !/\S+@\S+\.\S+/.test(shippingInfo.email)) {
			newErrors.email = "Please enter a valid email address"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const validatePayment = () => {
		const newErrors = {}

		if (paymentInfo.method === "card") {
			if (!paymentInfo.cardNumber) newErrors.cardNumber = "Card number is required"
			if (!paymentInfo.expiryDate) newErrors.expiryDate = "Expiry date is required"
			if (!paymentInfo.cvv) newErrors.cvv = "CVV is required"
			if (!paymentInfo.cardName) newErrors.cardName = "Cardholder name is required"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleNext = () => {
		if (currentStep === 0 && !validateShipping()) return

		if (currentStep < CHECKOUT_STEPS.length - 1) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1)
		}
	}

	const handlePlaceOrder = async () => {
		setIsProcessing(true)

		// Ensure any items that require a size have one selected
		for (const item of items) {
			if (Object.prototype.hasOwnProperty.call(item, 'selectedSize') && !item.selectedSize) {
				alert(`Please select a size for "${item.name}" before placing the order.`)
				setIsProcessing(false)
				return
			}
		}

		const templateParams = {
			firstName: shippingInfo.firstName,
			lastName: shippingInfo.lastName,
			email: shippingInfo.email,
			phone: shippingInfo.phone,
			address: shippingInfo.address,
			city: shippingInfo.city,
			state: shippingInfo.state,
			zipCode: shippingInfo.zipCode,
			country: shippingInfo.country,
			orderItems: items
				.map((item) => {
					const price = Number(item.price || 0)
					const sizeText = item.selectedSize ? ` - Size: ${item.selectedSize}` : ''
					return `${item.name}${sizeText} (x${item.quantity}) - Rs ${(price * Number(item.quantity)).toFixed(0)}`
				})
				.join("\n"),
			// HTML-safe version for EmailJS HTML templates (use {{{orderItemsHtml}}} in template)
			orderItemsHtml: items
				.map((item) => {
					const price = Number(item.price || 0)
					const sizeText = item.selectedSize ? ` - Size: ${item.selectedSize}` : ''
					return `${item.name}${sizeText} (x${item.quantity}) - Rs ${(price * Number(item.quantity)).toFixed(0)}`
				})
				.join("<br/>") ,
			// structured data for debugging
			itemsJson: JSON.stringify(items, null, 2),
			total: total.toFixed(0),
		}

		// Debug logs to verify sizes are present and fields sent to EmailJS
		console.log("Sending order, templateParams.orderItems:\n", templateParams.orderItems)
		console.log("Sending order, templateParams.orderItemsHtml:\n", templateParams.orderItemsHtml)
		console.log("Sending order, items object:\n", templateParams.itemsJson)

		try {
			await emailjs.send(
				"service_u4jhvh1",
				"template_ujrlhxg",
				templateParams,
				"ohfUSmK4hi0wqY3U5"
			)

			clearCart()
			// navigate to the correct success page (hyphenated path)
			router.push("/checkout/success")
		} catch (error) {
			console.error("EmailJS error:", error)
			alert("Failed to send order confirmation. Please try again.")
			setIsProcessing(false)
		}
	}

	const handleShippingChange = (field, value) => {
		setShippingInfo((prev) => ({ ...prev, [field]: value }))
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }))
		}
	}

	const handlePaymentChange = (field, value) => {
		setPaymentInfo((prev) => ({ ...prev, [field]: value }))
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }))
		}
	}

	if (items.length === 0) {
		return null
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
					<p className="text-muted-foreground">Complete your purchase</p>
				</div>

				{/* Progress Steps */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						{CHECKOUT_STEPS.map((step, index) => {
							const Icon = step.icon
							const isActive = index === currentStep
							const isCompleted = index < currentStep

							return (
								<div key={step.id} className="flex items-center">
									<div
										className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
											isCompleted
												? "bg-primary border-primary text-primary-foreground"
												: isActive
												? "border-primary text-primary"
												: "border-muted text-muted-foreground"
										}`}
									>
										{isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
									</div>
									<div className="ml-3 hidden sm:block">
										<p
											className={`text-sm font-medium ${
												isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
											}`}
										>
											{step.title}
										</p>
									</div>
									{index < CHECKOUT_STEPS.length - 1 && (
										<div className={`hidden sm:block w-16 h-0.5 ml-4 ${isCompleted ? "bg-primary" : "bg-muted"}`} />
									)}
								</div>
							)
						})}
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2">
						{/* Shipping Information */}
						{currentStep === 0 && (
							<Card className="pt-6 pb-6">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Truck className="h-5 w-5" />
										Shipping Information
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="firstName">First Name</Label>
											<Input
												id="firstName"
												value={shippingInfo.firstName}
												onChange={(e) => handleShippingChange("firstName", e.target.value)}
												className={errors.firstName ? "border-destructive" : ""}
											/>
											{errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
										</div>
										<div>
											<Label htmlFor="lastName">Last Name</Label>
											<Input
												id="lastName"
												value={shippingInfo.lastName}
												onChange={(e) => handleShippingChange("lastName", e.target.value)}
												className={errors.lastName ? "border-destructive" : ""}
											/>
											{errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="email">Email</Label>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
												<Input
													id="email"
													type="email"
													value={shippingInfo.email}
													onChange={(e) => handleShippingChange("email", e.target.value)}
													className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
												/>
											</div>
											{errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
										</div>
										<div>
											<Label htmlFor="phone">Phone</Label>
											<div className="relative">
												<Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
												<Input
													id="phone"
													value={shippingInfo.phone}
													onChange={(e) => handleShippingChange("phone", e.target.value)}
													className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
												/>
											</div>
											{errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
										</div>
									</div>

									<div>
										<Label htmlFor="address">Address</Label>
										<div className="relative">
											<MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
											<Input
												id="address"
												value={shippingInfo.address}
												onChange={(e) => handleShippingChange("address", e.target.value)}
												className={`pl-10 ${errors.address ? "border-destructive" : ""}`}
											/>
										</div>
										{errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<Label htmlFor="city">City</Label>
											<Input
												id="city"
												value={shippingInfo.city}
												onChange={(e) => handleShippingChange("city", e.target.value)}
												className={errors.city ? "border-destructive" : ""}
											/>
											{errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
										</div>
										<div>
											<Label htmlFor="state">State</Label>
											<Input
												id="state"
												value={shippingInfo.state}
												onChange={(e) => handleShippingChange("state", e.target.value)}
												className={errors.state ? "border-destructive" : ""}
											/>
											{errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
										</div>
										<div>
											<Label htmlFor="zipCode">ZIP Code</Label>
											<Input
												id="zipCode"
												value={shippingInfo.zipCode}
												onChange={(e) => handleShippingChange("zipCode", e.target.value)}
												className={errors.zipCode ? "border-destructive" : ""}
											/>
											{errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Review Order */}
						{currentStep === 1 && (
							<div className="space-y-6">
								<Card className="!pt-6 !pb-6">
									<CardHeader>
										<CardTitle>Review Your Order</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										{items.map((item) => (
											<div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
												<img
													src={item.image || "/placeholder.svg"}
													alt={item.name}
													className="w-16 h-16 object-cover rounded-lg"
												/>
												<div className="flex-1">
													<h4 className="font-medium">{item.name}</h4>
													<p className="text-sm text-muted-foreground">
														{item.selectedSize && <span className="mr-2">Size: {item.selectedSize} •</span>}
														Qty: {item.quantity}
													</p>
												</div>
												<p className="font-semibold">Rs {(Number(item.price) * Number(item.quantity)).toFixed(0)}</p>
											</div>
										))}
									</CardContent>
								</Card>

								<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
									<Card className="pt-6 pb-6">
										<CardHeader>
											<CardTitle className="text-lg">Shipping Address</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-sm space-y-1">
												<p className="font-medium">
												  FIRST NAME: {shippingInfo.firstName} <br />LAST NAME: {shippingInfo.lastName}
												</p>
												<p className="font-medium">ADDRESS: {shippingInfo.address}</p>
												<p className="font-medium">
												   CITY: {shippingInfo.city}, <br />STATE: {shippingInfo.state} <br />ZIPCODE: {shippingInfo.zipCode}
												</p>
												<p className="font-medium">EMAIL: {shippingInfo.email}</p><br />
												<p className="font-medium">PHONE: {shippingInfo.phone}</p>
											</div>
										</CardContent>
									</Card>

									{/* <Card>
										<CardHeader>
											<CardTitle className="text-lg">Payment Method</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="text-sm space-y-1">
												<p className="font-medium">Credit Card</p>
												<p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
												<p>{paymentInfo.cardName}</p>
											</div>
										</CardContent>
									</Card> */}
								</div>
							</div>
						)}

						{/* Navigation Buttons */}
						<div className="flex justify-between mt-8">
							<Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back
							</Button>

							{currentStep < CHECKOUT_STEPS.length - 1 ? (
								<Button onClick={handleNext}>
									Next
									<ArrowRight className="h-4 w-4 ml-2" />
								</Button>
							) : (
								<Button onClick={handlePlaceOrder} disabled={isProcessing}>
									{isProcessing ? "Processing..." : "Place Order"}
								</Button>
							)}
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<Card className="sticky top-24 pt-6 pb-4">
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Subtotal ({itemCount} items)</span>
										<span>Rs{subtotal.toFixed(0)}</span>
									</div>

									<div className="flex justify-between">
										<span className="flex items-center gap-2">
											Shipping
											{shipping === 0 && (
												<Badge variant="secondary" className="text-xs">
													Free
												</Badge>
											)}
										</span>
										<span>Rs {shipping.toFixed(0)}</span>
									</div>

									<div className="flex justify-between">
										<span>Tax</span>
										<span>Rs {tax.toFixed(0)}</span>
									</div>
								</div>

								<Separator />

								<div className="flex justify-between text-lg font-bold">
									<span>Total</span>
									<span>Rs{total.toFixed(0)}</span>
								</div>

								<div className="space-y-2 pt-4">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Shield className="h-4 w-4" />
										<span>Secure SSL encryption</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Truck className="h-4 w-4" />
										<span>Free returns within 30 days</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
