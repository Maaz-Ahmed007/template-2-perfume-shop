"use client";

import React, { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import type { Product } from "../../../lib/types";
import { cn } from "../../../lib/utils";
import { ProductCard } from "../../common";
import "./ProductGallery.css";

export interface ProductGalleryProps {
	products: Product[];
	title?: string;
	subtitle?: string;
	viewAllHref?: string;
}

const PAGE_SIZE = 12;

function layoutClassByIndex(i: number) {
	// Wide tiles at a pattern to create a “mosaic”
	// (No row spanning -> stable and responsive)
	if (i % 10 === 2 || i % 10 === 7) return "product-gallery__item--wide";
	return "product-gallery__item--normal";
}

export default function ProductGallery({
	products,
	title = "Explore More",
	subtitle = "Browse Our Collection",
	viewAllHref = "/collections/all",
}: ProductGalleryProps) {
	const categories = useMemo(() => {
		const set = new Set<string>(products.map((p) => p.category));
		return ["All", ...Array.from(set)];
	}, [products]);

	const [activeCategory, setActiveCategory] = useState<string>("All");
	const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

	const filtered = useMemo(() => {
		if (activeCategory === "All") return products;
		return products.filter((p) => p.category === activeCategory);
	}, [products, activeCategory]);

	const visible = useMemo(
		() => filtered.slice(0, visibleCount),
		[filtered, visibleCount]
	);

	const onChangeCategory = useCallback((cat: string) => {
		setActiveCategory(cat);
		setVisibleCount(PAGE_SIZE);
	}, []);

	const canLoadMore = visibleCount < filtered.length;

	return (
		<section className="product-gallery">
			<div className="product-gallery__container">
				<header className="product-gallery__header">
					<div className="product-gallery__header-left">
						<span className="product-gallery__subtitle">
							{subtitle}
						</span>
						<h2 className="product-gallery__title">{title}</h2>
					</div>

					<Link
						href={viewAllHref}
						className="product-gallery__view-all">
						<span>View All</span>
						<RiArrowRightLine className="product-gallery__view-all-icon" />
					</Link>
				</header>

				{/* Filters */}
				<div
					className="product-gallery__filters"
					role="tablist"
					aria-label="Product categories">
					{categories.map((cat) => {
						const active = cat === activeCategory;
						return (
							<button
								key={cat}
								type="button"
								role="tab"
								aria-selected={active}
								className={cn(
									"product-gallery__filter",
									active && "product-gallery__filter--active"
								)}
								onClick={() => onChangeCategory(cat)}>
								{cat}
							</button>
						);
					})}
				</div>

				{/* Mosaic Grid */}
				<div className="product-gallery__grid">
					{visible.map((p, i) => (
						<div
							key={p.id}
							className={cn(
								"product-gallery__item",
								layoutClassByIndex(i)
							)}>
							{/* Using ProductCard keeps behavior consistent (hover image, swatches, actions) */}
							<ProductCard product={p} />
						</div>
					))}
				</div>

				{/* Load more */}
				<div className="product-gallery__footer">
					{canLoadMore ? (
						<button
							type="button"
							className="product-gallery__load-more"
							onClick={() =>
								setVisibleCount((c) =>
									Math.min(c + PAGE_SIZE, filtered.length)
								)
							}>
							Load More
						</button>
					) : (
						<div className="product-gallery__end">
							<span>That’s everything in this category.</span>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
