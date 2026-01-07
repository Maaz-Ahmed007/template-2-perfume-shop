// ============================================
// MENCLOTH - UTILITY FUNCTIONS
// Helper functions used across the application
// ============================================

import { BREAKPOINTS } from "./constants";
import type { AnimationDelayProps, BreakpointKey } from "./types";

// ==================== CLASS NAME UTILITIES ====================

/**
 * Combines class names, filtering out falsy values
 */
export function cn(
	...classes: (string | boolean | undefined | null)[]
): string {
	return classes.filter(Boolean).join(" ");
}

/**
 * Creates conditional class names
 */
export function conditionalClass(
	condition: boolean,
	trueClass: string,
	falseClass: string = ""
): string {
	return condition ? trueClass : falseClass;
}

// ==================== ANIMATION UTILITIES ====================

/**
 * Calculates staggered animation delay
 */
export function getAnimationDelay({
	index,
	baseDelay = 0,
	increment = 50,
}: AnimationDelayProps): string {
	return `${baseDelay + index * increment}ms`;
}

/**
 * Creates style object with animation delay
 */
export function getDelayStyle(
	index: number,
	increment: number = 50
): React.CSSProperties {
	return { animationDelay: `${index * increment}ms` };
}

// ==================== STRING UTILITIES ====================

/**
 * Generates a URL-friendly slug from a string
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/**
 * Truncates text to a specified length
 */
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength).trim() + "...";
}

/**
 * Capitalizes the first letter of each word
 */
export function titleCase(text: string): string {
	return text
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

// ==================== NUMBER UTILITIES ====================

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Calculates discount percentage
 */
export function calculateDiscount(original: number, sale: number): number {
	if (original <= 0) return 0;
	return Math.round(((original - sale) / original) * 100);
}

// ==================== RESPONSIVE UTILITIES ====================

/**
 * Checks if we're on the client side
 */
export function isClient(): boolean {
	return typeof window !== "undefined";
}

/**
 * Gets current breakpoint based on window width
 */
export function getCurrentBreakpoint(): BreakpointKey | null {
	if (!isClient()) return null;

	const width = window.innerWidth;

	if (width >= BREAKPOINTS["2xl"]) return "2xl";
	if (width >= BREAKPOINTS.xl) return "xl";
	if (width >= BREAKPOINTS.lg) return "lg";
	if (width >= BREAKPOINTS.md) return "md";
	if (width >= BREAKPOINTS.sm) return "sm";

	return null;
}

/**
 * Checks if current viewport matches or exceeds breakpoint
 */
export function isBreakpoint(breakpoint: BreakpointKey): boolean {
	if (!isClient()) return false;
	return window.innerWidth >= BREAKPOINTS[breakpoint];
}

// ==================== DOM UTILITIES ====================

/**
 * Locks body scroll (for modals/overlays)
 */
export function lockBodyScroll(): void {
	if (!isClient()) return;
	document.body.style.overflow = "hidden";
	document.body.style.paddingRight = `${getScrollbarWidth()}px`;
}

/**
 * Unlocks body scroll
 */
export function unlockBodyScroll(): void {
	if (!isClient()) return;
	document.body.style.overflow = "";
	document.body.style.paddingRight = "";
}

/**
 * Gets scrollbar width
 */
export function getScrollbarWidth(): number {
	if (!isClient()) return 0;
	return window.innerWidth - document.documentElement.clientWidth;
}

// ==================== EVENT UTILITIES ====================

/**
 * Debounces a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null;

	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Throttles a function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle = false;

	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

// ==================== KEYBOARD UTILITIES ====================

/**
 * Common key codes for accessibility
 */
export const Keys = {
	Enter: "Enter",
	Space: " ",
	Escape: "Escape",
	ArrowUp: "ArrowUp",
	ArrowDown: "ArrowDown",
	ArrowLeft: "ArrowLeft",
	ArrowRight: "ArrowRight",
	Tab: "Tab",
} as const;

/**
 * Checks if event key matches
 */
export function isKey(event: KeyboardEvent, key: keyof typeof Keys): boolean {
	return event.key === Keys[key];
}