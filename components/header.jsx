"use client"
import { Search, Menu, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import CartDrawer from "../components/cart-drawer"
import UserDropdown from "../components/user-dropdown"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img src="/logo.webp" alt="ShopHub Logo" className="h-12 w-auto md:h-16" />
              {/* <h1 className="text-2xl font-bold text-primary cursor-pointer">ShopHub</h1> */}
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-10 w-full" />
            </div>
          </div> */}

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="group text-white text-sm font-medium transition-colors inline-block">
              Home
              <span className="block h-[2px] w-6 bg-transparent mt-1 mx-auto transition-colors duration-200 group-hover:bg-white" />
            </Link>
            <a href="/products" className="group text-white text-sm font-medium transition-colors inline-block">
              Shop
              <span className="block h-[2px] w-6 bg-transparent mt-1 mx-auto transition-colors duration-200 group-hover:bg-white" />
            </a>
            <a href="#" className="group text-white text-sm font-medium transition-colors inline-block">
              About Us
              <span className="block h-[2px] w-6 bg-transparent mt-1 mx-auto transition-colors duration-200 group-hover:bg-white" />
            </a>
            <a href="#" className="group text-white text-sm font-medium transition-colors inline-block">
              Contact Us
              <span className="block h-[2px] w-6 bg-transparent mt-1 mx-auto transition-colors duration-200 group-hover:bg-white" />
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 text-white">
            {/* Mobile search button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              {/* <Search className="h-5 w-5 text-white" /> */}
            </Button>

            <UserDropdown />

            <CartDrawer />

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div className={`md:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <nav className="flex flex-col bg-black text-white border-t">
          <Link href="/" className="px-4 py-3 text-sm font-medium hover:bg-gray-800" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <a href="/products" className="px-4 py-3 text-sm font-medium hover:bg-gray-800" onClick={() => setMobileOpen(false)}>
            Shop
          </a>
          <a href="#" className="px-4 py-3 text-sm font-medium hover:bg-gray-800" onClick={() => setMobileOpen(false)}>
            About Us
          </a>
          <a href="#" className="px-4 py-3 text-sm font-medium hover:bg-gray-800" onClick={() => setMobileOpen(false)}>
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  )
}
