"use client"

export { };

declare global {
    interface Window {
        plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    }
}

export function trackPlausible(event: string, props: Record<string, any> = {}) {
    if (typeof window !== "undefined" && typeof window.plausible === "function") {
        window.plausible(event, { props })
    }
}