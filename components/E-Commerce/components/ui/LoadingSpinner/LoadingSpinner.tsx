// ============================================
// COMPONENT: LoadingSpinner
// Loading indicator spinner
// ============================================

"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import "./LoadingSpinner.css";

// ==================== TYPES ====================

export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "default" | "dots" | "pulse";

export interface LoadingSpinnerProps {
	size?: SpinnerSize;
	variant?: SpinnerVariant;
	color?: string;
	className?: string;
	label?: string;
}

// ==================== COMPONENT ====================

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = "md",
	variant = "default",
	color,
	className,
	label = "Loading...",
}) => {
	if (variant === "dots") {
		return (
			<div
				className={cn(
					"spinner-dots",
					`spinner-dots--${size}`,
					className
				)}
				role="status"
				aria-label={label}>
				<span
					className="spinner-dots__dot"
					style={{ backgroundColor: color }}
				/>
				<span
					className="spinner-dots__dot"
					style={{ backgroundColor: color }}
				/>
				<span
					className="spinner-dots__dot"
					style={{ backgroundColor: color }}
				/>
				<span className="sr-only">{label}</span>
			</div>
		);
	}

	if (variant === "pulse") {
		return (
			<div
				className={cn(
					"spinner-pulse",
					`spinner-pulse--${size}`,
					className
				)}
				role="status"
				aria-label={label}
				style={{ backgroundColor: color }}>
				<span className="sr-only">{label}</span>
			</div>
		);
	}

	return (
		<div
			className={cn("spinner", `spinner--${size}`, className)}
			role="status"
			aria-label={label}>
			<svg
				className="spinner__svg"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle
					className="spinner__track"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="3"
				/>
				<circle
					className="spinner__indicator"
					cx="12"
					cy="12"
					r="10"
					stroke={color || "currentColor"}
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
			<span className="sr-only">{label}</span>
		</div>
	);
};

export default LoadingSpinner;