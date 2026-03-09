import { type JSX } from "react";

export default function IconComponent() : JSX.Element {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-12 h-12 relative z-10"
                fill="none"
            >
                {/* Skull head */}
                <path
                    d="M32 6C18 6 10 15 10 26c0 7 4 13 10 16v6h4v-4h4v4h8v-4h4v4h4v-6c6-3 10-9 10-16C54 15 46 6 32 6z"
                    fill="#2b7fff"
                />
                {/* Left eye */}
                <ellipse cx="24" cy="26" rx="5" ry="6" fill="#18181b" />
                {/* Right eye */}
                <ellipse cx="40" cy="26" rx="5" ry="6" fill="#18181b" />
                {/* Nose */}
                <path d="M30 34 L32 30 L34 34 Z" fill="#18181b" />
                {/* Teeth dividers */}
                <line x1="28" y1="48" x2="28" y2="42" stroke="#18181b" strokeWidth="2" />
                <line x1="36" y1="48" x2="36" y2="42" stroke="#18181b" strokeWidth="2" />
            </svg>
        </>
    )
}