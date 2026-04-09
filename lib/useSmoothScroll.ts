import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initialises Lenis smooth scrolling — gives the same buttery momentum
 * inertia-scroll feel as cardz.pro. Mount this once at the app root.
 */
export function useSmoothScroll() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return
        }

        const lenis = new Lenis({
            // How long (seconds) the momentum tail lasts — 1.2 feels luxurious
            duration: 0.9,
            // Expo ease-out: fast initial response, long silky tail
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            // Slightly softer wheel sensitivity
            wheelMultiplier: 0.8,
            // Natural touch sensitivity
            touchMultiplier: 1.2,
        })

        let rafId: number
        let isRunning = true

        function raf(time: number) {
            if (!isRunning) return
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        function handleVisibilityChange() {
            if (document.hidden) {
                isRunning = false
                cancelAnimationFrame(rafId)
            } else if (!isRunning) {
                isRunning = true
                rafId = requestAnimationFrame(raf)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            isRunning = false
            cancelAnimationFrame(rafId)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            lenis.destroy()
        }
    }, []);
};
