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
import { useFormik } from "formik"



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

	// Formik for shipping form
	const shippingForm = useFormik({
		initialValues: defaultShippingInfo,
		enableReinitialize: true,
		validate: (values) => {
			const newErrors = {}
			const required = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"]

			required.forEach((field) => {
				if (!values[field]) {
					newErrors[field] = "This field is required"
				}
			})

			if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
				newErrors.email = "Please enter a valid email address"
			}

			return newErrors
		},
		onSubmit: () => {},
	})

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

	// Sync Formik values into local shippingInfo state (used elsewhere)
	useEffect(() => {
		setShippingInfo(shippingForm.values)
	}, [shippingForm.values])

	// Populate user data after hydration to prevent hydration mismatch
	// Only populate if fields are empty (don't overwrite saved data)
	useEffect(() => {
		if (user && isAuthenticated) {
			const current = shippingForm.values
			// Only update if fields are empty
			if (!current.firstName && !current.lastName && !current.email) {
				shippingForm.setValues({
					...current,
					firstName: user?.name?.split(" ")[0] || "",
					lastName: user?.name?.split(" ")[1] || "",
					email: user?.email || "",
				})
			}
		}
	}, [user, isAuthenticated, shippingForm])

	const validateShipping = useCallback(async () => {
		const validationErrors = await shippingForm.validateForm()
		shippingForm.setTouched(
			{
				firstName: true,
				lastName: true,
				email: true,
				phone: true,
				address: true,
				city: true,
				state: true,
				zipCode: true,
			},
			false
		)
		return { isValid: Object.keys(validationErrors).length === 0, errors: validationErrors }
	}, [shippingForm])

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
			const validation = await validateShipping()
			if (!validation.isValid) {
				console.log("Validation failed:", validation.errors)
				return
			}

			// Move from Shipping step to Review step
			setErrors({})
			setCurrentStep(1)
			return
		}

		// For any future extra steps (if added)
		if (currentStep > 0 && currentStep < CHECKOUT_STEPS.length - 1) {
			// Clear errors before moving to next step
			setErrors({})
			// Immediate state update for better UX
			setCurrentStep(prev => {
				const nextStep = prev + 1
				return nextStep
			})
		}
	}, [currentStep, validateShipping])

	const handleBack = useCallback(() => {
		if (currentStep > 0) {
			// Immediate state update for better UX
			setCurrentStep(prev => prev - 1)
		}
	}, [currentStep])

	// Generate unique order ID
	const generateOrderId = () => {
		const timestamp = Date.now()
		const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
		const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
		return `STW-${date}-${randomStr}`
	}

	const handlePlaceOrder = async () => {
		setIsProcessing(true)

		// Ensure any items that require a size/volume have it selected
		for (const item of items) {
			if (Object.prototype.hasOwnProperty.call(item, 'selectedSize') && !item.selectedSize) {
				alert(`Please select a size for "${item.name}" before placing the order.`)
				setIsProcessing(false)
				return
			}
			if (Object.prototype.hasOwnProperty.call(item, 'selectedVolume') && !item.selectedVolume) {
				alert(`Please select a bottle size for "${item.name}" before placing the order.`)
				setIsProcessing(false)
				return
			}
		}

		// Generate unique order ID
		const orderId = generateOrderId()

		const templateParams = {
			orderId: orderId,
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
					const details = []
					if (item.selectedSize) details.push(`Size: ${item.selectedSize}`)
					if (item.selectedVolume) details.push(`Volume: ${item.selectedVolume}`)
					const detailsText = details.length ? ` - ${details.join(" | ")}` : ""
					return `${item.name}${detailsText} (x${item.quantity}) - Rs ${(price * Number(item.quantity)).toFixed(0)}`
				})
				.join("\n"),
			// HTML-safe version for EmailJS HTML templates (use {{{orderItemsHtml}}} in template)
			orderItemsHtml: items
				.map((item) => {
					const price = Number(item.price || 0)
					const details = []
					if (item.selectedSize) details.push(`Size: ${item.selectedSize}`)
					if (item.selectedVolume) details.push(`Volume: ${item.selectedVolume}`)
					const detailsText = details.length ? ` - ${details.join(" | ")}` : ""
					return `${item.name}${detailsText} (x${item.quantity}) - Rs ${(price * Number(item.quantity)).toFixed(0)}`
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
			// navigate to the correct success page with order ID
			router.push(`/success?orderId=${orderId}`)
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
					<h1 className="text-3xl font-bold text-primary mb-2">Checkout</h1>
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
												isActive ? "text-primary" : isCompleted ? "text-primary" : "text-muted-foreground"
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
						{/* Shipping Information (Formik-powered) */}
						{currentStep === 0 && (
								<Card className="pt-6 pb-6">
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-primary">
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
												name="firstName"
												value={shippingForm.values.firstName}
												onChange={shippingForm.handleChange}
												onBlur={shippingForm.handleBlur}
												className={shippingForm.touched.firstName && shippingForm.errors.firstName ? "border-destructive" : ""}
											/>
											{shippingForm.touched.firstName && shippingForm.errors.firstName && (
												<p className="text-sm text-destructive mt-1">{shippingForm.errors.firstName}</p>
											)}
										</div>
										<div>
											<Label htmlFor="lastName">Last Name</Label>
											<Input
												id="lastName"
												name="lastName"
												value={shippingForm.values.lastName}
												onChange={shippingForm.handleChange}
												onBlur={shippingForm.handleBlur}
												className={shippingForm.touched.lastName && shippingForm.errors.lastName ? "border-destructive" : ""}
											/>
											{shippingForm.touched.lastName && shippingForm.errors.lastName && (
												<p className="text-sm text-destructive mt-1">{shippingForm.errors.lastName}</p>
											)}
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="email">Email</Label>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
												<Input
													id="email"
													name="email"
													type="email"
													value={shippingForm.values.email}
													onChange={shippingForm.handleChange}
													onBlur={shippingForm.handleBlur}
													className={`pl-10 ${
														shippingForm.touched.email && shippingForm.errors.email ? "border-destructive" : ""
													}`}
												/>
											</div>
											{shippingForm.touched.email && shippingForm.errors.email && (
												<p className="text-sm text-destructive mt-1">{shippingForm.errors.email}</p>
											)}
										</div>
										<div>
											<Label htmlFor="phone">Phone</Label>
											<div className="relative">
												<Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
												<Input
													id="phone"
													name="phone"
													value={shippingForm.values.phone}
													onChange={shippingForm.handleChange}
													onBlur={shippingForm.handleBlur}
													className={`pl-10 ${
														shippingForm.touched.phone && shippingForm.errors.phone ? "border-destructive" : ""
													}`}
												/>
											</div>
											{shippingForm.touched.phone && shippingForm.errors.phone && (
												<p className="text-sm text-destructive mt-1">{shippingForm.errors.phone}</p>
											)}
										</div>
									</div>

									<div>
										<Label htmlFor="address">Address</Label>
										<div className="relative">
											<MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
											<Input
												id="address"
												name="address"
												value={shippingForm.values.address}
												onChange={shippingForm.handleChange}
												onBlur={shippingForm.handleBlur}
												className={`pl-10 ${
													shippingForm.touched.address && shippingForm.errors.address ? "border-destructive" : ""
												}`}
											/>
										</div>
										{shippingForm.touched.address && shippingForm.errors.address && (
											<p className="text-sm text-destructive mt-1">{shippingForm.errors.address}</p>
										)}
									</div>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<Label htmlFor="city">City</Label>
											<Input
												id="city"
												name="city"
												value={shippingForm.values.city}
												onChange={shippingForm.handleChange}
												onBlur={shippingForm.handleBlur}
												className={shippingForm.touched.city && shippingForm.errors.city ? "border-destructive" : ""}
											/>
											{shippingForm.touched.city && shippingForm.errors.city && (
												<p className="text-sm text-destructive mt-1">{shippingForm.errors.city}</p>
											)}
										</div>
										<div>
											<Label htmlFor="state">State</Label>
											<Input
												id="state"
												name="state"
												value={shippingForm.values.state}
												onChange={shippingForm.handleChange}
												onBlur={shippingForm.handleBlur}
												className={shippingForm.touched.state && shippingForm.errors.state ? "border-destructive" : ""}
											/>
											{shippingForm.touched.state && shippingForm.errors.state && (
												<p className="text-sm text-destructive mt-1">{shippingForm.errors.state}</p>
											)}
										</div>
										<div>
											<Label htmlFor="zipCode">ZIP Code</Label>
											<Input
												id="zipCode"
												name="zipCode"
												value={shippingForm.values.zipCode}
												onChange={shippingForm.handleChange}
												onBlur={shippingForm.handleBlur}
												className={shippingForm.touched.zipCode && shippingForm.errors.zipCode ? "border-destructive" : ""}
											/>
											{shippingForm.touched.zipCode && shippingForm.errors.zipCode && (
												<p className="text-sm text-destructive mt-1">{shippingForm.errors.zipCode}</p>
											)}
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
										<CardTitle className="text-primary">Review Your Order</CardTitle>
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
														{item.selectedVolume && <span className="mr-2">Volume: {item.selectedVolume} •</span>}
														Qty: {item.quantity}
													</p>
												</div>
												<p className="font-semibold">
													Rs {(Number(item.price) * Number(item.quantity)).toFixed(0)}
												</p>
											</div>
										))}
									</CardContent>
								</Card>

								<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
									<Card className="pt-6 pb-6">
										<CardHeader>
											<CardTitle className="text-lg text-primary">Shipping Address</CardTitle>
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
							<Button
								variant="outline"
								onClick={currentStep === 0 ? () => router.push("/cart") : handleBack}
								disabled={isProcessing}
								className="cursor-pointer"
							>
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
								<CardTitle className="text-primary">Order Summary</CardTitle>
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
