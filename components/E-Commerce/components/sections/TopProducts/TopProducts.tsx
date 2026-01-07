// ============================================
// COMPONENT: TopProducts
// Draggable product carousel section
// ============================================

"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiArrowRightLine,
} from "react-icons/ri";
import { cn } from "../../../lib/utils";
import { useDragScroll, useIsMobile } from "../../../hooks";
import type { Product } from "../../../lib/types";
import { ProductCard } from "../../common";
import { IconButton } from "../../ui";
import "./TopProducts.css";

// ==================== TYPES ====================

export interface TopProductsProps {
	products: Product[];
	title?: string;
	subtitle?: string;
	description?: string;
	viewAllHref?: string;
	viewAllText?: string;
}

// ==================== COMPONENT ====================

export const TopProducts: React.FC<TopProductsProps> = ({
	products,
	title = "Top Picks",
	subtitle = "Handpicked for You",
	description = "Our most loved pieces, curated for the modern gentleman",
	viewAllHref = "/collections/all",
	viewAllText = "View All Products",
}) => {
	const [wishlist, setWishlist] = useState<number[]>([]);
	const isMobile = useIsMobile();

	// Drag scroll functionality
	const { ref, isDragging, handlers } = useDragScroll<HTMLDivElement>({
		speed: 1.5,
		direction: "horizontal",
	});

	// Scroll carousel with buttons
	const scrollCarousel = useCallback(
		(direction: "left" | "right") => {
			if (!ref.current) return;
			const scrollAmount = isMobile ? 300 : 400;
			ref.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		},
		[ref, isMobile]
	);

	// Toggle wishlist
	const handleToggleWishlist = useCallback((productId: number) => {
		setWishlist((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId]
		);
	}, []);

	// Add to cart
	const handleAddToCart = useCallback((productId: number) => {
		console.log("Add to cart:", productId);
		// Implement cart functionality
	}, []);

	// Quick view
	const handleQuickView = useCallback((productId: number) => {
		console.log("Quick view:", productId);
		// Implement quick view modal
	}, []);

	return (
		<section className="top-products">
			<div className="top-products__container">
				{/* Header */}
				<header className="top-products__header">
					<div className="top-products__header-content">
						{subtitle && (
							<span className="top-products__subtitle">
								{subtitle}
							</span>
						)}
						<h2 className="top-products__title">{title}</h2>
						{description && (
							<p className="top-products__description">
								{description}
							</p>
						)}
					</div>

					{/* Navigation Arrows */}
					<div className="top-products__nav">
						<IconButton
							icon={<RiArrowLeftSLine />}
							label="Scroll left"
							variant="outline"
							size="lg"
							onClick={() => scrollCarousel("left")}
						/>
						<IconButton
							icon={<RiArrowRightSLine />}
							label="Scroll right"
							variant="outline"
							size="lg"
							onClick={() => scrollCarousel("right")}
						/>
					</div>
				</header>

				{/* Carousel */}
				<div
					ref={ref}
					className={cn(
						"top-products__carousel",
						isDragging && "top-products__carousel--dragging"
					)}
					{...handlers}>
					{products.map((product) => (
						<div
							key={product.id}
							className="top-products__card-wrapper">
							<ProductCard
								product={product}
								isInWishlist={wishlist.includes(product.id)}
								onToggleWishlist={handleToggleWishlist}
								onAddToCart={handleAddToCart}
								onQuickView={handleQuickView}
							/>
						</div>
					))}

					{/* View All Card */}
					<div className="top-products__card-wrapper">
						<Link
							href={viewAllHref}
							className="top-products__view-all-card">
							<div className="top-products__view-all-icon">
								<RiArrowRightLine />
							</div>
							<span className="top-products__view-all-title">
								{viewAllText}
							</span>
							<span className="top-products__view-all-count">
								Explore {products.length * 25}+ items
							</span>
						</Link>
					</div>
				</div>

				{/* Mobile Swipe Hint */}
				<div className="top-products__swipe-hint">
					<RiArrowLeftSLine className="top-products__swipe-icon" />
					<span>Swipe to explore</span>
					<RiArrowRightSLine className="top-products__swipe-icon" />
				</div>
			</div>
		</section>
	);
};

export default TopProducts;
