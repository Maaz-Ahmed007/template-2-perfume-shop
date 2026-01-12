// src/components/sections/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GALLERY_PRODUCTS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MagneticElement from "@/components/ui/MagneticElement";
import Button from "@/components/ui/Button";
import {
	HiArrowRight,
	HiOutlineShoppingBag,
	HiOutlineHeart,
	HiHeart,
	HiStar,
} from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";

export default function ProductGallery() {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
	const { ref: sectionRef, isInView } = useInView({ threshold: 0.05 });
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	const toggleLike = (productId: string, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setLikedProducts((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(productId)) {
				newSet.delete(productId);
			} else {
				newSet.add(productId);
			}
			return newSet;
		});
	};

	const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

	const getAnimationStyle = (delay: number) => {
		if (!isInView) return { opacity: 0 };
		return {
			opacity: 0,
			animationName: "fade-up",
			animationDuration: "0.6s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${delay}s`,
		};
	};

	const getCardAnimationStyle = (index: number) => {
		if (!isInView) return { opacity: 0 };
		return {
			opacity: 0,
			animationName: "fade-up",
			animationDuration: "0.5s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${0.1 + index * 0.08}s`,
		};
	};

	return (
		<section
			ref={sectionRef as React.RefObject<HTMLElement>}
			className="relative py-16 sm:py-20 lg:py-24 bg-ivory-100 overflow-hidden"
		>
			{/* Background Elements */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Subtle Pattern */}
				<div
					className="absolute inset-0 opacity-[0.015]"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-noir-900) 1px, transparent 0)`,
						backgroundSize: "40px 40px",
					}}
				/>

				{/* Gradient Accents */}
				<div
					className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
					style={{
						background:
							"radial-gradient(circle, var(--color-gold-500) 0%, transparent 60%)",
						filter: "blur(100px)",
					}}
				/>
				<div
					className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
					style={{
						background:
							"radial-gradient(circle, var(--color-rose-400) 0%, transparent 60%)",
						filter: "blur(80px)",
					}}
				/>
			</div>

			<div className="container-wide relative z-10">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14">
					<div className="text-center lg:text-left">
						{/* Eyebrow */}
						<div
							className="flex items-center gap-2 mb-3 justify-center lg:justify-start"
							style={getAnimationStyle(0)}
						>
							<span className="w-8 h-px bg-gradient-to-r from-transparent to-gold-500" />
							<span className="text-[10px] font-semibold text-gold-600 uppercase tracking-[0.2em]">
								Premium Selection
							</span>
							<span className="w-8 h-px bg-gradient-to-l from-transparent to-gold-500" />
						</div>

						{/* Title */}
						<h2
							className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-noir-900 mb-3"
							style={getAnimationStyle(0.1)}
						>
							Luxury{" "}
							<span className="text-gradient-gold">
								Fragrances
							</span>
						</h2>

						{/* Description */}
						<p
							className="text-sm text-noir-500 max-w-lg mx-auto lg:mx-0"
							style={getAnimationStyle(0.15)}
						>
							Explore our exquisite collection of handcrafted
							perfumes, each designed to make a lasting impression
						</p>
					</div>

					{/* View All Products Button */}
					<div
						className="flex justify-center lg:justify-end"
						style={getAnimationStyle(0.2)}
					>
						<MagneticElement strength={0.1} disabled={!isDesktop}>
							<Link href="/products">
								<Button
									variant="primary"
									size="md"
									rightIcon={
										<HiArrowRight className="w-3.5 h-3.5" />
									}
									className="group"
								>
									Browse All Products
								</Button>
							</Link>
						</MagneticElement>
					</div>
				</div>

				{/* Product Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
					{GALLERY_PRODUCTS.map((product, index) => (
						<Link
							key={product.id}
							href={`/products/${product.id}`}
							className="group relative block"
							style={getCardAnimationStyle(index)}
							onMouseEnter={() => setHoveredId(product.id)}
							onMouseLeave={() => setHoveredId(null)}
						>
							<div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-luxury-lg">
								{/* Image Container */}
								<div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-ivory-200/50 to-ivory-100">
									{/* Main Image */}
									<Image
										src={product.image}
										alt={product.name}
										fill
										className={cn(
											"object-cover transition-all duration-700 ease-out",
											hoveredId === product.id &&
												product.hoverImage
												? "opacity-0 scale-105"
												: "opacity-100 scale-100"
										)}
										sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
									/>

									{/* Hover Image */}
									{product.hoverImage && (
										<Image
											src={product.hoverImage}
											alt={product.name}
											fill
											className={cn(
												"object-cover transition-all duration-700 ease-out absolute inset-0",
												hoveredId === product.id
													? "opacity-100 scale-100"
													: "opacity-0 scale-105"
											)}
											sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
										/>
									)}

									{/* Gradient Overlay */}
									<div
										className={cn(
											"absolute inset-0 bg-gradient-to-t from-noir-900/40 via-transparent to-transparent transition-opacity duration-500",
											hoveredId === product.id
												? "opacity-100"
												: "opacity-0"
										)}
									/>

									{/* Badges */}
									<div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 z-10">
										{product.isNew && (
											<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-noir-900 text-ivory-50 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
												<HiSparkles className="w-2.5 h-2.5" />
												New
											</span>
										)}
										{product.isBestseller && (
											<span className="px-2 py-0.5 rounded-full bg-gold-500 text-noir-900 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
												Bestseller
											</span>
										)}
										{product.originalPrice && (
											<span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
												Sale
											</span>
										)}
									</div>

									{/* Wishlist Button */}
									<button
										onClick={(e) =>
											toggleLike(product.id, e)
										}
										className={cn(
											"absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300",
											likedProducts.has(product.id)
												? "bg-rose-500 text-white"
												: "bg-white/90 text-noir-600 hover:text-rose-500",
											hoveredId === product.id ||
												likedProducts.has(product.id)
												? "opacity-100 translate-y-0"
												: "opacity-0 -translate-y-2"
										)}
										aria-label={
											likedProducts.has(product.id)
												? "Remove from wishlist"
												: "Add to wishlist"
										}
									>
										{likedProducts.has(product.id) ? (
											<HiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
										) : (
											<HiOutlineHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
										)}
									</button>

									{/* Quick Add Button */}
									<div
										className={cn(
											"absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10 transition-all duration-500",
											hoveredId === product.id
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-4"
										)}
									>
										<button
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												// Add to cart logic
											}}
											className="w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/95 hover:bg-gold-500 text-noir-800 hover:text-noir-900 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-luxury"
										>
											<HiOutlineShoppingBag className="w-3.5 h-3.5" />
											Quick Add
										</button>
									</div>
								</div>

								{/* Product Info */}
								<div className="p-3 sm:p-4">
									{/* Category */}
									<p className="text-[8px] sm:text-[9px] text-gold-600 uppercase tracking-widest mb-1">
										{product.category}
									</p>

									{/* Name */}
									<h3 className="font-heading text-sm sm:text-base font-bold text-noir-900 mb-1.5 group-hover:text-gold-700 transition-colors duration-300 line-clamp-1">
										{product.name}
									</h3>

									{/* Rating */}
									<div className="flex items-center gap-1 mb-2">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<HiStar
													key={i}
													className={cn(
														"w-2.5 h-2.5 sm:w-3 sm:h-3",
														i <
															Math.floor(
																product.rating
															)
															? "text-gold-500"
															: "text-ivory-300"
													)}
												/>
											))}
										</div>
										<span className="text-[9px] sm:text-[10px] text-noir-400">
											({product.rating})
										</span>
									</div>

									{/* Price & Size */}
									<div className="flex items-end justify-between">
										<div className="flex items-baseline gap-1.5">
											<span className="font-heading text-sm sm:text-base lg:text-lg font-bold text-noir-900">
												{formatPrice(product.price)}
											</span>
											{product.originalPrice && (
												<span className="text-[10px] sm:text-xs text-noir-400 line-through">
													{formatPrice(
														product.originalPrice
													)}
												</span>
											)}
										</div>
										<span className="text-[9px] sm:text-[10px] text-noir-400 bg-ivory-200 px-1.5 py-0.5 rounded-full">
											{product.size}
										</span>
									</div>
								</div>

								{/* Decorative Hover Border */}
								<div
									className={cn(
										"absolute inset-0 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 pointer-events-none",
										hoveredId === product.id
											? "border-gold-500/30"
											: "border-transparent"
									)}
								/>
							</div>
						</Link>
					))}
				</div>

				{/* Bottom CTA */}
				<div
					className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 lg:mt-14"
					style={getAnimationStyle(0.5)}
				>
					<p className="text-sm text-noir-500">
						Showing 8 of 50+ premium fragrances
					</p>
					<MagneticElement strength={0.1} disabled={!isDesktop}>
						<Link
							href="/products"
							className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors duration-300 group"
						>
							<span>Explore Full Collection</span>
							<span className="w-6 h-6 rounded-full bg-gold-100 group-hover:bg-gold-500 flex items-center justify-center transition-all duration-300">
								<HiArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover:text-noir-900 transition-transform group-hover:translate-x-0.5" />
							</span>
						</Link>
					</MagneticElement>
				</div>
			</div>

			{/* Decorative Bottom Element */}
			<div className="absolute bottom-0 left-0 right-0">
				<svg
					viewBox="0 0 1440 40"
					fill="none"
					preserveAspectRatio="none"
					className="w-full h-6 sm:h-8"
				>
					<path
						d="M0,20 Q360,40 720,20 T1440,20 L1440,40 L0,40 Z"
						fill="var(--color-noir-900)"
						fillOpacity="0.03"
					/>
				</svg>
			</div>
		</section>
	);
}
