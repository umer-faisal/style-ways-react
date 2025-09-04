"use client"

import React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "../contexts/cart-context"
import { AuthProvider } from "../contexts/auth-context"
import "./globals.css"

export default function ClientLayout({ children }) {
  return (
    <div className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
      {/* <CHANGE> Added AuthProvider to wrap the entire app */}
      <React.Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </React.Suspense>
      <Analytics />
    </div>
  )
}
