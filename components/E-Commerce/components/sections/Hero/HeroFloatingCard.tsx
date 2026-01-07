// ============================================
// COMPONENT: HeroFloatingCard
// Floating product card - REDESIGNED
// ============================================

"use client";

import React from "react";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import type { HeroFeaturedProduct } from "../../../lib/types";
import { ImageWithFallback } from "../../common";
import { Rating } from "../../ui";
import "./Hero.css";

// ==================== TYPES ====================

export interface HeroFloatingCardProps {
	product: HeroFeaturedProduct;
	productImage?: string;
	isVisible: boolean;
	className?: string;
}

// ==================== COMPONENT ====================

export const HeroFloatingCard: React.FC<HeroFloatingCardProps> = ({
	product,
	productImage,
	isVisible,
	className,
}) => {
	// Calculate discount percentage
	const discountPercent =
		product.originalPrice && product.price
			? Math.round(
					((parseFloat(product.originalPrice.replace(/[^0-9]/g, "")) -
						parseFloat(product.price.replace(/[^0-9]/g, ""))) /
						parseFloat(
							product.originalPrice.replace(/[^0-9]/g, "")
						)) *
						100
			  )
			: 0;

	return (
		<Link
			href={product.href}
			className={cn(
				"hero-floating-card",
				isVisible && "hero-floating-card--visible",
				className
			)}>
			{/* Product Image */}
			<div className="hero-floating-card__image">
				{productImage ? (
					<ImageWithFallback
						src={productImage}
						alt={product.name}
						fill
						sizes="280px"
						fallbackLabel="Product"
					/>
				) : (
					<div className="hero-floating-card__image-placeholder">
						<span>GC</span>
					</div>
				)}
				<div className="hero-floating-card__image-overlay" />

				{/* Badge */}
				{product.badge && (
					<span className="hero-floating-card__badge">
						{product.badge}
					</span>
				)}
			</div>

			{/* Content */}
			<div className="hero-floating-card__content">
				{/* Rating */}
				<div className="hero-floating-card__rating">
					<Rating
						value={product.rating}
						reviews={product.reviews}
						size="sm"
						showValue={false}
					/>
				</div>

				{/* Product Name */}
				<h4 className="hero-floating-card__name">{product.name}</h4>

				{/* Price Row */}
				<div className="hero-floating-card__price-row">
					<div className="hero-floating-card__price">
						<span className="hero-floating-card__price-current">
							{product.price}
						</span>
						{product.originalPrice && (
							<span className="hero-floating-card__price-original">
								{product.originalPrice}
							</span>
						)}
					</div>

					{discountPercent > 0 && (
						<span className="hero-floating-card__discount">
							-{discountPercent}%
						</span>
					)}
				</div>

				{/* Add to Cart Button */}
				<span className="hero-floating-card__button">
					<RiShoppingBag3Line className="hero-floating-card__button-icon" />
					<span>View Product</span>
				</span>
			</div>
		</Link>
	);
};

export default HeroFloatingCard;
