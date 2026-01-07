// ============================================
// COMPONENT: Navbar
// Main navigation bar component - FIXED
// ============================================

"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
	RiShoppingBag3Line,
	RiUserLine,
	RiHeartLine,
	RiPercentLine,
	RiPhoneLine,
	RiMapPinLine,
} from "react-icons/ri";
import { cn } from "../../../lib/utils";
import { useScrollPosition, useIsDesktop } from "../../../hooks";
import type { NavigationItem } from "../../../lib/types";
import { IconButton } from "../../ui";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { CONTACT_INFO } from "../../../lib/constants";
import "./Navbar.css";

// ==================== TYPES ====================

export interface NavbarProps {
	items: NavigationItem[];
	wishlistCount?: number;
	cartCount?: number;
}

// ==================== COMPONENT ====================

export const Navbar: React.FC<NavbarProps> = ({
	items,
	wishlistCount = 0,
	cartCount = 0,
}) => {
	const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Refs for hover intent
	const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const menuContainerRef = useRef<HTMLDivElement>(null);

	const { isScrolled } = useScrollPosition({ threshold: 30 });
	const isDesktop = useIsDesktop();

	// Close mobile menu on desktop
	useEffect(() => {
		if (!isDesktop) return;
		if (!isMobileMenuOpen) return;

		const raf = window.requestAnimationFrame(() => {
			setIsMobileMenuOpen(false);
		});

		return () => window.cancelAnimationFrame(raf);
	}, [isDesktop, isMobileMenuOpen]);

	// Handle escape key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setActiveMenuId(null);
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current);
			}
		};
	}, []);

	// Menu handlers with delay
	const handleMenuEnter = useCallback((id: string) => {
		// Cancel any pending close
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setActiveMenuId(id);
	}, []);

	const handleMenuLeave = useCallback(() => {
		// Delay closing to allow cursor to move to mega menu
		closeTimeoutRef.current = setTimeout(() => {
			setActiveMenuId(null);
		}, 150); // 150ms delay before closing
	}, []);

	const handleMegaMenuEnter = useCallback(() => {
		// Cancel the close timeout when entering mega menu
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
	}, []);

	const handleMegaMenuLeave = useCallback(() => {
		// Close immediately when leaving mega menu
		setActiveMenuId(null);
	}, []);

	// Mobile menu handlers
	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen((prev) => !prev);
	}, []);

	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(false);
	}, []);

	// Find active menu item
	const activeMenuItem = items.find((item) => item.id === activeMenuId);

	return (
		<header className={cn("navbar", isScrolled && "navbar--scrolled")}>
			{/* ============ UTILITY BAR (Desktop) ============ */}
			<div className="navbar__utility">
				<div className="navbar__utility-container">
					<div className="navbar__utility-left">
						<a
							href={`tel:${CONTACT_INFO.phone.replace(
								/\s/g,
								""
							)}`}
							className="navbar__utility-link">
							<RiPhoneLine className="navbar__utility-icon" />
							<span>{CONTACT_INFO.phone}</span>
						</a>
						<Link href="/stores" className="navbar__utility-link">
							<RiMapPinLine className="navbar__utility-icon" />
							<span>Store Locator</span>
						</Link>
					</div>

					<div className="navbar__utility-right">
						<Link
							href="/track-order"
							className="navbar__utility-link">
							Track Your Order
						</Link>
						<Link href="/help" className="navbar__utility-link">
							Help & Support
						</Link>
					</div>
				</div>
			</div>

			{/* ============ MAIN NAV BAR ============ */}
			<nav
				className="navbar__main"
				role="navigation"
				aria-label="Main navigation"
				ref={menuContainerRef}>
				<div className="navbar__container">
					{/* Mobile Menu Toggle */}
					<button
						className={cn(
							"navbar__hamburger",
							isMobileMenuOpen && "navbar__hamburger--active"
						)}
						onClick={toggleMobileMenu}
						aria-label={
							isMobileMenuOpen ? "Close menu" : "Open menu"
						}
						aria-expanded={isMobileMenuOpen}>
						<span className="navbar__hamburger-line navbar__hamburger-line--1" />
						<span className="navbar__hamburger-line navbar__hamburger-line--2" />
						<span className="navbar__hamburger-line navbar__hamburger-line--3" />
					</button>

					{/* Logo */}
					<Link href="/" className="navbar__logo">
						<span className="navbar__logo-men">Men</span>
						<span className="navbar__logo-cloth">Cloth</span>
						<span className="navbar__logo-underline" />
					</Link>

					{/* Desktop Navigation Links */}
					<div className="navbar__links">
						{items.map((item) => (
							<div
								key={item.id}
								className="navbar__link-wrapper"
								onMouseEnter={() => handleMenuEnter(item.id)}
								onMouseLeave={handleMenuLeave}>
								<NavLink
									href={`/collections/${item.id}`}
									label={item.label}
									isActive={activeMenuId === item.id}
								/>
							</div>
						))}

						{/* Sale Button */}
						<Link href="/sale" className="navbar__sale-btn">
							<RiPercentLine className="navbar__sale-icon" />
							<span>Sale</span>
						</Link>
					</div>

					{/* Right Actions */}
					<div className="navbar__actions">
						<IconButton
							icon={<RiUserLine />}
							label="My Account"
							href="/account"
							variant="default"
							size="md"
							tooltip
							tooltipPosition="bottom"
							className="navbar__action-btn navbar__action-btn--desktop"
						/>

						<IconButton
							icon={<RiHeartLine />}
							label="Wishlist"
							href="/wishlist"
							variant="default"
							size="md"
							badge={
								wishlistCount > 0 ? wishlistCount : undefined
							}
							tooltip
							tooltipPosition="bottom"
							className="navbar__action-btn navbar__action-btn--desktop"
						/>

						<IconButton
							icon={<RiShoppingBag3Line />}
							label="Shopping Cart"
							href="/cart"
							variant="default"
							size="md"
							badge={cartCount > 0 ? cartCount : undefined}
							tooltip
							tooltipPosition="bottom"
							className="navbar__action-btn"
						/>
					</div>
				</div>

				{/* ============ MEGA MENU ============ */}
				{activeMenuItem && (
					<MegaMenu
						item={activeMenuItem}
						isActive={activeMenuId === activeMenuItem.id}
						onMouseEnter={handleMegaMenuEnter}
						onMouseLeave={handleMegaMenuLeave}
					/>
				)}
			</nav>

			{/* ============ MOBILE MENU ============ */}
			<MobileMenu
				items={items}
				isOpen={isMobileMenuOpen}
				onClose={closeMobileMenu}
			/>
		</header>
	);
};

export default Navbar;
