// src/components/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MagneticElement from "./ui/MagneticElement";
import {
	HiOutlineLocationMarker,
	HiOutlineMail,
	HiOutlinePhone,
	HiOutlineClock,
	HiArrowRight,
	HiChevronDown,
} from "react-icons/hi";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { SiVisa, SiMastercard, SiApplepay } from "react-icons/si";
import { BsCreditCard2Back } from "react-icons/bs";

const socialIcons = {
	instagram: FaInstagram,
	tiktok: FaTiktok,
	facebook: FaFacebookF,
};

// Footer specific links
const FOOTER_LINKS = {
	shop: [
		{ name: "All Products", href: "/products" },
		{ name: "New Arrivals", href: "/new-arrivals" },
		{ name: "Bestsellers", href: "/bestsellers" },
		{ name: "Gift Sets", href: "/gift-sets" },
		{ name: "Sale", href: "/sale" },
	],
	collections: [
		{ name: "Oud Collection", href: "/collections/oud" },
		{ name: "Floral", href: "/collections/floral" },
		{ name: "Fresh", href: "/collections/fresh" },
		{ name: "Oriental", href: "/collections/oriental" },
		{ name: "Woody", href: "/collections/woody" },
	],
	support: [
		{ name: "Contact Us", href: "/contact" },
		{ name: "FAQs", href: "/faqs" },
		{ name: "Shipping Info", href: "/shipping" },
		{ name: "Returns & Exchange", href: "/returns" },
		{ name: "Track Order", href: "/track-order" },
	],
	company: [
		{ name: "Our Story", href: "/about" },
		{ name: "Store Locator", href: "/stores" },
		{ name: "Careers", href: "/careers" },
		{ name: "Press", href: "/press" },
	],
};

const CONTACT_INFO = {
	address: "DHA Phase 6, Lahore, Pakistan",
	email: "hello@lumiere.pk",
	phone: "+92 300 1234567",
	hours: "Mon - Sat: 11:00 AM - 9:00 PM",
};

