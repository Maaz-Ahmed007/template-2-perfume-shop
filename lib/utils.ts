// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "PKR"): string {
	return new Intl.NumberFormat("en-PK", {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}
