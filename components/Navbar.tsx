// src/components/Navbar.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MagneticElement from "./ui/MagneticElement";
import {
	HiOutlineShoppingBag,
	HiOutlineHeart,
	HiOutlineSearch,
	HiOutlineUser,
} from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";

const socialIcons = {
	instagram: FaInstagram,
	tiktok: FaTiktok,
	facebook: FaFacebookF,
};

export default function Navbar() {
	const { isScrolled } = useScrollPosition(50);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [activeLink, setActiveLink] = useState("home");
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const isMobile = useMediaQuery("(max-width: 1023px)");

	useEffect(() => {
		if (!isMobile && isMobileMenuOpen) {
			setIsMobileMenuOpen(false);
		}
	}, [isMobile, isMobileMenuOpen]);

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen((prev) => !prev);
	}, []);

	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(false);
	}, []);

	const handleNavClick = useCallback(
		(linkId: string) => {
			setActiveLink(linkId);
			closeMobileMenu();
		},
		[closeMobileMenu]
	);

	return (
		<>
			{/* Main Navigation */}
			<header
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
					isScrolled
						? "bg-ivory-50/95 backdrop-blur-xl shadow-soft py-2"
						: "bg-transparent py-3 sm:py-4"
				)}
			>
				<nav className="container-luxury">
					<div className="flex items-center justify-between gap-4">
						{/* Logo - Simple without hover animation */}
						<Link
							href="/"
							className="relative z-10 flex-shrink-0"
							onClick={() => handleNavClick("home")}
						>
							<div className="flex flex-col">
								<span
									className={cn(
										"font-heading text-lg sm:text-xl lg:text-2xl font-bold tracking-wider transition-colors duration-300",
										isScrolled
											? "text-noir-900"
											: "text-ivory-50"
									)}
								>
									{SITE_CONFIG.name}
								</span>
								<span
									className={cn(
										"text-[7px] sm:text-[8px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 -mt-0.5",
										isScrolled
											? "text-gold-600"
											: "text-gold-400/80"
									)}
								>
									{SITE_CONFIG.tagline}
								</span>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center gap-0.5">
							{NAV_LINKS.map((link) => (
								<Link
									key={link.id}
									href={link.href}
									onClick={() => handleNavClick(link.id)}
									onMouseEnter={() => setHoveredLink(link.id)}
									onMouseLeave={() => setHoveredLink(null)}
									className={cn(
										"relative px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-300",
										isScrolled
											? activeLink === link.id
												? "text-gold-600"
												: "text-noir-500 hover:text-noir-800"
											: activeLink === link.id
											? "text-gold-400"
											: "text-ivory-300/80 hover:text-ivory-100"
									)}
								>
									{link.name}

									<span
										className={cn(
											"absolute bottom-0.5 left-3 right-3 h-px transition-all duration-300 ease-out",
											isScrolled
												? "bg-gold-500"
												: "bg-gold-400",
											activeLink === link.id ||
												hoveredLink === link.id
												? "opacity-100 scale-x-100"
												: "opacity-0 scale-x-0"
										)}
										style={{
											transformOrigin: "left center",
										}}
									/>
								</Link>
							))}
						</div>

						{/* Right Actions */}
						<div className="flex items-center gap-0.5">
							<MagneticElement strength={0.12}>
								<button
									onClick={() => setIsSearchOpen(true)}
									className={cn(
										"p-2 rounded-full transition-all duration-300",
										isScrolled
											? "text-noir-500 hover:bg-noir-100 hover:text-noir-800"
											: "text-ivory-300 hover:bg-white/8 hover:text-ivory-100"
									)}
									aria-label="Search"
								>
									<HiOutlineSearch className="w-[18px] h-[18px]" />
								</button>
							</MagneticElement>

							<MagneticElement
								strength={0.12}
								className="hidden md:block"
							>
								<button
									className={cn(
										"p-2 rounded-full transition-all duration-300",
										isScrolled
											? "text-noir-500 hover:bg-noir-100 hover:text-noir-800"
											: "text-ivory-300 hover:bg-white/8 hover:text-ivory-100"
									)}
									aria-label="Account"
								>
									<HiOutlineUser className="w-[18px] h-[18px]" />
								</button>
							</MagneticElement>

							<MagneticElement
								strength={0.12}
								className="hidden md:block"
							>
								<button
									className={cn(
										"relative p-2 rounded-full transition-all duration-300",
										isScrolled
											? "text-noir-500 hover:bg-noir-100 hover:text-noir-800"
											: "text-ivory-300 hover:bg-white/8 hover:text-ivory-100"
									)}
									aria-label="Wishlist"
								>
									<HiOutlineHeart className="w-[18px] h-[18px]" />
									<span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full">
										3
									</span>
								</button>
							</MagneticElement>

							<MagneticElement strength={0.12}>
								<button
									className={cn(
										"relative p-2 rounded-full transition-all duration-300",
										isScrolled
											? "text-noir-500 hover:bg-noir-100 hover:text-noir-800"
											: "text-ivory-300 hover:bg-white/8 hover:text-ivory-100"
									)}
									aria-label="Cart"
								>
									<HiOutlineShoppingBag className="w-[18px] h-[18px]" />
									<span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-gold-500 text-noir-900 text-[8px] font-bold flex items-center justify-center rounded-full">
										2
									</span>
								</button>
							</MagneticElement>

							<button
								onClick={toggleMobileMenu}
								className={cn(
									"lg:hidden p-2 rounded-full transition-all duration-300 ml-0.5",
									isScrolled
										? "text-noir-600 hover:bg-noir-100"
										: "text-ivory-200 hover:bg-white/8"
								)}
								aria-label={
									isMobileMenuOpen
										? "Close Menu"
										: "Open Menu"
								}
							>
								<div className="relative w-4 h-4 flex items-center justify-center">
									<span
										className={cn(
											"absolute w-3.5 h-[1.5px] rounded-full transition-all duration-300",
											isScrolled
												? "bg-noir-600"
												: "bg-ivory-200",
											isMobileMenuOpen
												? "rotate-45"
												: "-translate-y-1"
										)}
									/>
									<span
										className={cn(
											"absolute w-3.5 h-[1.5px] rounded-full transition-all duration-300",
											isScrolled
												? "bg-noir-600"
												: "bg-ivory-200",
											isMobileMenuOpen && "opacity-0"
										)}
									/>
									<span
										className={cn(
											"absolute w-3.5 h-[1.5px] rounded-full transition-all duration-300",
											isScrolled
												? "bg-noir-600"
												: "bg-ivory-200",
											isMobileMenuOpen
												? "-rotate-45"
												: "translate-y-1"
										)}
									/>
								</div>
							</button>
						</div>
					</div>
				</nav>

				<div
					className={cn(
						"absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500",
						isScrolled ? "opacity-100" : "opacity-0"
					)}
				>
					<div className="h-full bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
				</div>
			</header>

			{/* Mobile Menu */}
			<div
				className={cn(
					"fixed inset-0 z-40 lg:hidden transition-all duration-500",
					isMobileMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				)}
			>
				<div
					className={cn(
						"absolute inset-0 bg-noir-950/75 backdrop-blur-sm transition-opacity duration-500",
						isMobileMenuOpen ? "opacity-100" : "opacity-0"
					)}
					onClick={closeMobileMenu}
				/>

				<div
					className={cn(
						"absolute top-0 right-0 bottom-0 w-full max-w-[280px] sm:max-w-[320px] bg-ivory-50 shadow-2xl transition-transform duration-500 ease-out flex flex-col",
						isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
					)}
				>
					<div className="flex items-center justify-between p-4 border-b border-ivory-200">
						<div>
							<span className="font-heading text-base font-bold text-noir-900">
								{SITE_CONFIG.name}
							</span>
							<span className="block text-[7px] tracking-[0.2em] uppercase text-gold-600 -mt-0.5">
								{SITE_CONFIG.tagline}
							</span>
						</div>
						<button
							onClick={closeMobileMenu}
							className="p-1.5 rounded-full hover:bg-ivory-200 transition-colors"
							aria-label="Close"
						>
							<HiXMark className="w-5 h-5 text-noir-500" />
						</button>
					</div>

					<nav className="flex-1 overflow-y-auto py-4 px-3 no-scrollbar">
						<ul className="space-y-0.5">
							{NAV_LINKS.map((link, index) => (
								<li
									key={link.id}
									style={{
										opacity: isMobileMenuOpen ? 1 : 0,
										transform: isMobileMenuOpen
											? "translateX(0)"
											: "translateX(16px)",
										transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${
											index * 40 + 80
										}ms`,
									}}
								>
									<Link
										href={link.href}
										onClick={() => handleNavClick(link.id)}
										className={cn(
											"flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
											activeLink === link.id
												? "bg-gold-500 text-noir-900"
												: "text-noir-600 hover:bg-ivory-200"
										)}
									>
										<span
											className={cn(
												"text-[9px] font-mono w-4",
												activeLink === link.id
													? "text-noir-900/50"
													: "text-noir-400"
											)}
										>
											0{index + 1}
										</span>
										<span className="font-medium text-sm tracking-wide">
											{link.name}
										</span>
									</Link>
								</li>
							))}
						</ul>

						<div className="mt-6 pt-6 border-t border-ivory-200">
							<div className="grid grid-cols-2 gap-2">
								<button className="flex flex-col items-center gap-1.5 p-3 bg-ivory-100 rounded-xl text-noir-500 hover:bg-ivory-200 transition-colors">
									<HiOutlineUser className="w-4 h-4" />
									<span className="text-[10px] font-medium">
										Account
									</span>
								</button>
								<button className="flex flex-col items-center gap-1.5 p-3 bg-ivory-100 rounded-xl text-noir-500 hover:bg-ivory-200 transition-colors relative">
									<HiOutlineHeart className="w-4 h-4" />
									<span className="text-[10px] font-medium">
										Wishlist
									</span>
									<span className="absolute top-2 right-2 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full">
										3
									</span>
								</button>
							</div>
						</div>
					</nav>

					<div className="p-4 border-t border-ivory-200 bg-ivory-100/50 safe-bottom">
						<div className="flex items-center justify-center gap-2.5 mb-3">
							{SOCIAL_LINKS.map((social) => {
								const Icon =
									socialIcons[
										social.id as keyof typeof socialIcons
									];
								return (
									<a
										key={social.id}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="w-8 h-8 flex items-center justify-center rounded-full bg-ivory-200 text-noir-500 hover:bg-gold-500 hover:text-noir-900 transition-all duration-300"
										aria-label={social.name}
									>
										<Icon className="w-3.5 h-3.5" />
									</a>
								);
							})}
						</div>
						<p className="text-center text-[9px] text-noir-400">
							Crafted in {SITE_CONFIG.location}
						</p>
					</div>
				</div>
			</div>

			{/* Search Modal */}
			<div
				className={cn(
					"fixed inset-0 z-50 transition-all duration-400",
					isSearchOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				)}
			>
				<div
					className="absolute inset-0 bg-noir-900/80 backdrop-blur-md"
					onClick={() => setIsSearchOpen(false)}
				/>

				<div
					className={cn(
						"absolute top-0 left-0 right-0 bg-ivory-50 shadow-2xl transition-transform duration-500 safe-top",
						isSearchOpen ? "translate-y-0" : "-translate-y-full"
					)}
				>
					<div className="container-luxury py-4">
						<div className="flex items-center gap-3">
							<div className="flex-1 relative">
								<HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-400" />
								<input
									type="text"
									placeholder="Search perfumes..."
									className="w-full pl-11 pr-4 py-3 bg-ivory-200 rounded-xl text-sm text-noir-800 placeholder-noir-400 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all"
									autoFocus={isSearchOpen}
								/>
							</div>
							<button
								onClick={() => setIsSearchOpen(false)}
								className="p-2 hover:bg-ivory-200 rounded-xl transition-colors"
								aria-label="Close"
							>
								<HiXMark className="w-5 h-5 text-noir-500" />
							</button>
						</div>

						<div className="mt-3 flex flex-wrap gap-2">
							{[
								"Oud",
								"Rose",
								"New",
								"Gifts",
								"For Him",
								"For Her",
							].map((term) => (
								<button
									key={term}
									className="px-3 py-1.5 bg-ivory-200 hover:bg-gold-100 text-noir-600 hover:text-gold-700 rounded-full text-xs font-medium transition-all"
								>
									{term}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
