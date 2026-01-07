// ============================================
// COMPONENT: PromoBanner
// Full-width promotional banner
// ============================================

"use client";

import React from "react";
import Link from "next/link";
import { RiArrowRightLine, RiSparklingLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import { ImageWithFallback } from "../../common";
import { Button } from "../../ui";
import "./PromoBanner.css";

// ==================== TYPES ====================

export interface PromoBannerProps {
	title?: string;
	highlightText?: string;
	subtitle?: string;
	description?: string;
	primaryCta?: string;
	primaryCtaHref?: string;
	secondaryCta?: string;
	secondaryCtaHref?: string;
	backgroundImage?: string;
	variant?: "dark" | "light" | "gradient";
	align?: "left" | "center" | "right";
	className?: string;
}

// ==================== COMPONENT ====================

export const PromoBanner: React.FC<PromoBannerProps> = ({
	title = "Eid Collection",
	highlightText = "2025",
	subtitle = "Limited Edition",
	description = "Discover our exclusive Eid collection featuring premium fabrics, elegant designs, and timeless styles for the modern gentleman.",
	primaryCta = "Shop Eid Collection",
	primaryCtaHref = "/collections/eid-2025",
	secondaryCta = "View Lookbook",
	secondaryCtaHref = "/lookbook/eid-2025",
	backgroundImage = "/pictures/promo/1.webp",
	variant = "dark",
	align = "left",
	className,
}) => {
	return (
		<section
			className={cn(
				"promo-banner",
				`promo-banner--${variant}`,
				`promo-banner--${align}`,
				className
			)}>
			{/* Background */}
			<div className="promo-banner__background">
				{backgroundImage && (
					<ImageWithFallback
						src={backgroundImage}
						alt=""
						fill
						sizes="100vw"
						objectFit="cover"
						fallbackLabel="Promo"
						className="promo-banner__background-image"
					/>
				)}
				<div className="promo-banner__overlay" />

				{/* Decorative Elements */}
				<div className="promo-banner__decoration promo-banner__decoration--1" />
				<div className="promo-banner__decoration promo-banner__decoration--2" />
				<div className="promo-banner__decoration promo-banner__decoration--3" />
			</div>

			{/* Content */}
			<div className="promo-banner__container">
				<div className="promo-banner__content">
					{/* Badge */}
					<div className="promo-banner__badge">
						<RiSparklingLine className="promo-banner__badge-icon" />
						<span>{subtitle}</span>
					</div>

					{/* Title */}
					<h2 className="promo-banner__title">
						<span className="promo-banner__title-main">
							{title}
						</span>
						{highlightText && (
							<span className="promo-banner__title-highlight">
								{highlightText}
							</span>
						)}
					</h2>

					{/* Description */}
					<p className="promo-banner__description">{description}</p>

					{/* CTAs */}
					<div className="promo-banner__ctas">
						<Link
							href={primaryCtaHref}
							className="promo-banner__cta-primary">
							<span>{primaryCta}</span>
							<RiArrowRightLine className="promo-banner__cta-icon" />
						</Link>

						{secondaryCta && (
							<Link
								href={secondaryCtaHref}
								className="promo-banner__cta-secondary">
								{secondaryCta}
							</Link>
						)}
					</div>
				</div>

				{/* Side Graphic/Stats */}
				<div className="promo-banner__side">
					<div className="promo-banner__stats">
						<div className="promo-banner__stat">
							<span className="promo-banner__stat-value">
								50+
							</span>
							<span className="promo-banner__stat-label">
								New Designs
							</span>
						</div>
						<div className="promo-banner__stat">
							<span className="promo-banner__stat-value">
								Premium
							</span>
							<span className="promo-banner__stat-label">
								Fabrics
							</span>
						</div>
						<div className="promo-banner__stat">
							<span className="promo-banner__stat-value">
								Free
							</span>
							<span className="promo-banner__stat-label">
								Delivery
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoBanner;
