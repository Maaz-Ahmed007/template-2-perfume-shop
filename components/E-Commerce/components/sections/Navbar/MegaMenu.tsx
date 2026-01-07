// ============================================
// COMPONENT: MegaMenu
// Desktop mega menu dropdown - FIXED
// ============================================

"use client";

import React from "react";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import { cn, getDelayStyle } from "../../../lib/utils";
import type { NavigationItem } from "../../../lib/types";
import { ImageWithFallback } from "../../common";
import { Badge, Rating } from "../../ui";
import "./MegaMenu.css";

// ==================== TYPES ====================

export interface MegaMenuProps {
	item: NavigationItem;
	isActive: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

// ==================== COMPONENT ====================

export const MegaMenu: React.FC<MegaMenuProps> = ({
	item,
	isActive,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<div
			className={cn("mega-menu", isActive && "mega-menu--active")}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}>
			{/* Invisible bridge to prevent gap issues */}
			<div className="mega-menu__bridge" aria-hidden="true" />

			<div className="mega-menu__container">
				<div className="mega-menu__grid">
					{/* ============ CATEGORIES COLUMN ============ */}
					<div className="mega-menu__categories">
						<h3 className="mega-menu__heading">Shop by Category</h3>

						<ul className="mega-menu__category-list">
							{item.categories.map((category, idx) => (
								<li
									key={category.name}
									className="mega-menu__category-item animate-slideInLeft"
									style={getDelayStyle(idx, 40)}>
									<Link
										href={category.href}
										className="mega-menu__category-link">
										<span className="mega-menu__category-indicator" />
										<span className="mega-menu__category-name">
											{category.name}
										</span>
										{category.isNew && (
											<Badge variant="new" size="sm">
												New
											</Badge>
										)}
										{category.isHot && (
											<Badge
												variant="hot"
												size="sm"
												animate>
												Hot
											</Badge>
										)}
									</Link>
								</li>
							))}
						</ul>

						<Link
							href={`/collections/${item.id}`}
							className="mega-menu__view-all">
							<span>View All {item.label}</span>
							<RiArrowRightLine className="mega-menu__view-all-icon" />
						</Link>
					</div>

					{/* ============ FEATURED PRODUCTS COLUMN ============ */}
					{item.featuredProducts &&
						item.featuredProducts.length > 0 && (
							<div className="mega-menu__featured">
								<h3 className="mega-menu__heading">
									Featured Products
								</h3>

								<div className="mega-menu__featured-grid">
									{item.featuredProducts.map(
										(product, idx) => (
											<Link
												key={product.id}
												href={product.href}
												className="mega-menu__product-card animate-fadeInUp"
												style={getDelayStyle(idx, 80)}>
												<div className="mega-menu__product-image">
													<ImageWithFallback
														src={product.image}
														alt={product.name}
														fill
														sizes="200px"
														fallbackLabel={
															product.name
														}
													/>
													<div className="mega-menu__product-overlay">
														<span className="mega-menu__product-quick">
															Quick View
														</span>
													</div>
												</div>

												<h4 className="mega-menu__product-name">
													{product.name}
												</h4>

												<div className="mega-menu__product-price">
													<span className="mega-menu__product-price-current">
														{product.price}
													</span>
													{product.originalPrice && (
														<span className="mega-menu__product-price-original">
															{
																product.originalPrice
															}
														</span>
													)}
												</div>
											</Link>
										)
									)}
								</div>
							</div>
						)}

					{/* ============ SALE BANNER ============ */}
					{item.saleBanner && (
						<div className="mega-menu__sale animate-fadeInUp">
							<Link
								href={item.saleBanner.href}
								className={cn(
									"mega-menu__sale-banner",
									`bg-linear-to-br ${item.saleBanner.bgColor}`
								)}>
								{/* Background decorations */}
								<div className="mega-menu__sale-decoration mega-menu__sale-decoration--top" />
								<div className="mega-menu__sale-decoration mega-menu__sale-decoration--bottom" />

								<div className="mega-menu__sale-content">
									<span className="mega-menu__sale-badge">
										Limited Time
									</span>
									<h4 className="mega-menu__sale-discount">
										{item.saleBanner.discount}
									</h4>
									<p className="mega-menu__sale-title">
										{item.saleBanner.title}
									</p>
									<p className="mega-menu__sale-description">
										{item.saleBanner.description}
									</p>

									<span className="mega-menu__sale-cta">
										Shop Now
										<RiArrowRightUpLine className="mega-menu__sale-cta-icon" />
									</span>
								</div>
							</Link>
						</div>
					)}

					{/* ============ POPULAR PRODUCTS COLUMN ============ */}
					{item.popularProducts &&
						item.popularProducts.length > 0 && (
							<div className="mega-menu__popular">
								<h3 className="mega-menu__heading">
									Popular Right Now
								</h3>

								<div className="mega-menu__popular-list">
									{item.popularProducts
										.slice(0, 3)
										.map((product, idx) => (
											<Link
												key={product.id}
												href={product.href}
												className="mega-menu__popular-item animate-slideInRight"
												style={getDelayStyle(idx, 80)}>
												<div className="mega-menu__popular-image">
													<ImageWithFallback
														src={product.image}
														alt={product.name}
														fill
														sizes="64px"
														fallbackLabel="IMG"
													/>
												</div>

												<div className="mega-menu__popular-info">
													<p className="mega-menu__popular-name">
														{product.name}
													</p>
													<div className="mega-menu__popular-rating">
														<Rating
															value={
																product.rating
															}
															reviews={
																product.reviews
															}
															size="sm"
														/>
													</div>
													<p className="mega-menu__popular-price">
														{product.price}
													</p>
												</div>

												<RiArrowRightLine className="mega-menu__popular-arrow" />
											</Link>
										))}
								</div>
							</div>
						)}
				</div>
			</div>
		</div>
	);
};

export default MegaMenu;
