// ============================================
// COMPONENT: Rating
// Star rating display component
// ============================================

"use client";

import React from "react";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import "./Rating.css";

// ==================== TYPES ====================

export type RatingSize = "sm" | "md" | "lg";

export interface RatingProps {
	value: number;
	max?: number;
	reviews?: number;
	showValue?: boolean;
	showCount?: boolean;
	size?: RatingSize;
	className?: string;
}

// ==================== COMPONENT ====================

export const Rating: React.FC<RatingProps> = ({
	value,
	max = 5,
	reviews,
	showValue = false,
	showCount = true,
	size = "md",
	className,
}) => {
	// Generate stars array
	const stars = Array.from({ length: max }, (_, index) => {
		const starValue = index + 1;

		if (value >= starValue) {
			return "full";
		} else if (value >= starValue - 0.5) {
			return "half";
		} else {
			return "empty";
		}
	});

	return (
		<div className={cn("rating", `rating--${size}`, className)}>
			<div className="rating__stars">
				{stars.map((type, index) => (
					<span key={index} className="rating__star">
						{type === "full" && (
							<RiStarFill className="rating__star-icon rating__star-icon--filled" />
						)}
						{type === "half" && (
							<RiStarHalfFill className="rating__star-icon rating__star-icon--filled" />
						)}
						{type === "empty" && (
							<RiStarLine className="rating__star-icon rating__star-icon--empty" />
						)}
					</span>
				))}
			</div>

			{showValue && (
				<span className="rating__value">{value.toFixed(1)}</span>
			)}

			{showCount && reviews !== undefined && (
				<span className="rating__count">
					({reviews.toLocaleString()})
				</span>
			)}
		</div>
	);
};

export default Rating;