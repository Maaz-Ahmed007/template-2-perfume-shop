// ============================================
// COMPONENT: Categories
// Shop by category grid section
// ============================================

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import { ImageWithFallback } from "../../common";
import "./Categories.css";

// ==================== TYPES ====================

export interface Category {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	href: string;
	itemCount?: number;
	featured?: boolean;
}

export interface CategoriesProps {
	categories?: Category[];
	title?: string;
	subtitle?: string;
}

// ==================== DEFAULT DATA ====================

const defaultCategories: Category[] = [
	{
		id: "ready-to-wear",
		title: "Ready to Wear",
		subtitle: "Shalwar Kameez & More",
		description: "Perfectly tailored, ready to impress",
		image: "/pictures/categories/1.webp",
		href: "/collections/ready-to-wear",
		itemCount: 120,
		featured: true,
	},
	{
		id: "unstitched",
		title: "Unstitched",
		subtitle: "Premium Fabrics",
		description: "Customize your perfect fit",
		image: "/pictures/categories/2.webp",
		href: "/collections/unstitched",
		itemCount: 85,
	},
	{
		id: "fabrics",
		title: "Fabrics",
		subtitle: "By the Meter",
		description: "Finest quality materials",
		image: "/pictures/categories/3.webp",
		href: "/collections/fabrics",
		itemCount: 200,
	},
	{
		id: "accessories",
		title: "Accessories",
		subtitle: "Complete Your Look",
		description: "Shawls, caps & more",
		image: "/pictures/categories/4.webp",
		href: "/collections/accessories",
		itemCount: 65,
	},
];

// ==================== COMPONENT ====================

export const Categories: React.FC<CategoriesProps> = ({
	categories = defaultCategories,
	title = "Shop by Category",
	subtitle = "Explore Our Collections",
}) => {
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	return (
		<section className="categories">
			<div className="categories__container">
				{/* Section Header */}
				<header className="categories__header">
					<span className="categories__subtitle">{subtitle}</span>
					<h2 className="categories__title">{title}</h2>
				</header>

				{/* Categories Grid */}
				<div className="categories__grid">
					{categories.map((category, index) => (
						<Link
							key={category.id}
							href={category.href}
							className={cn(
								"categories__card",
								category.featured &&
									"categories__card--featured",
								hoveredId === category.id &&
									"categories__card--hovered"
							)}
							onMouseEnter={() => setHoveredId(category.id)}
							onMouseLeave={() => setHoveredId(null)}
							style={
								{ "--card-index": index } as React.CSSProperties
							}>
							{/* Background Image */}
							<div className="categories__card-image">
								<ImageWithFallback
									src={category.image}
									alt={category.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
									fallbackLabel={category.title}
								/>
								<div className="categories__card-overlay" />
							</div>

							{/* Content */}
							<div className="categories__card-content">
								{/* Top - Subtitle */}
								<span className="categories__card-subtitle">
									{category.subtitle}
								</span>

								{/* Bottom - Title & Action */}
								<div className="categories__card-footer">
									<div className="categories__card-text">
										<h3 className="categories__card-title">
											{category.title}
										</h3>
										<p className="categories__card-description">
											{category.description}
										</p>
									</div>

									<div className="categories__card-action">
										<span className="categories__card-count">
											{category.itemCount}+ Items
										</span>
										<span className="categories__card-arrow">
											<RiArrowRightLine />
										</span>
									</div>
								</div>
							</div>

							{/* Decorative Corner */}
							<div className="categories__card-corner" />
						</Link>
					))}
				</div>

				{/* View All Link */}
				<div className="categories__view-all">
					<Link
						href="/collections"
						className="categories__view-all-link">
						<span>View All Collections</span>
						<RiArrowRightLine className="categories__view-all-icon" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Categories;
