// ============================================
// COMPONENT: NavLink
// Individual navigation link with underline animation
// ============================================

"use client";

import React from "react";
import Link from "next/link";
import { cn } from "../../../lib/utils";
import "./NavLink.css";

// ==================== TYPES ====================

export interface NavLinkProps {
	href: string;
	label: string;
	isActive?: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: () => void;
	className?: string;
}

// ==================== COMPONENT ====================

export const NavLink: React.FC<NavLinkProps> = ({
	href,
	label,
	isActive = false,
	onMouseEnter,
	onMouseLeave,
	onClick,
	className,
}) => {
	return (
		<Link
			href={href}
			className={cn(
				"nav-link",
				isActive && "nav-link--active",
				className
			)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}>
			<span className="nav-link__text">{label}</span>
			<span className="nav-link__underline" />
		</Link>
	);
};

export default NavLink;
