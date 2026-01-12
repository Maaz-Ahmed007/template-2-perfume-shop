// src/components/Hero.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HERO_SLIDES, SOCIAL_LINKS, BRAND_PROMISES } from "@/lib/constants";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSwipe } from "@/hooks/useSwipe";
import Button from "./ui/Button";
import MagneticElement from "./ui/MagneticElement";
import {
	HiArrowRight,
	HiPlay,
	HiChevronLeft,
	HiChevronRight,
} from "react-icons/hi";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { PiLeafDuotone, PiSparkle, PiShieldCheck } from "react-icons/pi";

const socialIcons = {
	instagram: FaInstagram,
	tiktok: FaTiktok,
	facebook: FaFacebookF,
};

const promiseIcons = {
	sparkles: PiSparkle,
	leaf: PiLeafDuotone,
	shield: PiShieldCheck,
};

export default function Hero() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [isSocialOpen, setIsSocialOpen] = useState(false);

	const heroRef = useRef<HTMLElement>(null);
	const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

	const mousePosition = useMousePosition();
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const isTablet = useMediaQuery("(min-width: 768px)");
	const isMobile = useMediaQuery("(max-width: 767px)");

	const currentData = HERO_SLIDES[currentSlide];

	const changeSlide = useCallback(
		(newIndex: number) => {
			if (isAnimating || newIndex === currentSlide) return;
			setIsAnimating(true);
			setCurrentSlide(newIndex);
			setTimeout(() => setIsAnimating(false), 600);
		},
		[currentSlide, isAnimating]
	);

	const nextSlide = useCallback(() => {
		const newIndex = (currentSlide + 1) % HERO_SLIDES.length;
		changeSlide(newIndex);
	}, [currentSlide, changeSlide]);

	const prevSlide = useCallback(() => {
		const newIndex =
			(currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
		changeSlide(newIndex);
	}, [currentSlide, changeSlide]);

	const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
		onSwipeLeft: nextSlide,
		onSwipeRight: prevSlide,
		threshold: 50,
	});

	useEffect(() => {
		autoPlayRef.current = setInterval(() => {
			if (!isAnimating) nextSlide();
		}, 6000);
		return () => {
			if (autoPlayRef.current) clearInterval(autoPlayRef.current);
		};
	}, [nextSlide, isAnimating]);

	const resetAutoPlay = useCallback(() => {
		if (autoPlayRef.current) clearInterval(autoPlayRef.current);
		autoPlayRef.current = setInterval(() => {
			if (!isAnimating) nextSlide();
		}, 6000);
	}, [nextSlide, isAnimating]);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (!heroRef.current) return;
			const rect = heroRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const scrollStart = windowHeight * 0.6;
			const scrolled = Math.max(0, -rect.top - scrollStart);
			const maxScroll = rect.height * 0.5;
			setScrollProgress(Math.min(1, Math.max(0, scrolled / maxScroll)));
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const formatPrice = (price: number) => `Rs.${price.toLocaleString()}`;

	const parallaxX = isDesktop ? mousePosition.normalizedX * 8 : 0;
	const parallaxY = isDesktop ? mousePosition.normalizedY * 8 : 0;

	const contentOpacity = 1 - scrollProgress * 0.8;
	const contentTranslateY = scrollProgress * 30;

	// Animation style helper - avoids mixing shorthand with individual properties
	const getAnimationStyle = (
		delay: number,
		animationType: string = "fade-up"
	) => {
		if (!isLoaded) return { opacity: 0 };
		return {
			animationName: animationType,
			animationDuration: "0.5s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${delay}s`,
		};
	};

	const getScaleAnimationStyle = (delay: number) => {
		if (!isLoaded) return { opacity: 0 };
		return {
			animationName: "scale-in",
			animationDuration: "0.8s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${delay}s`,
		};
	};

	const getFadeLeftStyle = (delay: number) => {
		if (!isLoaded) return { opacity: 0 };
		return {
			animationName: "fade-left",
			animationDuration: "0.4s",
			animationTimingFunction: "ease-out",
			animationFillMode: "forwards" as const,
			animationDelay: `${delay}s`,
		};
	};

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-noir-950"
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			{/* Background */}
			<div
				className="absolute inset-0"
				style={{ transform: `scale(${1 + scrollProgress * 0.05})` }}
			>
				{HERO_SLIDES.map((slide, index) => (
					<div
						key={slide.id}
						className={cn(
							"absolute inset-0 transition-all duration-700 ease-out",
							index === currentSlide ? "opacity-100" : "opacity-0"
						)}
					>
						<Image
							src={slide.image}
							alt=""
							fill
							className="object-cover object-center"
							priority={index === 0}
							sizes="100vw"
							style={{
								transform: isDesktop
									? `translate(${parallaxX * -1}px, ${
											parallaxY * -1
									  }px)`
									: undefined,
							}}
						/>
					</div>
				))}
				<div className="absolute inset-0 bg-gradient-to-r from-noir-950/90 via-noir-950/40 to-noir-950/75" />
				<div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-noir-950/40" />
			</div>

			{/* Decorative */}
			{isDesktop && (
				<div className="absolute inset-0 pointer-events-none z-10">
					<div
						className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full opacity-20"
						style={{
							background:
								"radial-gradient(circle, var(--color-gold-500) 0%, transparent 70%)",
							filter: "blur(60px)",
							animationName: "pulse-soft",
							animationDuration: "6s",
							animationTimingFunction: "ease-in-out",
							animationIterationCount: "infinite",
						}}
					/>
					<div
						className="absolute bottom-1/3 right-1/4 w-[280px] h-[280px] rounded-full opacity-15"
						style={{
							background:
								"radial-gradient(circle, var(--color-rose-400) 0%, transparent 70%)",
							filter: "blur(50px)",
							animationName: "pulse-soft",
							animationDuration: "8s",
							animationTimingFunction: "ease-in-out",
							animationIterationCount: "infinite",
							animationDelay: "2s",
						}}
					/>
				</div>
			)}

			{/* Main Content */}
			<div
				className="relative z-20 container-wide min-h-screen min-h-[100dvh] flex items-center justify-center pb-20 sm:pb-24"
				style={{
					opacity: contentOpacity,
					transform: `translateY(${contentTranslateY}px)`,
				}}
			>
				<div className="grid lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 items-center w-full py-20 lg:py-0">
					{/* Left Content */}
					<div className="text-center lg:text-left order-2 lg:order-1">
						{/* Badge */}
						<div
							className="inline-flex items-center gap-2 mb-4 opacity-0"
							style={getAnimationStyle(0.1)}
						>
							<span className="w-8 h-px bg-gradient-to-r from-transparent to-gold-500" />
							<span className="text-[9px] sm:text-[10px] font-medium text-gold-400 tracking-[0.2em] uppercase">
								New Collection 2024
							</span>
							<span className="w-8 h-px bg-gradient-to-l from-transparent to-gold-500" />
						</div>

						{/* Title */}
						<h1
							key={`title-${currentSlide}`}
							className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl font-bold text-ivory-50 leading-[1.15] mb-3 opacity-0"
							style={getAnimationStyle(0.15)}
						>
							{currentData.title}{" "}
							<span className="text-gradient-gold">
								{currentData.highlight}
							</span>
						</h1>

						{/* Subtitle */}
						<p
							key={`subtitle-${currentSlide}`}
							className="text-gold-400/80 text-xs sm:text-sm font-accent italic mb-3 opacity-0"
							style={getAnimationStyle(0.2)}
						>
							{currentData.subtitle}
						</p>

						{/* Description */}
						<p
							key={`desc-${currentSlide}`}
							className="text-[11px] sm:text-xs text-ivory-400/60 max-w-sm mx-auto lg:mx-0 mb-5 leading-relaxed opacity-0"
							style={getAnimationStyle(0.25)}
						>
							{currentData.description}
						</p>

						{/* CTA Buttons */}
						<div
							className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start opacity-0"
							style={getAnimationStyle(0.3)}
						>
							<MagneticElement
								strength={0.1}
								disabled={!isDesktop}
							>
								<Button
									variant="primary"
									size="md"
									rightIcon={
										<HiArrowRight className="w-3.5 h-3.5" />
									}
									className="group"
								>
									{currentData.cta}
								</Button>
							</MagneticElement>

							<button className="group flex items-center gap-2 px-3 py-2 text-ivory-300/70 hover:text-gold-400 transition-colors duration-300">
								<span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-ivory-300/30 group-hover:border-gold-400/50 transition-all duration-300">
									<HiPlay className="w-3 h-3 ml-0.5" />
								</span>
								<span className="font-medium text-xs">
									Watch Story
								</span>
							</button>
						</div>

						{/* Brand Promises */}
						<div
							className="hidden sm:flex items-center gap-6 lg:gap-8 mt-10 sm:mt-12 pt-8 border-t border-ivory-100/10 opacity-0"
							style={getAnimationStyle(0.5)}
						>
							{BRAND_PROMISES.map((promise, index) => {
								const Icon =
									promiseIcons[
										promise.icon as keyof typeof promiseIcons
									];
								return (
									<div
										key={promise.id}
										className="flex items-center gap-3"
									>
										<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20">
											<Icon className="w-5 h-5 text-gold-400" />
										</div>
										<div className="text-left">
											<p className="text-xs font-semibold text-ivory-100 tracking-wide">
												{promise.title}
											</p>
											<p className="text-[10px] text-ivory-400/70">
												{promise.description}
											</p>
										</div>
										{index < BRAND_PROMISES.length - 1 && (
											<div className="hidden lg:block w-px h-8 bg-ivory-100/10 ml-4" />
										)}
									</div>
								);
							})}
						</div>
					</div>

					{/* Right Content - Perfume */}
					<div
						className="relative flex items-center justify-center order-1 lg:order-2 opacity-0"
						style={getScaleAnimationStyle(0.3)}
					>
						{/* Mobile/Tablet */}
						<div className="lg:hidden relative w-full max-w-[200px] sm:max-w-[260px] mx-auto">
							<div className="relative aspect-[3/4]">
								{HERO_SLIDES.map((slide, index) => (
									<div
										key={slide.id}
										className={cn(
											"absolute inset-0 transition-all duration-600 ease-out",
											index === currentSlide
												? "opacity-100 scale-100"
												: "opacity-0 scale-95"
										)}
									>
										<Image
											src={slide.perfumeImage}
											alt="Luxury Perfume"
											fill
											className="object-contain drop-shadow-2xl"
											priority={index === 0}
											sizes="260px"
										/>
									</div>
								))}
							</div>
							<div
								className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4"
								style={{
									animationName: "float",
									animationDuration: "5s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
								}}
							>
								<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex flex-col items-center justify-center text-noir-900 shadow-luxury">
									<span className="text-[7px] sm:text-[8px] font-medium opacity-70">
										From
									</span>
									<span className="text-xs sm:text-sm font-heading font-bold">
										{formatPrice(currentData.price)}
									</span>
								</div>
							</div>
						</div>

						{/* Desktop */}
						<div className="hidden lg:block relative w-full max-w-sm xl:max-w-md">
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<div
									className="absolute w-[320px] xl:w-[380px] h-[320px] xl:h-[380px] rounded-full border border-gold-500/10"
									style={{
										animationName: "rotate-slow",
										animationDuration: "30s",
										animationTimingFunction: "linear",
										animationIterationCount: "infinite",
									}}
								/>
								<div
									className="absolute w-[240px] xl:w-[280px] h-[240px] xl:h-[280px] rounded-full border border-gold-500/15"
									style={{
										animationName: "rotate-slow",
										animationDuration: "25s",
										animationTimingFunction: "linear",
										animationIterationCount: "infinite",
										animationDirection: "reverse",
									}}
								/>
								<div className="absolute w-[160px] xl:w-[180px] h-[160px] xl:h-[180px] rounded-full border border-gold-500/10" />
							</div>

							<div
								className="relative aspect-[3/4] max-w-[280px] xl:max-w-[340px] mx-auto"
								style={{
									transform: `translate(${parallaxX}px, ${parallaxY}px)`,
									transition: "transform 0.2s ease-out",
								}}
							>
								{HERO_SLIDES.map((slide, index) => (
									<div
										key={slide.id}
										className={cn(
											"absolute inset-0 transition-all duration-600 ease-out",
											index === currentSlide
												? "opacity-100 scale-100"
												: "opacity-0 scale-95"
										)}
									>
										<Image
											src={slide.perfumeImage}
											alt="Luxury Perfume"
											fill
											className="object-contain drop-shadow-2xl"
											priority={index === 0}
											sizes="340px"
										/>
									</div>
								))}
								<div
									className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16"
									style={{
										background:
											"radial-gradient(ellipse, var(--color-gold-500) 0%, transparent 70%)",
										filter: "blur(20px)",
										opacity: 0.25,
									}}
								/>
							</div>

							<div
								className="absolute -top-4 -right-4 xl:-top-6 xl:-right-6 glass-gold rounded-xl px-3 py-2 xl:px-4 xl:py-3"
								style={{
									animationName: "float",
									animationDuration: "5s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
								}}
							>
								<span className="text-[9px] text-ivory-200/70 block">
									Top Notes
								</span>
								<p className="text-xs font-medium text-gold-300">
									Bergamot & Rose
								</p>
							</div>

							<div
								className="absolute -bottom-4 -left-4 xl:-bottom-6 xl:-left-6 glass-gold rounded-xl px-3 py-2 xl:px-4 xl:py-3"
								style={{
									animationName: "float",
									animationDuration: "5s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "1.5s",
								}}
							>
								<span className="text-[9px] text-ivory-200/70 block">
									Base Notes
								</span>
								<p className="text-xs font-medium text-gold-300">
									Oud & Sandalwood
								</p>
							</div>

							<div
								className="absolute top-1/2 -right-14 xl:-right-20 transform -translate-y-1/2"
								style={{
									animationName: "pulse-soft",
									animationDuration: "4s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
								}}
							>
								<MagneticElement strength={0.25}>
									<div className="w-20 h-20 xl:w-24 xl:h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex flex-col items-center justify-center text-noir-900 shadow-luxury-lg">
										<span className="text-[8px] xl:text-[9px] font-medium opacity-70">
											Starting
										</span>
										<span className="text-sm xl:text-base font-heading font-bold">
											{formatPrice(currentData.price)}
										</span>
									</div>
								</MagneticElement>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Slide Navigation */}
			<div
				className="absolute bottom-8 sm:bottom-10 left-0 right-0 z-30"
				style={{ opacity: 1 - scrollProgress * 2 }}
			>
				<div className="flex items-center justify-center gap-3 sm:gap-4">
					<button
						onClick={() => {
							prevSlide();
							resetAutoPlay();
						}}
						disabled={isAnimating}
						className={cn(
							"w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300",
							"border border-ivory-100/20 text-ivory-300/70",
							"hover:border-ivory-100/40 hover:text-ivory-100",
							"disabled:opacity-30 disabled:cursor-not-allowed"
						)}
						aria-label="Previous"
					>
						<HiChevronLeft className="w-4 h-4" />
					</button>

					<div className="flex items-center gap-2">
						{HERO_SLIDES.map((_, index) => (
							<button
								key={index}
								onClick={() => {
									changeSlide(index);
									resetAutoPlay();
								}}
								disabled={isAnimating}
								className="group relative"
								aria-label={`Slide ${index + 1}`}
							>
								<span
									className={cn(
										"block h-1 rounded-full transition-all duration-500",
										index === currentSlide
											? "w-8 sm:w-10 bg-gold-500/40"
											: "w-1.5 sm:w-2 bg-ivory-100/25 group-hover:bg-ivory-100/40"
									)}
								/>
								{index === currentSlide && (
									<span
										className="absolute top-0 left-0 h-1 rounded-full bg-gold-500 origin-left"
										style={{
											animationName: isAnimating
												? "none"
												: "slide-progress",
											animationDuration: "6s",
											animationTimingFunction: "linear",
											animationFillMode: "forwards",
										}}
									/>
								)}
							</button>
						))}
					</div>

					<button
						onClick={() => {
							nextSlide();
							resetAutoPlay();
						}}
						disabled={isAnimating}
						className={cn(
							"w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300",
							"border border-gold-500/30 text-gold-400 bg-gold-500/10",
							"hover:bg-gold-500 hover:text-noir-900 hover:border-gold-500",
							"disabled:opacity-30 disabled:cursor-not-allowed"
						)}
						aria-label="Next"
					>
						<HiChevronRight className="w-4 h-4" />
					</button>
				</div>
			</div>

			{/* Social - Desktop/Tablet Right Side */}
			{isTablet && (
				<div
					className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2.5"
					style={{ opacity: 1 - scrollProgress * 2 }}
				>
					<div className="w-px h-8 bg-gradient-to-b from-transparent to-ivory-400/20" />
					{SOCIAL_LINKS.map((social, index) => {
						const Icon =
							socialIcons[social.id as keyof typeof socialIcons];
						return (
							<MagneticElement key={social.id} strength={0.15}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="w-9 h-9 rounded-full border border-ivory-100/15 flex items-center justify-center text-ivory-400/70 hover:text-gold-400 hover:border-gold-400/40 hover:bg-gold-400/5 transition-all duration-300 opacity-0"
									style={getFadeLeftStyle(1 + index * 0.08)}
									aria-label={social.name}
								>
									<Icon className="w-3.5 h-3.5" />
								</a>
							</MagneticElement>
						);
					})}
					<div className="w-px h-8 bg-gradient-to-t from-transparent to-ivory-400/20" />
				</div>
			)}

			{/* Social - Mobile Slide-out */}
			{isMobile && (
				<>
					<button
						onClick={() => setIsSocialOpen(!isSocialOpen)}
						className={cn(
							"fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300",
							"w-8 h-10 rounded-r-lg flex items-center justify-center",
							"bg-noir-900/70 backdrop-blur-sm border border-l-0 border-ivory-100/10",
							"text-ivory-400",
							isSocialOpen && "translate-x-12"
						)}
						style={{ opacity: 1 - scrollProgress * 2 }}
						aria-label="Social links"
					>
						<svg
							className={cn(
								"w-3 h-3 transition-transform duration-300",
								isSocialOpen && "rotate-180"
							)}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>

					<div
						className={cn(
							"fixed left-0 top-1/2 -translate-y-1/2 z-30 transition-transform duration-300",
							"bg-noir-900/80 backdrop-blur-md rounded-r-xl py-3 px-2",
							"border border-l-0 border-ivory-100/10",
							isSocialOpen ? "translate-x-0" : "-translate-x-full"
						)}
						style={{ opacity: 1 - scrollProgress * 2 }}
					>
						<div className="flex flex-col items-center gap-2">
							{SOCIAL_LINKS.map((social) => {
								const Icon =
									socialIcons[
										social.id as keyof typeof socialIcons
									];
								return (
									<a
										key={social.id}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="w-8 h-8 rounded-full border border-ivory-100/15 flex items-center justify-center text-ivory-400 hover:text-gold-400 hover:border-gold-400/40 transition-all duration-300"
										aria-label={social.name}
									>
										<Icon className="w-3 h-3" />
									</a>
								);
							})}
						</div>
					</div>
				</>
			)}

			{/* Bottom Wave */}
			<div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
				<svg
					viewBox="0 0 1440 60"
					fill="none"
					preserveAspectRatio="none"
					className="w-full h-10 sm:h-12"
				>
					<path
						d="M0,40 C400,60 800,20 1440,40 L1440,60 L0,60 Z"
						fill="var(--color-ivory-100)"
					/>
				</svg>
			</div>
		</section>
	);
}
