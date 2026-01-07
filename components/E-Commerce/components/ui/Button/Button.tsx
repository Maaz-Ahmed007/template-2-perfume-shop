// ============================================
// COMPONENT: Button
// Primary button component with variants
// ============================================

"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "../../../lib/utils";
import { LoadingSpinner } from "../LoadingSpinner";
import "./Button.css";

// ==================== TYPES ====================

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	isLoading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	href?: string;
	external?: boolean;
	children: React.ReactNode;
}

// ==================== COMPONENT ====================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			fullWidth = false,
			isLoading = false,
			leftIcon,
			rightIcon,
			href,
			external = false,
			disabled,
			className,
			children,
			type = "button",
			...props
		},
		ref
	) => {
		// Build class names
		const buttonClasses = cn(
			"btn",
			`btn--${variant}`,
			`btn--${size}`,
			fullWidth && "btn--full-width",
			isLoading && "btn--loading",
			disabled && "btn--disabled",
			className
		);

		// Content with icons
		const content = (
			<>
				{isLoading && (
					<span className="btn__spinner">
						<LoadingSpinner size="sm" color="currentColor" />
					</span>
				)}
				{leftIcon && !isLoading && (
					<span className="btn__icon btn__icon--left">
						{leftIcon}
					</span>
				)}
				<span className="btn__text">{children}</span>
				{rightIcon && !isLoading && (
					<span className="btn__icon btn__icon--right">
						{rightIcon}
					</span>
				)}
			</>
		);

		// Render as Link if href is provided
		if (href && !disabled) {
			if (external) {
				return (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className={buttonClasses}>
						{content}
					</a>
				);
			}

			return (
				<Link href={href} className={buttonClasses}>
					{content}
				</Link>
			);
		}

		// Render as button
		return (
			<button
				ref={ref}
				type={type}
				disabled={disabled || isLoading}
				className={buttonClasses}
				{...props}>
				{content}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;