export default function Footer() {
	const [email, setEmail] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			setIsSubscribed(true);
			setEmail("");
			setTimeout(() => setIsSubscribed(false), 3000);
		}
	};

	const toggleSection = (section: string) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative bg-noir-950 overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Gradient Orbs */}
				<div
					className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
					style={{
						background:
							"radial-gradient(circle, var(--color-gold-500) 0%, transparent 60%)",
						filter: "blur(80px)",
					}}
				/>
				<div
					className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02]"
					style={{
						background:
							"radial-gradient(circle, var(--color-rose-400) 0%, transparent 60%)",
						filter: "blur(60px)",
					}}
				/>

				{/* Subtle Pattern */}
				<div
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-gold-500) 1px, transparent 0)`,
						backgroundSize: "48px 48px",
					}}
				/>
			</div>

			{/* Top Decorative Border */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

			{/* Main Footer Content */}
			<div className="relative z-10">
				{/* Upper Section */}
				<div className="container-wide py-12 lg:py-16">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
						{/* Brand Column */}
						<div className="lg:col-span-4">
							{/* Logo */}
							<Link href="/" className="inline-block mb-5">
								<div className="flex flex-col">
									<span className="font-heading text-2xl sm:text-3xl font-bold text-ivory-50 tracking-wider">
										{SITE_CONFIG.name}
									</span>
									<span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-gold-500 font-medium -mt-1">
										{SITE_CONFIG.tagline}
									</span>
								</div>
							</Link>

							{/* Description */}
							<p className="text-sm text-ivory-400/70 leading-relaxed mb-6 max-w-sm">
								Discover the art of luxury perfumery. Each
								fragrance is handcrafted with the finest
								ingredients to create unforgettable scents that
								define your unique style.
							</p>

							{/* Social Links */}
							<div className="flex items-center gap-3 mb-8">
								{SOCIAL_LINKS.map((social) => {
									const Icon =
										socialIcons[
											social.id as keyof typeof socialIcons
										];
									return (
										<MagneticElement
											key={social.id}
											strength={0.2}
										>
											<a
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												className="w-10 h-10 rounded-full border border-ivory-100/10 flex items-center justify-center text-ivory-400 hover:text-gold-400 hover:border-gold-500/50 hover:bg-gold-500/10 transition-all duration-300"
												aria-label={social.name}
											>
												<Icon className="w-4 h-4" />
											</a>
										</MagneticElement>
									);
								})}
							</div>

							{/* Newsletter - Desktop */}
							<div className="hidden lg:block">
								<h4 className="text-sm font-semibold text-ivory-100 mb-3">
									Stay Updated
								</h4>
								<form
									onSubmit={handleSubscribe}
									className="relative"
								>
									<input
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										placeholder="Enter your email"
										className="w-full bg-ivory-100/5 border border-ivory-100/10 rounded-full py-3 pl-4 pr-12 text-sm text-ivory-100 placeholder-ivory-500 focus:outline-none focus:border-gold-500/50 transition-colors"
										required
									/>
									<button
										type="submit"
										className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold-500 hover:bg-gold-400 flex items-center justify-center text-noir-900 transition-colors duration-300"
										aria-label="Subscribe"
									>
										<HiArrowRight className="w-4 h-4" />
									</button>
								</form>
								{isSubscribed && (
									<p className="text-xs text-gold-400 mt-2">
										Thank you for subscribing!
									</p>
								)}
							</div>
						</div>

						{/* Links Columns - Desktop */}
						<div className="hidden lg:grid lg:col-span-5 lg:grid-cols-3 gap-8">
							{/* Shop Links */}
							<div>
								<h4 className="text-sm font-semibold text-ivory-100 mb-4 tracking-wide">
									Shop
								</h4>
								<ul className="space-y-2.5">
									{FOOTER_LINKS.shop.map((link) => (
										<li key={link.name}>
											<Link
												href={link.href}
												className="text-sm text-ivory-400/70 hover:text-gold-400 transition-colors duration-300 inline-block"
											>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Collections Links */}
							<div>
								<h4 className="text-sm font-semibold text-ivory-100 mb-4 tracking-wide">
									Collections
								</h4>
								<ul className="space-y-2.5">
									{FOOTER_LINKS.collections.map((link) => (
										<li key={link.name}>
											<Link
												href={link.href}
												className="text-sm text-ivory-400/70 hover:text-gold-400 transition-colors duration-300 inline-block"
											>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Support Links */}
							<div>
								<h4 className="text-sm font-semibold text-ivory-100 mb-4 tracking-wide">
									Support
								</h4>
								<ul className="space-y-2.5">
									{FOOTER_LINKS.support.map((link) => (
										<li key={link.name}>
											<Link
												href={link.href}
												className="text-sm text-ivory-400/70 hover:text-gold-400 transition-colors duration-300 inline-block"
											>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Contact Column - Desktop */}
						<div className="hidden lg:block lg:col-span-3">
							<h4 className="text-sm font-semibold text-ivory-100 mb-4 tracking-wide">
								Get In Touch
							</h4>
							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<HiOutlineLocationMarker className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
									<span className="text-sm text-ivory-400/70">
										{CONTACT_INFO.address}
									</span>
								</li>
								<li>
									<a
										href={`mailto:${CONTACT_INFO.email}`}
										className="flex items-center gap-3 text-sm text-ivory-400/70 hover:text-gold-400 transition-colors"
									>
										<HiOutlineMail className="w-5 h-5 text-gold-500 flex-shrink-0" />
										{CONTACT_INFO.email}
									</a>
								</li>
								<li>
									<a
										href={`tel:${CONTACT_INFO.phone.replace(
											/\s/g,
											""
										)}`}
										className="flex items-center gap-3 text-sm text-ivory-400/70 hover:text-gold-400 transition-colors"
									>
										<HiOutlinePhone className="w-5 h-5 text-gold-500 flex-shrink-0" />
										{CONTACT_INFO.phone}
									</a>
								</li>
								<li className="flex items-center gap-3">
									<HiOutlineClock className="w-5 h-5 text-gold-500 flex-shrink-0" />
									<span className="text-sm text-ivory-400/70">
										{CONTACT_INFO.hours}
									</span>
								</li>
							</ul>
						</div>

						{/* Mobile Accordion Links */}
						<div className="lg:hidden space-y-0 border-t border-ivory-100/10">
							{/* Shop */}
							<div className="border-b border-ivory-100/10">
								<button
									onClick={() => toggleSection("shop")}
									className="w-full flex items-center justify-between py-4"
								>
									<span className="text-sm font-semibold text-ivory-100">
										Shop
									</span>
									<HiChevronDown
										className={cn(
											"w-5 h-5 text-ivory-400 transition-transform duration-300",
											expandedSection === "shop" &&
												"rotate-180"
										)}
									/>
								</button>
								<div
									className={cn(
										"overflow-hidden transition-all duration-300",
										expandedSection === "shop"
											? "max-h-60 pb-4"
											: "max-h-0"
									)}
								>
									<ul className="space-y-2.5">
										{FOOTER_LINKS.shop.map((link) => (
											<li key={link.name}>
												<Link
													href={link.href}
													className="text-sm text-ivory-400/70 hover:text-gold-400 transition-colors"
												>
													{link.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Collections */}
							<div className="border-b border-ivory-100/10">
								<button
									onClick={() => toggleSection("collections")}
									className="w-full flex items-center justify-between py-4"
								>
									<span className="text-sm font-semibold text-ivory-100">
										Collections
									</span>
									<HiChevronDown
										className={cn(
											"w-5 h-5 text-ivory-400 transition-transform duration-300",
											expandedSection === "collections" &&
												"rotate-180"
										)}
									/>
								</button>
								<div
									className={cn(
										"overflow-hidden transition-all duration-300",
										expandedSection === "collections"
											? "max-h-60 pb-4"
											: "max-h-0"
									)}
								>
									<ul className="space-y-2.5">
										{FOOTER_LINKS.collections.map(
											(link) => (
												<li key={link.name}>
													<Link
														href={link.href}
														className="text-sm text-ivory-400/70 hover:text-gold-400 transition-colors"
													>
														{link.name}
													</Link>
												</li>
											)
										)}
									</ul>
								</div>
							</div>

							{/* Support */}
							<div className="border-b border-ivory-100/10">
								<button
									onClick={() => toggleSection("support")}
									className="w-full flex items-center justify-between py-4"
								>
									<span className="text-sm font-semibold text-ivory-100">
										Support
									</span>
									<HiChevronDown
										className={cn(
											"w-5 h-5 text-ivory-400 transition-transform duration-300",
											expandedSection === "support" &&
												"rotate-180"
										)}
									/>
								</button>
								<div
									className={cn(
										"overflow-hidden transition-all duration-300",
										expandedSection === "support"
											? "max-h-60 pb-4"
											: "max-h-0"
									)}
								>
									<ul className="space-y-2.5">
										{FOOTER_LINKS.support.map((link) => (
											<li key={link.name}>
												<Link
													href={link.href}
													className="text-sm text-ivory-400/70 hover:text-gold-400 transition-colors"
												>
													{link.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Contact */}
							<div className="border-b border-ivory-100/10">
								<button
									onClick={() => toggleSection("contact")}
									className="w-full flex items-center justify-between py-4"
								>
									<span className="text-sm font-semibold text-ivory-100">
										Contact
									</span>
									<HiChevronDown
										className={cn(
											"w-5 h-5 text-ivory-400 transition-transform duration-300",
											expandedSection === "contact" &&
												"rotate-180"
										)}
									/>
								</button>
								<div
									className={cn(
										"overflow-hidden transition-all duration-300",
										expandedSection === "contact"
											? "max-h-60 pb-4"
											: "max-h-0"
									)}
								>
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<HiOutlineLocationMarker className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
											<span className="text-sm text-ivory-400/70">
												{CONTACT_INFO.address}
											</span>
										</li>
										<li>
											<a
												href={`mailto:${CONTACT_INFO.email}`}
												className="flex items-center gap-3 text-sm text-ivory-400/70"
											>
												<HiOutlineMail className="w-5 h-5 text-gold-500 flex-shrink-0" />
												{CONTACT_INFO.email}
											</a>
										</li>
										<li>
											<a
												href={`tel:${CONTACT_INFO.phone.replace(
													/\s/g,
													""
												)}`}
												className="flex items-center gap-3 text-sm text-ivory-400/70"
											>
												<HiOutlinePhone className="w-5 h-5 text-gold-500 flex-shrink-0" />
												{CONTACT_INFO.phone}
											</a>
										</li>
										<li className="flex items-center gap-3">
											<HiOutlineClock className="w-5 h-5 text-gold-500 flex-shrink-0" />
											<span className="text-sm text-ivory-400/70">
												{CONTACT_INFO.hours}
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Newsletter - Mobile */}
						<div className="lg:hidden">
							<h4 className="text-sm font-semibold text-ivory-100 mb-3">
								Stay Updated
							</h4>
							<form
								onSubmit={handleSubscribe}
								className="relative"
							>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									className="w-full bg-ivory-100/5 border border-ivory-100/10 rounded-full py-3 pl-4 pr-12 text-sm text-ivory-100 placeholder-ivory-500 focus:outline-none focus:border-gold-500/50 transition-colors"
									required
								/>
								<button
									type="submit"
									className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold-500 hover:bg-gold-400 flex items-center justify-center text-noir-900 transition-colors duration-300"
									aria-label="Subscribe"
								>
									<HiArrowRight className="w-4 h-4" />
								</button>
							</form>
							{isSubscribed && (
								<p className="text-xs text-gold-400 mt-2">
									Thank you for subscribing!
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="container-wide">
					<div className="h-px bg-gradient-to-r from-transparent via-ivory-100/10 to-transparent" />
				</div>

				{/* Bottom Section */}
				<div className="container-wide py-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						{/* Copyright & Legal */}
						<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
							<p className="text-xs text-ivory-500">
								© {currentYear} {SITE_CONFIG.name}. All rights
								reserved.
							</p>
							<div className="hidden sm:block w-px h-3 bg-ivory-100/10" />
							<div className="flex items-center gap-3">
								<Link
									href="/privacy"
									className="text-xs text-ivory-500 hover:text-gold-400 transition-colors"
								>
									Privacy Policy
								</Link>
								<span className="text-ivory-500/50">•</span>
								<Link
									href="/terms"
									className="text-xs text-ivory-500 hover:text-gold-400 transition-colors"
								>
									Terms of Service
								</Link>
							</div>
						</div>

						{/* Payment Methods */}
						<div className="flex items-center gap-3">
							<span className="text-[10px] text-ivory-500 uppercase tracking-wider mr-1">
								We Accept
							</span>
							<div className="flex items-center gap-2">
								<div className="w-10 h-6 rounded bg-ivory-100/5 border border-ivory-100/10 flex items-center justify-center text-ivory-400">
									<SiVisa className="w-6 h-4" />
								</div>
								<div className="w-10 h-6 rounded bg-ivory-100/5 border border-ivory-100/10 flex items-center justify-center text-ivory-400">
									<SiMastercard className="w-5 h-4" />
								</div>
								<div className="w-10 h-6 rounded bg-ivory-100/5 border border-ivory-100/10 flex items-center justify-center text-ivory-400">
									<BsCreditCard2Back className="w-5 h-4" />
								</div>
								<div className="w-10 h-6 rounded bg-ivory-100/5 border border-ivory-100/10 flex items-center justify-center text-ivory-400 text-[10px] font-bold">
									COD
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll to Top Button */}
			<ScrollToTop />
		</footer>
	);
}

// Scroll to Top Component
function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled
	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		});
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			onClick={scrollToTop}
			className={cn(
				"fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gold-500 hover:bg-gold-400 text-noir-900 flex items-center justify-center shadow-luxury transition-all duration-500",
				isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none"
			)}
			aria-label="Scroll to top"
		>
			<svg
				className="w-5 h-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M5 10l7-7m0 0l7 7m-7-7v18"
				/>
			</svg>
		</button>
	);
}
