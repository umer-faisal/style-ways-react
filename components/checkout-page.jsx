"use client"

import { useState, useEffect, useCallback } from "react"
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

	// Default values for initial state (same on server and client)
	const defaultShippingInfo = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "United States",
	}

	const defaultBillingInfo = {
		sameAsShipping: true,
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "Pakistan",
	}

	const defaultPaymentInfo = {
		method: "card",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
		cardName: "",
	}

	// Initialize with default values (same on server and client)
	const [currentStep, setCurrentStep] = useState(0)
	const [isProcessing, setIsProcessing] = useState(false)
	const [errors, setErrors] = useState({})
	const [shippingInfo, setShippingInfo] = useState(defaultShippingInfo)
	const [billingInfo, setBillingInfo] = useState(defaultBillingInfo)
	const [paymentInfo, setPaymentInfo] = useState(defaultPaymentInfo)
	const [isHydrated, setIsHydrated] = useState(false)
	const [isCartHydrated, setIsCartHydrated] = useState(false)

	// Load from localStorage helper (client-side only)
	const loadFromLocalStorage = (key, defaultValue) => {
		if (typeof window === "undefined") return defaultValue
		try {
			const saved = localStorage.getItem(key)
			return saved ? JSON.parse(saved) : defaultValue
		} catch (e) {
			return defaultValue
		}
	}

	// Save to localStorage helper (client-side only)
	const saveToLocalStorage = (key, value) => {
		if (typeof window === "undefined") return
		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch (e) {
			console.error("Failed to save to localStorage:", e)
		}
	}

	// Clear localStorage on mount and mark as hydrated
	useEffect(() => {
		// Clear old checkout data on page load/reload
		if (typeof window !== "undefined") {
			localStorage.removeItem("checkout_currentStep")
			localStorage.removeItem("checkout_shippingInfo")
			localStorage.removeItem("checkout_billingInfo")
			localStorage.removeItem("checkout_paymentInfo")
		}
		// Mark as hydrated
		setIsHydrated(true)
		// Mark cart as hydrated after a brief delay to allow cart context to load
		setTimeout(() => {
			setIsCartHydrated(true)
		}, 100)
	}, []) // Run only once on mount

	const itemCount = getItemCount()
	const subtotal = getTotal()
	const shipping = subtotal > 50 ? 0 : 9.99
	const tax = subtotal * 0.08
	const total = subtotal + shipping + tax

	// Only redirect to success if cart is hydrated and empty
	useEffect(() => {
		if (isCartHydrated && items.length === 0) {
			router.push("/success")
		}
	}, [items.length, router, isCartHydrated])

	// Save to localStorage whenever state changes (only after hydration) - debounced
	useEffect(() => {
		if (!isHydrated) return
		const timeoutId = setTimeout(() => {
			saveToLocalStorage("checkout_currentStep", currentStep)
		}, 100)
		return () => clearTimeout(timeoutId)
	}, [currentStep, isHydrated])

	useEffect(() => {
		if (!isHydrated) return
		const timeoutId = setTimeout(() => {
			saveToLocalStorage("checkout_shippingInfo", shippingInfo)
		}, 100)
		return () => clearTimeout(timeoutId)
	}, [shippingInfo, isHydrated])

	useEffect(() => {
		if (!isHydrated) return
		const timeoutId = setTimeout(() => {
			saveToLocalStorage("checkout_billingInfo", billingInfo)
		}, 100)
		return () => clearTimeout(timeoutId)
	}, [billingInfo, isHydrated])

	useEffect(() => {
		if (!isHydrated) return
		const timeoutId = setTimeout(() => {
			saveToLocalStorage("checkout_paymentInfo", paymentInfo)
		}, 100)
		return () => clearTimeout(timeoutId)
	}, [paymentInfo, isHydrated])

	// Populate user data after hydration to prevent hydration mismatch
	// Only populate if fields are empty (don't overwrite saved data)
	useEffect(() => {
		if (user && isAuthenticated) {
			setShippingInfo(prev => {
				// Only update if fields are empty
				if (!prev.firstName && !prev.lastName && !prev.email) {
					return {
						...prev,
						firstName: user?.name?.split(" ")[0] || "",
						lastName: user?.name?.split(" ")[1] || "",
						email: user?.email || "",
					}
				}
				return prev
			})
		}
	}, [user, isAuthenticated])

	const validateShipping = useCallback(() => {
		const newErrors = {}
		// firstName and lastName are not in UI, so removed from required fields
		const required = ["email", "phone", "address", "city", "state", "zipCode"]

		required.forEach((field) => {
			if (!shippingInfo[field]) {
				newErrors[field] = "This field is required"
			}
		})

		if (shippingInfo.email && !/\S+@\S+\.\S+/.test(shippingInfo.email)) {
			newErrors.email = "Please enter a valid email address"
		}

		return { isValid: Object.keys(newErrors).length === 0, errors: newErrors }
	}, [shippingInfo])

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

	const handleNext = useCallback(async () => {
		console.log("handleNext called, currentStep:", currentStep)
		
		if (currentStep === 0) {
			const validation = validateShipping()
			if (!validation.isValid) {
				console.log("Validation failed:", validation.errors)
				setErrors(validation.errors)
				return
			}

			console.log("Validation passed, starting order placement...")
			// On shipping step, place order directly with EmailJS
			setIsProcessing(true)

			// Ensure any items that require a size have one selected
			for (const item of items) {
				if (Object.prototype.hasOwnProperty.call(item, 'selectedSize') && !item.selectedSize) {
					alert(`Please select a size for "${item.name}" before placing the order.`)
					setIsProcessing(false)
					return
				}
			}

			// Prepare EmailJS template parameters
			const templateParams = {
				// firstName and lastName not in UI, so using default values
				firstName: shippingInfo.firstName || "Customer",
				lastName: shippingInfo.lastName || "",
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
				orderItemsHtml: items
					.map((item) => {
						const price = Number(item.price || 0)
						const sizeText = item.selectedSize ? ` - Size: ${item.selectedSize}` : ''
						return `${item.name}${sizeText} (x${item.quantity}) - Rs ${(price * Number(item.quantity)).toFixed(0)}`
					})
					.join("<br/>"),
				itemsJson: JSON.stringify(items, null, 2),
				total: total.toFixed(0),
			}

			console.log("Template params prepared:", templateParams)

			try {
				const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
				const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
				const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

				console.log("EmailJS config:", { serviceId: !!serviceId, templateId: !!templateId, publicKey: !!publicKey })

				if (!serviceId || !templateId || !publicKey) {
					throw new Error("EmailJS configuration is missing. Please check your environment variables.")
				}

				console.log("Sending EmailJS email...")
				const result = await emailjs.send(
					serviceId,
					templateId,
					templateParams,
					publicKey
				)
				console.log("EmailJS success:", result)

				// Clear checkout form data from localStorage after successful order
				if (typeof window !== "undefined") {
					localStorage.removeItem("checkout_shippingInfo")
					localStorage.removeItem("checkout_billingInfo")
					localStorage.removeItem("checkout_paymentInfo")
					localStorage.removeItem("checkout_currentStep")
				}

				console.log("Clearing cart and redirecting...")
				clearCart()
				// Navigate to success page after successful EmailJS call
				router.push("/success")
				setIsProcessing(false)
				return
			} catch (error) {
				console.error("EmailJS error:", error)
				alert(`Failed to send order confirmation: ${error.message || "Please try again."}`)
				setIsProcessing(false)
				return
			}
		}

		// Only move to next step if not on step 0 (step 0 places order directly)
		if (currentStep > 0 && currentStep < CHECKOUT_STEPS.length - 1) {
			// Clear errors before moving to next step
			setErrors({})
			// Immediate state update for better UX
			setCurrentStep(prev => {
				const nextStep = prev + 1
				return nextStep
			})
		}
	}, [currentStep, validateShipping, shippingInfo, items, total, clearCart, router])

	const handleBack = useCallback(() => {
		if (currentStep > 0) {
			// Immediate state update for better UX
			setCurrentStep(prev => prev - 1)
		}
	}, [currentStep])

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
			// firstName and lastName not in UI, so using default values
			firstName: shippingInfo.firstName || "Customer",
			lastName: shippingInfo.lastName || "",
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
			const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
			const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
			const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

			if (!serviceId || !templateId || !publicKey) {
				throw new Error("EmailJS configuration is missing. Please check your environment variables.")
			}

			await emailjs.send(
				serviceId,
				templateId,
				templateParams,
				publicKey
			)

			// Clear checkout form data from localStorage after successful order
			if (typeof window !== "undefined") {
				localStorage.removeItem("checkout_shippingInfo")
				localStorage.removeItem("checkout_billingInfo")
				localStorage.removeItem("checkout_paymentInfo")
				localStorage.removeItem("checkout_currentStep")
			}

			clearCart()
			// navigate to the correct success page (hyphenated path)
			router.push("/success")
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

	// Don't render until cart is hydrated to prevent redirect issues
	if (!isCartHydrated) {
		return (
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center py-16">
						<p className="text-muted-foreground">Loading...</p>
					</div>
				</div>
			</div>
		)
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
									{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
									</div> */}

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
							<Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className= "cursor-pointer">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back
							</Button>

							{currentStep < CHECKOUT_STEPS.length - 1 ? (
								<Button onClick={handleNext} disabled={isProcessing} className= "cursor-pointer">
									{isProcessing ? "Processing..." : "Next"}
									{!isProcessing && <ArrowRight className="h-4 w-4 ml-2" />}
								</Button>
							) : (
								<Button onClick={handlePlaceOrder} disabled={isProcessing} className= "cursor-pointer">
									{isProcessing ? "Processing..." : "Place Order"}
								</Button>
							)}
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<Card className="pt-6 pb-4">
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
