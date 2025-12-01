"use client"

import React from "react"
import { toast } from "react-toastify"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled UI error:", error, errorInfo)
    toast.error(error?.message || "Something went wrong.", {
      position: "top-right",
      autoClose: 4000
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full py-10 text-center text-sm text-gray-600">
          Something went wrong. Please try again.
        </div>
      )
    }

    return this.props.children
  }
}


