// ============================================
// COMPONENT: ProductCard
// Product card with hover image & color selection
// ============================================

"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
	RiShoppingBag3Line,
	RiEyeLine,
	RiHeart3Line,
	RiHeart3Fill,
} from "react-icons/ri";
import { cn } from "../../../lib/utils";
import type { Product, ProductColor } from "../../../lib/types";
import { ImageWithFallback } from "../ImageWithFallback";
import { Badge, Rating } from "../../ui";
import "./ProductCard.css";

// ==================== TYPES ====================

export interface ProductCardProps {
	product: Product;
	onAddToCart?: (productId: number, color?: string) => void;
	onToggleWishlist?: (productId: number) => void;
	onQuickView?: (productId: number) => void;
	isInWishlist?: boolean;
	showQuickActions?: boolean;
	showRating?: boolean;
	showColors?: boolean;
	className?: string;
}

// ==================== HELPER ====================

const getImageForColor = (product: Product, colorHex: string): string => {
	// In a real app, this would map to actual color-specific images
	// For demo, we alternate between main and hover image
	const defaultColorHex = product.colors[0]?.hex;
	if (colorHex !== defaultColorHex && product.hoverImage) {
		return product.hoverImage;
	}
	return product.image;
};

// ==================== COMPONENT ====================

export const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onAddToCart,
	onToggleWishlist,
	onQuickView,
	isInWishlist = false,
	showQuickActions = true,
	showRating = true,
	showColors = true,
	className,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [selectedColor, setSelectedColor] = useState<string | null>(
		product.colors[0]?.hex || null
	);
	const [hasColorChanged, setHasColorChanged] = useState(false);
	const [currentImage, setCurrentImage] = useState(product.image);

	// Determine if we should show hover image
	const showHoverImage =
		isHovered &&
		!hasColorChanged &&
		product.hoverImage &&
		currentImage === product.image;

	const handleMouseEnter = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsHovered(false);
	}, []);

	const handleAddToCart = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			onAddToCart?.(product.id, selectedColor || undefined);
		},
		[onAddToCart, product.id, selectedColor]
	);

	const handleToggleWishlist = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			onToggleWishlist?.(product.id);
		},
		[onToggleWishlist, product.id]
	);

	const handleQuickView = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			onQuickView?.(product.id);
		},
		[onQuickView, product.id]
	);

	const handleColorSelect = useCallback(
		(e: React.MouseEvent, color: ProductColor) => {
			e.preventDefault();
			e.stopPropagation();
			setSelectedColor(color.hex);
			setHasColorChanged(true);
			setCurrentImage(getImageForColor(product, color.hex));
		},
		[product]
	);

	const handleColorTouch = useCallback(
		(e: React.TouchEvent, color: ProductColor) => {
			e.stopPropagation();
			setSelectedColor(color.hex);
			setHasColorChanged(true);
			setCurrentImage(getImageForColor(product, color.hex));
		},
		[product]
	);

	const hasDiscount = product.originalPrice && product.originalPriceNumeric;
	const discountPercent = hasDiscount
		? Math.round(
				((product.originalPriceNumeric! - product.priceNumeric) /
					product.originalPriceNumeric!) *
					100
		  )
		: 0;

	return (
		<article
			className={cn("product-card", className)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<Link
				href={`/product/${product.slug}`}
				className="product-card__link">
				{/* Image Container */}
				<div className="product-card__image-container">
					{/* Primary Image */}
					<div
						className={cn(
							"product-card__image",
							"product-card__image--primary",
							showHoverImage && "product-card__image--hidden"
						)}>
						<ImageWithFallback
							src={currentImage}
							alt={product.name}
							fill
							sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
							fallbackLabel={product.name}
						/>
					</div>

					{/* Hover Image */}
					{product.hoverImage && !hasColorChanged && (
						<div
							className={cn(
								"product-card__image",
								"product-card__image--hover",
								showHoverImage && "product-card__image--visible"
							)}>
							<ImageWithFallback
								src={product.hoverImage}
								alt={`${product.name} - alternate view`}
								fill
								sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
								fallbackLabel={product.name}
							/>
						</div>
					)}

					{/* Badges */}
					<div className="product-card__badges">
						{product.isNew && (
							<Badge variant="new" size="md">
								New
							</Badge>
						)}
						{product.isSale && (
							<Badge variant="sale" size="md">
								{discountPercent > 0
									? `-${discountPercent}%`
									: "Sale"}
							</Badge>
						)}
					</div>

					{/* Wishlist Button */}
					<button
						className={cn(
							"product-card__wishlist",
							isInWishlist && "product-card__wishlist--active",
							(isHovered || isInWishlist) &&
								"product-card__wishlist--visible"
						)}
						onClick={handleToggleWishlist}
						aria-label={
							isInWishlist
								? "Remove from wishlist"
								: "Add to wishlist"
						}>
						{isInWishlist ? (
							<RiHeart3Fill className="product-card__wishlist-icon" />
						) : (
							<RiHeart3Line className="product-card__wishlist-icon" />
						)}
					</button>

					{/* Overlay */}
					<div
						className={cn(
							"product-card__overlay",
							isHovered && "product-card__overlay--visible"
						)}
					/>

					{/* Quick Actions */}
					{showQuickActions && (
						<div
							className={cn(
								"product-card__actions",
								isHovered && "product-card__actions--visible"
							)}>
							<button
								className="product-card__action product-card__action--primary"
								onClick={handleAddToCart}>
								<RiShoppingBag3Line className="product-card__action-icon" />
								<span>Add to Cart</span>
							</button>
							<button
								className="product-card__action product-card__action--secondary"
								onClick={handleQuickView}
								aria-label="Quick view">
								<RiEyeLine className="product-card__action-icon" />
							</button>
						</div>
					)}
				</div>

				{/* Product Info */}
				<div className="product-card__info">
					{/* Category */}
					<span className="product-card__category">
						{product.category}
					</span>

					{/* Name */}
					<h3 className="product-card__name">{product.name}</h3>

					{/* Rating */}
					{showRating && (
						<div className="product-card__rating">
							<Rating
								value={product.rating}
								reviews={product.reviews}
								size="sm"
							/>
						</div>
					)}

					{/* Price and Colors Row */}
					<div className="product-card__footer">
						{/* Price */}
						<div className="product-card__price">
							<span className="product-card__price-current">
								{product.price}
							</span>
							{product.originalPrice && (
								<span className="product-card__price-original">
									{product.originalPrice}
								</span>
							)}
						</div>

						{/* Colors */}
						{showColors && product.colors.length > 0 && (
							<div
								className="product-card__colors"
								onClick={(e) => e.preventDefault()}>
								{product.colors.slice(0, 4).map((color) => (
									<button
										key={color.hex}
										type="button"
										className={cn(
											"product-card__color",
											selectedColor === color.hex &&
												"product-card__color--selected"
										)}
										style={{ backgroundColor: color.hex }}
										onClick={(e) =>
											handleColorSelect(e, color)
										}
										onTouchEnd={(e) =>
											handleColorTouch(e, color)
										}
										aria-label={`Select ${color.name} color`}
										title={color.name}
									/>
								))}
								{product.colors.length > 4 && (
									<span className="product-card__color-more">
										+{product.colors.length - 4}
									</span>
								)}
							</div>
						)}
					</div>
				</div>
			</Link>
		</article>
	);
};

export default ProductCard;
