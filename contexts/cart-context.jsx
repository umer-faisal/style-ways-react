"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(null)

// helper: extract a safe image url from an item (common API shapes) with fallback
const normalizeImage = (it) => {
  if (!it) return "/logo/final-logo.png"
  const candidates = [
    it.image,
    Array.isArray(it.images) && (it.images[0]?.url || it.images[0]),
    it.images?.[0]?.url,
    it.image_url,
    it.thumbnail,
    Array.isArray(it.media) && (it.media[0]?.src || it.media[0]),
    it.featured_image?.url || it.featured_image,
  ].filter(Boolean)

  let found = candidates.find(Boolean)

  if (found && typeof found === "object") {
    found = found.url || found.src || found.path || null
  }

  return found || "/logo/final-logo.png"
}

const normalizeItem = (item) => {
  if (!item) return item
  return {
    ...item,
    image: normalizeImage(item),
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cartItems")
      const parsed = raw ? JSON.parse(raw) : []
      // normalize any saved items so UI can read item.image reliably
      return Array.isArray(parsed) ? parsed.map(normalizeItem) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(items))
    } catch (e) {
      // ignore
    }
  }, [items])

  // Helper: unique key for merging items (considers selectedSize)
  const itemKey = (item) => `${item.id}::${item.selectedSize ?? ""}`

  const addItem = (item, quantity = 1) => {
    // ensure item has a normalized image before storing/merging
    const normalized = normalizeItem(item)
    setItems((prev) => {
      const key = itemKey(normalized)
      const existingIndex = prev.findIndex((it) => itemKey(it) === key)
      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Number(next[existingIndex].quantity || 0) + Number(quantity),
        }
        return next
      }
      // ensure we store a shallow copy with quantity
      return [...prev, { ...normalized, quantity: Number(quantity) }]
    })
  }

  const removeItem = (itemKeyToRemove) => {
    setItems((prev) => prev.filter((it) => itemKey(it) !== itemKeyToRemove))
  }

  const clearCart = () => setItems([])

  const getItemCount = () => items.reduce((sum, it) => sum + Number(it.quantity || 0), 0)

  const getTotal = () => items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, getItemCount, getTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
