import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold mb-2">{label}</label>
      )}
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
          error ? "border-red-500 focus:border-red-600" : "border-gray-300 focus:border-primary"
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
