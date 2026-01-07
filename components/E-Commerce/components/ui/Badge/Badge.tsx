// ============================================
// COMPONENT: Badge
// Label badges for products (New, Sale, Hot, etc.)
// ============================================

"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import "./Badge.css";

// ==================== TYPES ====================

export type BadgeVariant =
	| "default"
	| "new"
	| "sale"
	| "hot"
	| "soldOut"
	| "limited";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
	variant?: BadgeVariant;
	size?: BadgeSize;
	animate?: boolean;
	rounded?: boolean;
	children: React.ReactNode;
	className?: string;
}

// ==================== COMPONENT ====================

export const Badge: React.FC<BadgeProps> = ({
	variant = "default",
	size = "md",
	animate = false,
	rounded = true,
	children,
	className,
}) => {
	const badgeClasses = cn(
		"badge",
		`badge--${variant}`,
		`badge--${size}`,
		rounded && "badge--rounded",
		animate && "badge--animate",
		className
	);

	return <span className={badgeClasses}>{children}</span>;
};

export default Badge;
