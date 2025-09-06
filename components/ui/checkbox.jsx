import React from "react"

export function Checkbox({ id, checked, onCheckedChange, className = "", disabled = false, ...props }) {
  const handleChange = (e) => {
    if (typeof onCheckedChange === "function") {
      onCheckedChange(e.target.checked)
    }
  }

  return (
    <input
      id={id}
      type="checkbox"
      checked={!!checked}
      onChange={handleChange}
      disabled={disabled}
      className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50 ${className}`}
      aria-checked={!!checked}
      {...props}
    />
  )
}

// ...you can also export default if you prefer default imports...
export default Checkbox
