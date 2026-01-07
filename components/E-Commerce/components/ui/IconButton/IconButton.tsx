// ============================================
// COMPONENT: IconButton
// Icon-only button with tooltip support
// ============================================

"use client";

import React, { forwardRef, useState } from "react";
import Link from "next/link";
import { cn } from "../../../lib/utils";
import "./IconButton.css";

// ==================== TYPES ====================

export type IconButtonVariant = "default" | "filled" | "outline" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: React.ReactNode;
	variant?: IconButtonVariant;
	size?: IconButtonSize;
	label: string; // Required for accessibility
	tooltip?: boolean;
	tooltipPosition?: "top" | "bottom" | "left" | "right";
	badge?: number | string;
	badgeColor?: "black" | "red" | "green";
	href?: string;
	external?: boolean;
	isActive?: boolean;
}

// ==================== COMPONENT ====================

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			icon,
			variant = "default",
			size = "md",
			label,
			tooltip = false,
			tooltipPosition = "bottom",
			badge,
			badgeColor = "black",
			href,
			external = false,
			isActive = false,
			disabled,
			className,
			...props
		},
		ref
	) => {
		const [showTooltip, setShowTooltip] = useState(false);

		const buttonClasses = cn(
			"icon-btn",
			`icon-btn--${variant}`,
			`icon-btn--${size}`,
			isActive && "icon-btn--active",
			disabled && "icon-btn--disabled",
			className
		);

		const content = (
			<>
				<span className="icon-btn__icon">{icon}</span>

				{/* Badge */}
				{badge !== undefined && (
					<span
						className={cn(
							"icon-btn__badge",
							`icon-btn__badge--${badgeColor}`
						)}>
						{badge}
					</span>
				)}

				{/* Tooltip */}
				{tooltip && showTooltip && (
					<span
						className={cn(
							"icon-btn__tooltip",
							`icon-btn__tooltip--${tooltipPosition}`
						)}>
						{label}
					</span>
				)}

				{/* Screen reader text */}
				<span className="sr-only">{label}</span>
			</>
		);

		const handlers = {
			onMouseEnter: () => tooltip && setShowTooltip(true),
			onMouseLeave: () => tooltip && setShowTooltip(false),
			onFocus: () => tooltip && setShowTooltip(true),
			onBlur: () => tooltip && setShowTooltip(false),
		};

		// Render as Link if href is provided
		if (href && !disabled) {
			if (external) {
				return (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className={buttonClasses}
						aria-label={label}
						{...handlers}>
						{content}
					</a>
				);
			}

			return (
				<Link
					href={href}
					className={buttonClasses}
					aria-label={label}
					{...handlers}>
					{content}
				</Link>
			);
		}

		return (
			<button
				ref={ref}
				type="button"
				disabled={disabled}
				className={buttonClasses}
				aria-label={label}
				{...handlers}
				{...props}>
				{content}
			</button>
		);
	}
);

IconButton.displayName = "IconButton";

export default IconButton;
