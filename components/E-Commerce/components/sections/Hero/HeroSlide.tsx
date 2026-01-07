// ============================================
// COMPONENT: HeroSlide
// Individual hero slide content
// ============================================

"use client";

import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import type { HeroSlide as HeroSlideType } from "../../../lib/types";
import { Button } from "../../ui";
import "./Hero.css";

// ==================== TYPES ====================

export interface HeroSlideProps {
	slide: HeroSlideType;
	isActive: boolean;
}

// ==================== COMPONENT ====================

export const HeroSlide: React.FC<HeroSlideProps> = ({ slide, isActive }) => {
	return (
		<div className={cn("hero-slide", isActive && "hero-slide--active")}>
			{/* Tagline */}
			<div className="hero-slide__tagline-wrapper">
				<p
					key={`tagline-${slide.id}`}
					className={cn(
						"hero-slide__tagline",
						isActive && "hero-slide__tagline--animate"
					)}>
					{slide.tagline}
				</p>
			</div>

			{/* Title */}
			<div className="hero-slide__title-wrapper">
				<h1 className="hero-slide__title">
					<span
						key={`line1-${slide.id}`}
						className={cn(
							"hero-slide__title-line",
							"hero-slide__title-line--1",
							isActive && "hero-slide__title-line--animate"
						)}>
						{slide.titleLine1}
					</span>
					<span
						key={`line2-${slide.id}`}
						className={cn(
							"hero-slide__title-line",
							"hero-slide__title-line--2",
							isActive && "hero-slide__title-line--animate"
						)}>
						{slide.titleLine2}
					</span>
				</h1>
			</div>

			{/* Description */}
			<div className="hero-slide__description-wrapper">
				<p
					key={`desc-${slide.id}`}
					className={cn(
						"hero-slide__description",
						isActive && "hero-slide__description--animate"
					)}>
					{slide.description}
				</p>
			</div>

			{/* CTA Buttons */}
			<div
				key={`cta-${slide.id}`}
				className={cn(
					"hero-slide__cta",
					isActive && "hero-slide__cta--animate"
				)}>
				<Button
					href={slide.primaryCtaHref}
					variant="primary"
					size="lg"
					rightIcon={<RiArrowRightLine />}>
					{slide.primaryCta}
				</Button>

				<Button
					href={slide.secondaryCtaHref}
					variant="outline"
					size="lg">
					{slide.secondaryCta}
				</Button>
			</div>
		</div>
	);
};

export default HeroSlide;