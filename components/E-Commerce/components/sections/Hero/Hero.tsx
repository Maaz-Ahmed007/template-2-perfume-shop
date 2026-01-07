// ============================================
// COMPONENT: Hero
// Main hero section with slides - FULLY FIXED
// ============================================

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "../../../lib/utils";
import type {
	HeroSlide as HeroSlideType,
	HeroFeaturedProduct,
} from "../../../lib/types";
import { ImageWithFallback } from "../../common";
import { HeroSlide } from "./HeroSlide";
import { HeroFloatingCard } from "./HeroFloatingCard";
import { AUTO_SLIDE_INTERVAL } from "../../../lib/constants";
import "./Hero.css";

// ==================== TYPES ====================

export interface HeroProps {
	slides: HeroSlideType[];
	featuredProduct?: HeroFeaturedProduct;
	autoPlayInterval?: number;
}

// ==================== COMPONENT ====================

export const Hero: React.FC<HeroProps> = ({
	slides,
	featuredProduct,
	autoPlayInterval = AUTO_SLIDE_INTERVAL,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [progressKey, setProgressKey] = useState(0);

	// Refs
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Touch/Swipe state
	const touchStartRef = useRef<number>(0);
	const touchEndRef = useRef<number>(0);
	const isDraggingRef = useRef<boolean>(false);

	// Trigger entrance animation
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	// Clear timer helper
	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	// Start timer helper
	const startTimer = useCallback(() => {
		clearTimer();
		if (slides.length <= 1 || isPaused) return;

		timerRef.current = setTimeout(() => {
			setCurrentIndex((prev) => (prev + 1) % slides.length);
			setProgressKey((prev) => prev + 1);
		}, autoPlayInterval);
	}, [slides.length, isPaused, autoPlayInterval, clearTimer]);

	// Go to specific slide - COMPLETELY RESETS TIMER
	const goToSlide = useCallback(
		(index: number) => {
			if (index === currentIndex) return;

			clearTimer();
			setCurrentIndex(index);
			setProgressKey((prev) => prev + 1);

			// Start fresh timer after a brief delay
			setTimeout(() => {
				startTimer();
			}, 50);
		},
		[currentIndex, clearTimer, startTimer]
	);

	// Go to next slide
	const goToNextSlide = useCallback(() => {
		const nextIndex = (currentIndex + 1) % slides.length;
		goToSlide(nextIndex);
	}, [currentIndex, slides.length, goToSlide]);

	// Go to previous slide
	const goToPrevSlide = useCallback(() => {
		const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
		goToSlide(prevIndex);
	}, [currentIndex, slides.length, goToSlide]);

	// Main timer effect
	useEffect(() => {
		if (!isPaused && slides.length > 1) {
			startTimer();
		}

		return () => clearTimer();
	}, [isPaused, slides.length, startTimer, clearTimer, currentIndex]);

	// Pause/Resume handlers
	const handleMouseEnter = useCallback(() => {
		setIsPaused(true);
		clearTimer();
	}, [clearTimer]);

	const handleMouseLeave = useCallback(() => {
		setIsPaused(false);
	}, []);

	// Touch handlers for swipe
	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		touchStartRef.current = e.touches[0].clientX;
		touchEndRef.current = e.touches[0].clientX;
		isDraggingRef.current = true;
	}, []);

	const handleTouchMove = useCallback((e: React.TouchEvent) => {
		if (!isDraggingRef.current) return;
		touchEndRef.current = e.touches[0].clientX;
	}, []);

	const handleTouchEnd = useCallback(() => {
		if (!isDraggingRef.current) return;
		isDraggingRef.current = false;

		const diff = touchStartRef.current - touchEndRef.current;
		const minSwipeDistance = 50;

		if (Math.abs(diff) > minSwipeDistance) {
			if (diff > 0) {
				// Swiped left - next slide
				goToNextSlide();
			} else {
				// Swiped right - previous slide
				goToPrevSlide();
			}
		}
	}, [goToNextSlide, goToPrevSlide]);

	// Mouse drag handlers for desktop swipe
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		touchStartRef.current = e.clientX;
		touchEndRef.current = e.clientX;
		isDraggingRef.current = true;
	}, []);

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		if (!isDraggingRef.current) return;
		touchEndRef.current = e.clientX;
	}, []);

	const handleMouseUp = useCallback(() => {
		if (!isDraggingRef.current) return;
		isDraggingRef.current = false;

		const diff = touchStartRef.current - touchEndRef.current;
		const minSwipeDistance = 50;

		if (Math.abs(diff) > minSwipeDistance) {
			if (diff > 0) {
				goToNextSlide();
			} else {
				goToPrevSlide();
			}
		}
	}, [goToNextSlide, goToPrevSlide]);

	const currentSlide = slides[currentIndex];

	if (!slides.length) return null;

	return (
		<section
			ref={containerRef}
			className="hero"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			aria-label="Hero banner"
			aria-roledescription="carousel">
			{/* Background Images */}
			<div className="hero__backgrounds" aria-hidden="true">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={cn(
							"hero__background",
							currentIndex === index && "hero__background--active"
						)}>
						{/* Gradient Overlays */}
						<div className="hero__gradient hero__gradient--horizontal" />
						<div className="hero__gradient hero__gradient--vertical" />

						{/* Background Image */}
						<div className="hero__background-image">
							<ImageWithFallback
								src={slide.bgImage}
								alt={`${slide.titleLine1} ${slide.titleLine2}`}
								fill
								priority={index === 0}
								sizes="100vw"
								objectFit="cover"
								fallbackLabel={`Hero ${index + 1}`}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Content Container */}
			<div className="hero__container">
				<div className="hero__content">
					<div className="hero__content-inner">
						{/* Slide Content */}
						{slides.map((slide, index) => (
							<HeroSlide
								key={slide.id}
								slide={slide}
								isActive={currentIndex === index}
							/>
						))}

						{/* Progress Indicators */}
						{slides.length > 1 && (
							<div
								className="hero__progress"
								role="tablist"
								aria-label="Slide controls">
								{slides.map((_, index) => (
									<button
										key={`progress-${index}`}
										className={cn(
											"hero__progress-btn",
											currentIndex === index &&
												"hero__progress-btn--active"
										)}
										onClick={() => goToSlide(index)}
										aria-label={`Go to slide ${index + 1}`}
										aria-selected={currentIndex === index}
										role="tab">
										<span className="hero__progress-btn-hitarea" />
										<span
											key={`bar-${progressKey}-${index}`}
											className="hero__progress-bar"
											style={
												currentIndex === index &&
												!isPaused
													? ({
															"--progress-duration": `${autoPlayInterval}ms`,
													  } as React.CSSProperties)
													: undefined
											}
										/>
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Floating Product Card */}
				{featuredProduct && (
					<HeroFloatingCard
						product={featuredProduct}
						productImage={currentSlide.productImage}
						isVisible={isVisible}
					/>
				)}
			</div>

			{/* Swipe Indicator - Mobile */}
			<div className="hero__swipe-hint">
				<span>Swipe to navigate</span>
			</div>
		</section>
	);
};

export default Hero;
