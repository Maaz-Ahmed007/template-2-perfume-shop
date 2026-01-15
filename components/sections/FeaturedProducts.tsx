"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FEATURED_PRODUCTS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ProductCard from "@/components/ui/ProductCard";
import MagneticElement from "@/components/ui/MagneticElement";
import {
	HiArrowRight,
	HiArrowLeft,
	HiOutlineArrowNarrowRight,
} from "react-icons/hi";

export default function FeaturedProducts() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	const totalPages = Math.ceil(FEATURED_PRODUCTS.length / 2);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container || isDesktop) return;

		const updateCurrentPage = () => {
			const totalScrollable =
				container.scrollWidth - container.clientWidth;
			if (totalScrollable > 0) {
				const page = Math.round(
					(container.scrollLeft / totalScrollable) * (totalPages - 1)
				);
				setCurrentPage(page);
			}
		};

		updateCurrentPage();

		container.addEventListener("scroll", updateCurrentPage);
		return () => container.removeEventListener("scroll", updateCurrentPage);
	}, [isDesktop, totalPages]);

	const scroll = (direction: "left" | "right") => {
		if (!scrollContainerRef.current) return;
		const container = scrollContainerRef.current;
		const scrollAmount = container.clientWidth * 0.8;
		const newPosition =
			direction === "left"
				? scrollPosition - scrollAmount
				: scrollPosition + scrollAmount;

		container.scrollTo({ left: newPosition, behavior: "smooth" });
		setScrollPosition(newPosition);
	};

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			setScrollPosition(scrollContainerRef.current.scrollLeft);
		}
	};

	const handlePageClick = (pageIndex: number) => {
		const container = scrollContainerRef.current;
		if (!container || !isDesktop) return;

		const totalScrollable = container.scrollWidth - container.clientWidth;
		const scrollTo = totalScrollable * (pageIndex / (totalPages - 1));
		container.scrollTo({
			left: scrollTo,
			behavior: "smooth",
		});
	};

	// Animation style helper
	const getAnimationStyle = (delay: number) => {
		if (!isInView) return { opacity: 0 };
		return {
			opacity: 0,
			animationName: "fade-up",
			animationDuration: "0.5s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${delay}s`,
		};
	};

	const getFadeLeftStyle = (delay: number) => {
		if (!isInView) return { opacity: 0 };
		return {
			opacity: 0,
			animationName: "fade-left",
			animationDuration: "0.5s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${delay}s`,
		};
	};

	return (
		<section
			ref={sectionRef as React.RefObject<HTMLElement>}
			className="relative section-py bg-ivory-100 overflow-hidden"
		>
			{/* Background Decorations */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div
					className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-30"
					style={{
						background:
							"radial-gradient(circle, var(--color-gold-200) 0%, transparent 70%)",
						filter: "blur(60px)",
					}}
				/>
				<div
					className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20"
					style={{
						background:
							"radial-gradient(circle, var(--color-rose-200) 0%, transparent 70%)",
						filter: "blur(80px)",
					}}
				/>

				<svg
					className="absolute top-20 left-10 w-32 h-32 text-gold-500/5"
					viewBox="0 0 100 100"
					fill="none"
				>
					<circle
						cx="50"
						cy="50"
						r="45"
						stroke="currentColor"
						strokeWidth="0.5"
					/>
					<circle
						cx="50"
						cy="50"
						r="35"
						stroke="currentColor"
						strokeWidth="0.5"
					/>
					<circle
						cx="50"
						cy="50"
						r="25"
						stroke="currentColor"
						strokeWidth="0.5"
					/>
				</svg>
			</div>

			<div className="container-wide relative z-10">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-8 lg:mb-12">
					<div className="flex-1 text-center sm:text-left">
						<div
							className="flex items-center gap-3 mb-3 justify-center sm:justify-start"
							style={getAnimationStyle(0)}
						>
							<span className="w-8 h-px bg-gradient-to-r from-transparent to-gold-500" />
							<span className="text-[10px] font-semibold text-gold-600 uppercase tracking-[0.2em]">
								Curated Selection
							</span>
							<span className="w-8 h-px bg-gradient-to-l from-transparent to-gold-500" />
						</div>

						<h2
							className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-noir-900 mb-2"
							style={getAnimationStyle(0.1)}
						>
							Featured{" "}
							<span className="text-gradient-gold">
								Fragrances
							</span>
						</h2>

						<p
							className="text-sm text-noir-500 max-w-md mx-auto sm:mx-0"
							style={getAnimationStyle(0.2)}
						>
							Discover our handpicked collection of exceptional
							scents
						</p>
					</div>

					<div
						className="hidden sm:block flex-shrink-0"
						style={getFadeLeftStyle(0.3)}
					>
						<MagneticElement strength={0.1}>
							<Link
								href="/collections"
								className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-noir-200 hover:border-gold-500 hover:bg-gold-50 transition-all duration-300"
							>
								<span className="text-xs font-semibold text-noir-700 group-hover:text-gold-700 uppercase tracking-wider">
									View All
								</span>
								<span className="flex items-center justify-center w-6 h-6 rounded-full bg-noir-100 group-hover:bg-gold-500 transition-all duration-300">
									<HiOutlineArrowNarrowRight className="w-3.5 h-3.5 text-noir-600 group-hover:text-noir-900 transition-transform group-hover:translate-x-0.5" />
								</span>
							</Link>
						</MagneticElement>
					</div>
				</div>

				{/* Products Grid - Desktop */}
				<div className="hidden lg:grid lg:grid-cols-4 gap-6">
					{FEATURED_PRODUCTS.map((product, index) => (
						<ProductCard
							key={product.id}
							product={product}
							index={index}
							isInView={isInView}
						/>
					))}
				</div>

				{/* Products Carousel - Mobile/Tablet */}
				<div className="lg:hidden relative">
					<div
						ref={scrollContainerRef}
						onScroll={handleScroll}
						className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-4"
					>
						{FEATURED_PRODUCTS.map((product, index) => (
							<div
								key={product.id}
								className="flex-shrink-0 w-[72%] sm:w-[45%] snap-start"
							>
								<ProductCard
									product={product}
									index={index}
									isInView={isInView}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Pagination */}
				<div
					className="flex items-center justify-center gap-4 mt-8 lg:mt-12"
					style={getAnimationStyle(0.5)}
				>
					<button
						onClick={() => scroll("left")}
						className={cn(
							"w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
							"border border-noir-200 text-noir-500",
							"hover:border-gold-500 hover:text-gold-600 hover:bg-gold-50",
							"lg:opacity-50 lg:hover:opacity-100"
						)}
						aria-label="Previous"
					>
						<HiArrowLeft className="w-4 h-4" />
					</button>

					<div className="flex items-center gap-1.5">
						{[
							...Array(
								Math.ceil(
									FEATURED_PRODUCTS.length /
										(isDesktop ? 4 : 2)
								)
							),
						].map((_, i) => {
							const isActive = isDesktop
								? i === 0
								: i === currentPage;

							return (
								<button
									key={i}
									onClick={() => handlePageClick(i)}
									className={cn(
										"transition-all duration-300 rounded-full",
										isActive
											? "w-6 h-2 bg-gold-500"
											: "w-2 h-2 bg-noir-200 hover:bg-noir-300"
									)}
									aria-label={`Page ${i + 1}`}
								/>
							);
						})}
					</div>

					<button
						onClick={() => scroll("right")}
						className={cn(
							"w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
							"bg-gold-500 text-noir-900 border border-gold-500",
							"hover:bg-gold-400 hover:border-gold-400",
							"lg:opacity-50 lg:hover:opacity-100"
						)}
						aria-label="Next"
					>
						<HiArrowRight className="w-4 h-4" />
					</button>
				</div>

				{/* Mobile View All */}
				<div
					className="sm:hidden flex justify-center mt-6"
					style={getAnimationStyle(0.6)}
				>
					<Link
						href="/collections"
						className="inline-flex items-center gap-2 px-5 py-2.5 bg-noir-900 text-ivory-50 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-noir-800 transition-colors duration-300"
					>
						<span>View All</span>
						<HiArrowRight className="w-3.5 h-3.5" />
					</Link>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
		</section>
	);
}
