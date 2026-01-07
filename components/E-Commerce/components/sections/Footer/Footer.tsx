"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
	RiFacebookFill,
	RiInstagramLine,
	RiWhatsappLine,
	RiPhoneLine,
	RiMailLine,
	RiMapPinLine,
	RiArrowRightLine,
} from "react-icons/ri";
import { cn } from "../../../lib/utils";
import { CONTACT_INFO, getWhatsAppUrl } from "../../../lib/constants";
import "./Footer.css";

type FooterLink = { label: string; href: string };

export interface FooterProps {
	className?: string;
}

export default function Footer({ className }: FooterProps) {
	const year = useMemo(() => new Date().getFullYear(), []);
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "success">("idle");

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setStatus("success");
		setEmail("");
		setTimeout(() => setStatus("idle"), 3500);
	};

	const shopLinks: FooterLink[] = [
		{ label: "New Arrivals", href: "/collections/new-arrivals" },
		{ label: "Ready to Wear", href: "/collections/ready-to-wear" },
		{ label: "Unstitched", href: "/collections/unstitched" },
		{ label: "Fabrics", href: "/collections/fabrics" },
		{ label: "Sale", href: "/sale" },
	];

	const supportLinks: FooterLink[] = [
		{ label: "Track Your Order", href: "/track-order" },
		{ label: "Shipping & Delivery", href: "/shipping" },
		{ label: "Returns & Exchange", href: "/returns" },
		{ label: "Size Guide", href: "/size-guide" },
		{ label: "Help & Support", href: "/help" },
	];

	const companyLinks: FooterLink[] = [
		{ label: "About MenCloth", href: "/about" },
		{ label: "Store Locator", href: "/stores" },
		{ label: "Contact", href: "/contact" },
		{ label: "Privacy Policy", href: "/privacy" },
		{ label: "Terms & Conditions", href: "/terms" },
	];

	const whatsappHref = getWhatsAppUrl(
		"Hello MenCloth! I want to know more about your products."
	);

	return (
		<footer className={cn("footer", className)} aria-label="Footer">
			{/* Main footer */}
			<div className="footer__main">
				<div className="footer__container footer__grid">
					{/* Brand + Newsletter */}
					<div className="footer__brand">
						<Link
							href="/"
							className="footer__logo"
							aria-label="MenCloth Home">
							<span className="footer__logo-men">Men</span>
							<span className="footer__logo-cloth">Cloth</span>
						</Link>

						<p className="footer__about">
							Premium men’s clothing & fabrics crafted for the
							modern Pakistani gentleman. Clean design, rich
							quality, and effortless shopping.
						</p>

						{/* Newsletter */}
						<div className="footer__newsletter">
							<h3 className="footer__heading">Get Updates</h3>
							<p className="footer__muted">
								New arrivals, seasonal drops, and exclusive
								offers.
							</p>

							<form className="footer__form" onSubmit={onSubmit}>
								<label
									className="sr-only"
									htmlFor="newsletter-email">
									Email address
								</label>
								<input
									id="newsletter-email"
									type="email"
									inputMode="email"
									autoComplete="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="footer__input"
								/>
								<button
									type="submit"
									className="footer__submit"
									aria-label="Subscribe">
									<RiArrowRightLine className="footer__submit-icon" />
								</button>
							</form>

							<div
								className={cn(
									"footer__form-hint",
									status === "success" &&
										"footer__form-hint--success"
								)}
								aria-live="polite">
								{status === "success"
									? "Subscribed. Thank you!"
									: "No spam. Unsubscribe anytime."}
							</div>
						</div>

						{/* Social */}
						<div className="footer__social">
							<a
								className="footer__social-btn"
								href="https://instagram.com"
								target="_blank"
								rel="noreferrer"
								aria-label="Instagram">
								<RiInstagramLine />
							</a>
							<a
								className="footer__social-btn"
								href="https://facebook.com"
								target="_blank"
								rel="noreferrer"
								aria-label="Facebook">
								<RiFacebookFill />
							</a>
							<a
								className="footer__social-btn footer__social-btn--whatsapp"
								href={whatsappHref}
								target="_blank"
								rel="noreferrer"
								aria-label="WhatsApp">
								<RiWhatsappLine />
							</a>
						</div>
					</div>

					{/* Shop */}
					<nav className="footer__col" aria-label="Shop links">
						<h3 className="footer__heading">Shop</h3>
						<ul className="footer__links">
							{shopLinks.map((l) => (
								<li key={l.href}>
									<Link
										className="footer__link"
										href={l.href}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Support */}
					<nav className="footer__col" aria-label="Support links">
						<h3 className="footer__heading">Support</h3>
						<ul className="footer__links">
							{supportLinks.map((l) => (
								<li key={l.href}>
									<Link
										className="footer__link"
										href={l.href}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Company + Contact */}
					<div className="footer__col">
						<h3 className="footer__heading">Company</h3>
						<ul className="footer__links footer__links--tight">
							{companyLinks.map((l) => (
								<li key={l.href}>
									<Link
										className="footer__link"
										href={l.href}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>

						<div className="footer__contact">
							<div className="footer__contact-item">
								<RiPhoneLine className="footer__contact-icon" />
								<a
									className="footer__contact-link"
									href={`tel:${CONTACT_INFO.phone.replace(
										/\s/g,
										""
									)}`}>
									{CONTACT_INFO.phone}
								</a>
							</div>

							<div className="footer__contact-item">
								<RiMailLine className="footer__contact-icon" />
								<a
									className="footer__contact-link"
									href={`mailto:${CONTACT_INFO.email}`}>
									{CONTACT_INFO.email}
								</a>
							</div>

							<div className="footer__contact-item">
								<RiMapPinLine className="footer__contact-icon" />
								<span className="footer__contact-text">
									{CONTACT_INFO.address}
								</span>
							</div>

							<a
								className="footer__whatsapp"
								href={whatsappHref}
								target="_blank"
								rel="noreferrer">
								<RiWhatsappLine className="footer__whatsapp-icon" />
								<span>WhatsApp Support</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="footer__bottom">
				<div className="footer__container footer__bottom-inner">
					<p className="footer__copyright">
						© {year} MenCloth. All rights reserved.
					</p>

					<div
						className="footer__payments"
						aria-label="Payment methods">
						<span className="footer__pay">COD</span>
						<span className="footer__pay">Visa</span>
						<span className="footer__pay">Mastercard</span>
						<span className="footer__pay">Easypaisa</span>
						<span className="footer__pay">JazzCash</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
