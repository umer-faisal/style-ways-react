"use client"

import React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CartProvider } from "../contexts/cart-context"
import { AuthProvider } from "../contexts/auth-context"
import ErrorBoundary from "../components/error-boundary"
import "./globals.css"

export default function ClientLayout({ children }) {
  return (
    <div className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </ErrorBoundary>
      </React.Suspense>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Analytics />
    </div>
  )
}
