// src/components/sections/CollectionsShowcase.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { COLLECTIONS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MagneticElement from "@/components/ui/MagneticElement";
import Button from "@/components/ui/Button";
import { HiArrowRight } from "react-icons/hi";

export default function CollectionsShowcase() {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const scrollRef = useRef<HTMLDivElement>(null);

	const featuredCollection =
		COLLECTIONS.find((c) => c.featured) || COLLECTIONS[0];
	const otherCollections = COLLECTIONS.filter(
		(c) => c.id !== featuredCollection.id
	);

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

	const getScaleAnimationStyle = (delay: number) => {
		if (!isInView) return { opacity: 0 };
		return {
			opacity: 0,
			animationName: "scale-in",
			animationDuration: "0.7s",
			animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
			animationFillMode: "forwards" as const,
			animationDelay: `${delay}s`,
		};
	};

	return (
		<section
			ref={sectionRef as React.RefObject<HTMLElement>}
			className="relative py-16 sm:py-20 lg:py-24 bg-noir-950 overflow-hidden"
		>
			{/* Animated Background */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Floating Gradient Orbs */}
				<div
					className="absolute w-[600px] h-[600px] rounded-full opacity-[0.15]"
					style={{
						background:
							"radial-gradient(circle, var(--color-gold-500) 0%, transparent 60%)",
						filter: "blur(100px)",
						top: "-20%",
						right: "-10%",
						animationName: "float-slow",
						animationDuration: "20s",
						animationTimingFunction: "ease-in-out",
						animationIterationCount: "infinite",
					}}
				/>
				<div
					className="absolute w-[500px] h-[500px] rounded-full opacity-[0.1]"
					style={{
						background:
							"radial-gradient(circle, var(--color-rose-400) 0%, transparent 60%)",
						filter: "blur(80px)",
						bottom: "-15%",
						left: "-10%",
						animationName: "float-slow",
						animationDuration: "25s",
						animationTimingFunction: "ease-in-out",
						animationIterationCount: "infinite",
						animationDelay: "5s",
					}}
				/>
				<div
					className="absolute w-[400px] h-[400px] rounded-full opacity-[0.08]"
					style={{
						background:
							"radial-gradient(circle, var(--color-gold-400) 0%, transparent 60%)",
						filter: "blur(60px)",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						animationName: "pulse-glow",
						animationDuration: "8s",
						animationTimingFunction: "ease-in-out",
						animationIterationCount: "infinite",
					}}
				/>

				{/* Animated Particles */}
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 rounded-full bg-gold-500/30"
						style={{
							left: `${15 + i * 15}%`,
							top: `${20 + (i % 3) * 25}%`,
							animationName: "float-particle",
							animationDuration: `${6 + i * 2}s`,
							animationTimingFunction: "ease-in-out",
							animationIterationCount: "infinite",
							animationDelay: `${i * 0.8}s`,
						}}
					/>
				))}

				{/* Subtle Grid Pattern */}
				<div
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage: `linear-gradient(var(--color-gold-500) 1px, transparent 1px), 
                              linear-gradient(90deg, var(--color-gold-500) 1px, transparent 1px)`,
						backgroundSize: "80px 80px",
					}}
				/>

				{/* Moving Gradient Line */}
				<div
					className="absolute top-0 left-0 right-0 h-px"
					style={{
						background:
							"linear-gradient(90deg, transparent, var(--color-gold-500), transparent)",
						backgroundSize: "200% 100%",
						animationName: "shimmer-line",
						animationDuration: "8s",
						animationTimingFunction: "linear",
						animationIterationCount: "infinite",
					}}
				/>
			</div>

			<div className="container-wide relative z-10">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
					<div className="text-center sm:text-left">
						<div
							className="flex items-center gap-2 mb-3 justify-center sm:justify-start"
							style={getAnimationStyle(0)}
						>
							<span className="w-8 h-px bg-gradient-to-r from-transparent to-gold-500" />
							<span className="text-[10px] font-semibold text-gold-500 uppercase tracking-[0.2em]">
								Explore
							</span>
							<span className="w-8 h-px bg-gradient-to-l from-transparent to-gold-500" />
						</div>

						<h2
							className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-ivory-50 mb-2"
							style={getAnimationStyle(0.1)}
						>
							Our{" "}
							<span className="text-gradient-gold">
								Collections
							</span>
						</h2>

						<p
							className="text-sm text-ivory-400/70 max-w-md mx-auto sm:mx-0"
							style={getAnimationStyle(0.2)}
						>
							Explore our curated range of luxury fragrances
						</p>
					</div>

					{/* View All Button - Matching Hero CTA Style */}
					<div
						className="hidden sm:block"
						style={getAnimationStyle(0.3)}
					>
						<MagneticElement strength={0.1}>
							<Link href="/collections">
								<Button
									variant="primary"
									size="md"
									rightIcon={
										<HiArrowRight className="w-3.5 h-3.5" />
									}
									className="group"
								>
									View All Collections
								</Button>
							</Link>
						</MagneticElement>
					</div>
				</div>

				{/* Desktop Layout - Bento Grid */}
				<div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-2 gap-4 lg:gap-5">
					{/* Featured Large Card */}
					<div
						className="col-span-5 row-span-2"
						style={getScaleAnimationStyle(0.2)}
					>
						<Link
							href={`/collections/${featuredCollection.slug}`}
							className="group relative block h-full min-h-[500px] rounded-2xl overflow-hidden"
							onMouseEnter={() =>
								setHoveredId(featuredCollection.id)
							}
							onMouseLeave={() => setHoveredId(null)}
						>
							<Image
								src={featuredCollection.image}
								alt={featuredCollection.name}
								fill
								className={cn(
									"object-cover transition-all duration-700 ease-out",
									hoveredId === featuredCollection.id
										? "scale-110"
										: "scale-100"
								)}
								sizes="(min-width: 1024px) 40vw, 100vw"
							/>

							<div
								className={cn(
									"absolute inset-0 bg-gradient-to-t transition-all duration-500",
									featuredCollection.color
								)}
							/>

							<div
								className={cn(
									"absolute inset-3 rounded-xl border transition-all duration-500",
									hoveredId === featuredCollection.id
										? "border-gold-500/40"
										: "border-ivory-100/10"
								)}
							/>

							<div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
								<span
									className="inline-flex self-start items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-4"
									style={{
										backgroundColor: `${featuredCollection.accent}20`,
										color: featuredCollection.accent,
										border: `1px solid ${featuredCollection.accent}40`,
									}}
								>
									Featured
								</span>

								<h3 className="font-heading text-2xl lg:text-3xl font-bold text-ivory-50 mb-2">
									{featuredCollection.name}
								</h3>

								<p className="text-base text-ivory-200/90 font-accent italic mb-3">
									{featuredCollection.tagline}
								</p>

								<p className="text-sm text-ivory-300/70 mb-5 max-w-sm leading-relaxed">
									{featuredCollection.description}
								</p>

								<div className="flex items-center justify-between">
									<span className="text-xs text-ivory-400">
										{featuredCollection.productCount}{" "}
										Fragrances
									</span>

									<span
										className={cn(
											"flex items-center gap-2 text-sm font-medium transition-all duration-300",
											hoveredId === featuredCollection.id
												? "text-gold-400"
												: "text-ivory-300"
										)}
									>
										Explore
										<span
											className={cn(
												"w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
												hoveredId ===
													featuredCollection.id
													? "bg-gold-500 text-noir-900"
													: "bg-ivory-100/10"
											)}
										>
											<HiArrowRight className="w-4 h-4" />
										</span>
									</span>
								</div>
							</div>

							<div
								className={cn(
									"absolute inset-0 transition-opacity duration-500 pointer-events-none",
									hoveredId === featuredCollection.id
										? "opacity-100"
										: "opacity-0"
								)}
								style={{
									background: `radial-gradient(circle at 50% 100%, ${featuredCollection.accent}15 0%, transparent 60%)`,
								}}
							/>
						</Link>
					</div>

					{/* Other Collections - 2x2 Grid */}
					{otherCollections.map((collection, index) => (
						<div
							key={collection.id}
							className="col-span-7 lg:col-span-7/2"
							style={{
								...getScaleAnimationStyle(0.3 + index * 0.1),
								gridColumn:
									index < 2
										? `${6 + index * 4} / span 4`
										: `${6 + (index - 2) * 4} / span 4`,
								gridRow: index < 2 ? "1" : "2",
							}}
						>
							<Link
								href={`/collections/${collection.slug}`}
								className="group relative block h-full min-h-[240px] rounded-2xl overflow-hidden"
								onMouseEnter={() => setHoveredId(collection.id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								<Image
									src={collection.image}
									alt={collection.name}
									fill
									className={cn(
										"object-cover transition-all duration-700 ease-out",
										hoveredId === collection.id
											? "scale-110"
											: "scale-100"
									)}
									sizes="(min-width: 1024px) 30vw, 50vw"
								/>

								<div
									className={cn(
										"absolute inset-0 bg-gradient-to-t transition-all duration-500",
										collection.color
									)}
								/>

								<div className="absolute inset-0 p-5 flex flex-col justify-end">
									<h3 className="font-heading text-lg lg:text-xl font-bold text-ivory-50 mb-1">
										{collection.name}
									</h3>

									<p className="text-xs text-ivory-300/80 font-accent italic mb-3">
										{collection.tagline}
									</p>

									<div className="flex items-center justify-between">
										<span className="text-[10px] text-ivory-400">
											{collection.productCount} Fragrances
										</span>

										<span
											className={cn(
												"w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
												hoveredId === collection.id
													? "bg-gold-500 text-noir-900 scale-100"
													: "bg-ivory-100/10 text-ivory-300 scale-90"
											)}
										>
											<HiArrowRight className="w-3.5 h-3.5" />
										</span>
									</div>
								</div>

								<div
									className={cn(
										"absolute top-3 right-3 w-8 h-8 transition-all duration-300",
										hoveredId === collection.id
											? "opacity-100"
											: "opacity-0"
									)}
								>
									<svg
										viewBox="0 0 32 32"
										fill="none"
										className="w-full h-full"
									>
										<path
											d="M0 0 L32 0 L32 32"
											stroke={collection.accent}
											strokeWidth="2"
											fill="none"
											strokeOpacity="0.5"
										/>
									</svg>
								</div>
							</Link>
						</div>
					))}
				</div>

				{/* Tablet Layout */}
				<div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4">
					{COLLECTIONS.map((collection, index) => (
						<div
							key={collection.id}
							className={cn(
								collection.featured && "md:col-span-2"
							)}
							style={getScaleAnimationStyle(0.2 + index * 0.1)}
						>
							<Link
								href={`/collections/${collection.slug}`}
								className={cn(
									"group relative block rounded-2xl overflow-hidden",
									collection.featured
										? "h-[280px]"
										: "h-[220px]"
								)}
								onMouseEnter={() => setHoveredId(collection.id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								<Image
									src={collection.image}
									alt={collection.name}
									fill
									className={cn(
										"object-cover transition-all duration-700",
										hoveredId === collection.id
											? "scale-110"
											: "scale-100"
									)}
									sizes="(min-width: 768px) 50vw, 100vw"
								/>

								<div
									className={cn(
										"absolute inset-0 bg-gradient-to-t",
										collection.color
									)}
								/>

								<div className="absolute inset-0 p-5 flex flex-col justify-end">
									{collection.featured && (
										<span
											className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider mb-3"
											style={{
												backgroundColor: `${collection.accent}20`,
												color: collection.accent,
											}}
										>
											Featured
										</span>
									)}

									<h3
										className={cn(
											"font-heading font-bold text-ivory-50 mb-1",
											collection.featured
												? "text-xl"
												: "text-lg"
										)}
									>
										{collection.name}
									</h3>

									<p className="text-xs text-ivory-300/80 font-accent italic mb-2">
										{collection.tagline}
									</p>

									<div className="flex items-center justify-between">
										<span className="text-[10px] text-ivory-400">
											{collection.productCount} Fragrances
										</span>
										<span
											className={cn(
												"w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
												hoveredId === collection.id
													? "bg-gold-500 text-noir-900"
													: "bg-ivory-100/10 text-ivory-300"
											)}
										>
											<HiArrowRight className="w-3.5 h-3.5" />
										</span>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>

				{/* Mobile Layout */}
				<div className="md:hidden">
					<div
						ref={scrollRef}
						className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-4"
					>
						{COLLECTIONS.map((collection, index) => (
							<div
								key={collection.id}
								className={cn(
									"flex-shrink-0 snap-start",
									collection.featured ? "w-[85%]" : "w-[75%]"
								)}
								style={getScaleAnimationStyle(
									0.2 + index * 0.08
								)}
							>
								<Link
									href={`/collections/${collection.slug}`}
									className={cn(
										"group relative block rounded-2xl overflow-hidden",
										collection.featured
											? "h-[320px]"
											: "h-[260px]"
									)}
								>
									<Image
										src={collection.image}
										alt={collection.name}
										fill
										className="object-cover"
										sizes="85vw"
									/>

									<div
										className={cn(
											"absolute inset-0 bg-gradient-to-t",
											collection.color
										)}
									/>
									<div className="absolute inset-2 rounded-xl border border-ivory-100/10" />

									<div className="absolute inset-0 p-5 flex flex-col justify-end">
										{collection.featured && (
											<span
												className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider mb-3"
												style={{
													backgroundColor: `${collection.accent}20`,
													color: collection.accent,
												}}
											>
												Featured
											</span>
										)}

										<h3
											className={cn(
												"font-heading font-bold text-ivory-50 mb-1",
												collection.featured
													? "text-xl"
													: "text-lg"
											)}
										>
											{collection.name}
										</h3>

										<p className="text-xs text-ivory-300/80 font-accent italic mb-2">
											{collection.tagline}
										</p>

										{collection.featured && (
											<p className="text-xs text-ivory-400/70 mb-3 line-clamp-2">
												{collection.description}
											</p>
										)}

										<div className="flex items-center justify-between">
											<span className="text-[10px] text-ivory-400">
												{collection.productCount}{" "}
												Fragrances
											</span>
											<span className="w-7 h-7 rounded-full flex items-center justify-center bg-gold-500/20 text-gold-400">
												<HiArrowRight className="w-3.5 h-3.5" />
											</span>
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>

					<div className="flex items-center justify-center gap-1.5 mt-4">
						{COLLECTIONS.map((_, index) => (
							<div
								key={index}
								className={cn(
									"h-1 rounded-full transition-all duration-300",
									index === 0
										? "w-4 bg-gold-500"
										: "w-1.5 bg-ivory-100/20"
								)}
							/>
						))}
					</div>
				</div>

				{/* Mobile View All */}
				<div
					className="sm:hidden flex justify-center mt-6"
					style={getAnimationStyle(0.6)}
				>
					<Link href="/collections">
						<Button
							variant="primary"
							size="md"
							rightIcon={<HiArrowRight className="w-3.5 h-3.5" />}
						>
							All Collections
						</Button>
					</Link>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
		</section>
	);
}
