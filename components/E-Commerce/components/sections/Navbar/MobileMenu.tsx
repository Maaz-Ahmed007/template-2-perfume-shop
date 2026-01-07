// ============================================
// COMPONENT: MobileMenu
// Mobile slide-out navigation menu
// ============================================

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	RiArrowRightLine,
	RiFireLine,
	RiUserLine,
	RiHeartLine,
	RiPhoneLine,
} from "react-icons/ri";
import { cn, getDelayStyle } from "../../../lib/utils";
import { useBodyScrollLock } from "../../../hooks";
import type { NavigationItem } from "../../../lib/types";
import { Badge } from "../../ui";
import { CONTACT_INFO } from "../../../lib/constants";
import "./MobileMenu.css";

// ==================== TYPES ====================

export interface MobileMenuProps {
	items: NavigationItem[];
	isOpen: boolean;
	onClose: () => void;
}

// ==================== COMPONENT ====================

export const MobileMenu: React.FC<MobileMenuProps> = ({
	items,
	isOpen,
	onClose,
}) => {
	const [expandedId, setExpandedId] = useState<string | null>(null);

	// Lock body scroll when menu is open
	useBodyScrollLock(isOpen);

	// Toggle submenu
	const toggleSubmenu = (id: string) => {
		setExpandedId((prev) => (prev === id ? null : id));
	};

	// Handle link click - close menu
	const handleLinkClick = () => {
		onClose();
		setExpandedId(null);
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className={cn(
					"mobile-menu-backdrop",
					isOpen && "mobile-menu-backdrop--visible"
				)}
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Menu Panel */}
			<nav
				className={cn("mobile-menu", isOpen && "mobile-menu--open")}
				aria-label="Mobile navigation"
				aria-hidden={!isOpen}>
				<div className="mobile-menu__inner">
					{/* Sale Banner */}
					<Link
						href="/sale"
						className="mobile-menu__sale-banner"
						onClick={handleLinkClick}>
						<div className="mobile-menu__sale-icon-wrapper">
							<RiFireLine className="mobile-menu__sale-icon" />
						</div>
						<div className="mobile-menu__sale-content">
							<p className="mobile-menu__sale-title">
								Eid Sale Live!
							</p>
							<p className="mobile-menu__sale-subtitle">
								Up to 50% Off Everything
							</p>
						</div>
						<RiArrowRightLine className="mobile-menu__sale-arrow" />
					</Link>

					{/* Navigation Items */}
					<div className="mobile-menu__nav">
						{items.map((item, idx) => (
							<div
								key={item.id}
								className="mobile-menu__item animate-slideInLeft"
								style={getDelayStyle(idx, 50)}>
								<button
									className={cn(
										"mobile-menu__trigger",
										expandedId === item.id &&
											"mobile-menu__trigger--expanded"
									)}
									onClick={() => toggleSubmenu(item.id)}
									aria-expanded={expandedId === item.id}>
									<span className="mobile-menu__trigger-text">
										{item.label}
									</span>
									<RiArrowRightLine
										className={cn(
											"mobile-menu__trigger-icon",
											expandedId === item.id &&
												"mobile-menu__trigger-icon--rotated"
										)}
									/>
								</button>

								{/* Submenu */}
								<div
									className={cn(
										"mobile-menu__submenu",
										expandedId === item.id &&
											"mobile-menu__submenu--open"
									)}>
									<div className="mobile-menu__submenu-inner">
										{item.categories.map((category) => (
											<Link
												key={category.name}
												href={category.href}
												className="mobile-menu__submenu-link"
												onClick={handleLinkClick}>
												<span>{category.name}</span>
												{category.isNew && (
													<Badge
														variant="new"
														size="sm">
														New
													</Badge>
												)}
												{category.isHot && (
													<Badge
														variant="hot"
														size="sm">
														Hot
													</Badge>
												)}
											</Link>
										))}

										<Link
											href={`/collections/${item.id}`}
											className="mobile-menu__submenu-view-all"
											onClick={handleLinkClick}>
											<span>View All</span>
											<RiArrowRightLine className="mobile-menu__submenu-view-all-icon" />
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Bottom Actions */}
					<div className="mobile-menu__actions">
						<div className="mobile-menu__actions-grid">
							<Link
								href="/account"
								className="mobile-menu__action-btn"
								onClick={handleLinkClick}>
								<RiUserLine className="mobile-menu__action-icon" />
								<span>Account</span>
							</Link>
							<Link
								href="/wishlist"
								className="mobile-menu__action-btn"
								onClick={handleLinkClick}>
								<RiHeartLine className="mobile-menu__action-icon" />
								<span>Wishlist</span>
							</Link>
						</div>

						<a
							href={`tel:${CONTACT_INFO.phone.replace(
								/\s/g,
								""
							)}`}
							className="mobile-menu__phone-btn">
							<RiPhoneLine className="mobile-menu__phone-icon" />
							<span>Call Us: {CONTACT_INFO.phone}</span>
						</a>
					</div>
				</div>
			</nav>
		</>
	);
};

export default MobileMenu;
