import { Span } from "next/dist/trace"
import React from "react"

interface BadgeProps {
    children: React.ReactNode
    className?: string
}

export function Badge ({ children, className = ''}: BadgeProps) {
    return (
        <span className={`inline-block px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 ${className}`}>
            {children}
        </span>
    )
}