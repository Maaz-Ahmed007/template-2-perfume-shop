"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FeaturedProduct } from "@/lib/constants";
import {
	HiOutlineHeart,
	HiHeart,
	HiOutlineShoppingBag,
	HiOutlineEye,
	HiStar,
} from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";

interface ProductCardProps {
	product: FeaturedProduct;
	index: number;
	isInView: boolean;
}

export default function ProductCard({
	product,
	index,
	isInView,
}: ProductCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

	const badgeConfig = {
		new: { text: "New", className: "bg-noir-900 text-ivory-50" },
		bestseller: {
			text: "Bestseller",
			className: "bg-gold-500 text-noir-900",
		},
		sale: { text: "Sale", className: "bg-rose-500 text-white" },
	};

	const badge = product.badge ? badgeConfig[product.badge] : null;

	// Animation style helper
	const getAnimationStyle = () => {
		if (!isInView) return { opacity: 0 };
		return {
			opacity: 0,
			animationName: "fade-up",
			animationDuration: "0.6s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${index * 0.1 + 0.2}s`,
		};
	};

	return (
		<article
			className="group relative"
			style={getAnimationStyle()}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative bg-ivory-50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-elevated">
				{/* Image Container */}
				<div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-ivory-200 to-ivory-100">
					{/* Shimmer Loading */}
					{!imageLoaded && (
						<div
							className="absolute inset-0 bg-gradient-to-r from-ivory-200 via-ivory-100 to-ivory-200"
							style={{
								backgroundSize: "200% 100%",
								animationName: "shimmer",
								animationDuration: "1.5s",
								animationIterationCount: "infinite",
							}}
						/>
					)}

					<Image
						src={product.image}
						alt={product.name}
						fill
						className={cn(
							"object-cover transition-all duration-700 ease-out",
							isHovered ? "scale-110" : "scale-100",
							imageLoaded ? "opacity-100" : "opacity-0"
						)}
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						onLoad={() => setImageLoaded(true)}
					/>

					{/* Hover Overlay */}
					<div
						className={cn(
							"absolute inset-0 bg-gradient-to-t from-noir-900/60 via-noir-900/20 to-transparent transition-opacity duration-500",
							isHovered ? "opacity-100" : "opacity-0"
						)}
					/>

					{/* Badge */}
					{badge && (
						<div className="absolute top-3 left-3 z-10">
							<span
								className={cn(
									"inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
									badge.className
								)}
							>
								{product.badge === "new" && (
									<HiSparkles className="w-2.5 h-2.5" />
								)}
								{badge.text}
							</span>
						</div>
					)}

					{/* Wishlist */}
					<button
						onClick={(e) => {
							e.preventDefault();
							setIsLiked(!isLiked);
						}}
						className={cn(
							"absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
							isLiked
								? "bg-rose-500 text-white scale-100"
								: "bg-white/90 text-noir-600 hover:bg-white hover:text-rose-500",
							isHovered || isLiked
								? "opacity-100 translate-y-0"
								: "opacity-0 -translate-y-2"
						)}
						aria-label={
							isLiked ? "Remove from wishlist" : "Add to wishlist"
						}
					>
						{isLiked ? (
							<HiHeart className="w-4 h-4" />
						) : (
							<HiOutlineHeart className="w-4 h-4" />
						)}
					</button>

					{/* Quick Actions */}
					<div
						className={cn(
							"absolute bottom-3 left-3 right-3 z-10 flex gap-2 transition-all duration-500",
							isHovered
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-4"
						)}
					>
						<button
							className={cn(
								"flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl",
								"bg-white/95 text-noir-800",
								"text-[10px] font-semibold uppercase tracking-wider",
								"transition-all duration-300",
								"hover:bg-gold-500 hover:text-noir-900 hover:shadow-luxury"
							)}
						>
							<HiOutlineShoppingBag className="w-3.5 h-3.5" />
							Add to Bag
						</button>

						<button
							className="w-10 h-10 flex items-center justify-center bg-white/95 hover:bg-noir-900 hover:text-ivory-50 rounded-xl text-noir-800 transition-all duration-300"
							aria-label="Quick view"
						>
							<HiOutlineEye className="w-4 h-4" />
						</button>
					</div>

					{/* Notes Preview */}
					<div
						className={cn(
							"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center transition-all duration-500",
							isHovered
								? "opacity-100 scale-100"
								: "opacity-0 scale-95"
						)}
					>
						<div className="glass-dark rounded-xl px-4 py-3 min-w-[140px]">
							<p className="text-[8px] text-gold-400 uppercase tracking-widest mb-1">
								Key Notes
							</p>
							<p className="text-[11px] text-ivory-100 font-medium">
								{product.notes.middle.join(" • ")}
							</p>
						</div>
					</div>
				</div>

				{/* Product Info */}
				<div className="p-4">
					<p className="text-[9px] text-gold-600 uppercase tracking-widest mb-1">
						{product.category}
					</p>

					<h3 className="font-heading text-base font-bold text-noir-900 mb-0.5 group-hover:text-gold-700 transition-colors duration-300">
						{product.name}
					</h3>
					<p className="text-[11px] text-noir-500 italic mb-2">
						{product.tagline}
					</p>

					<div className="flex items-center gap-1 mb-3">
						<div className="flex items-center">
							{[...Array(5)].map((_, i) => (
								<HiStar
									key={i}
									className={cn(
										"w-3 h-3",
										i < Math.floor(product.rating)
											? "text-gold-500"
											: "text-ivory-300"
									)}
								/>
							))}
						</div>
						<span className="text-[10px] text-noir-400 ml-0.5">
							({product.rating})
						</span>
					</div>

					<div className="flex items-end justify-between">
						<div className="flex items-baseline gap-2">
							<span className="font-heading text-lg font-bold text-noir-900">
								{formatPrice(product.price)}
							</span>
							{product.originalPrice && (
								<span className="text-xs text-noir-400 line-through">
									{formatPrice(product.originalPrice)}
								</span>
							)}
						</div>
						<span className="text-[10px] text-noir-400 bg-ivory-200 px-2 py-0.5 rounded-full">
							{product.size}
						</span>
					</div>
				</div>
			</div>
		</article>
	);
}
