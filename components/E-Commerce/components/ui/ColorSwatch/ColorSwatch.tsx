// ============================================
// COMPONENT: ColorSwatch
// Color selection swatches for products
// ============================================

"use client";

import React from "react";
import { RiCheckLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import type { ProductColor } from "../../../lib/types";
import "./ColorSwatch.css";

// ==================== TYPES ====================

export type SwatchSize = "sm" | "md" | "lg";

export interface ColorSwatchProps {
	colors: ProductColor[];
	selectedColor?: string;
	onSelectColor?: (colorHex: string) => void;
	size?: SwatchSize;
	maxDisplay?: number;
	showTooltip?: boolean;
	className?: string;
}

export interface SingleSwatchProps {
	color: ProductColor;
	isSelected?: boolean;
	onClick?: () => void;
	size?: SwatchSize;
	showTooltip?: boolean;
}

// ==================== SINGLE SWATCH COMPONENT ====================

export const SingleSwatch: React.FC<SingleSwatchProps> = ({
	color,
	isSelected = false,
	onClick,
	size = "md",
	showTooltip = false,
}) => {
	// Determine if color is light (for check icon color)
	const isLightColor = (hex: string): boolean => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		return luminance > 0.5;
	};

	const isLight = isLightColor(color.hex);

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"color-swatch",
				`color-swatch--${size}`,
				isSelected && "color-swatch--selected",
				isLight && "color-swatch--light"
			)}
			style={{ backgroundColor: color.hex }}
			title={showTooltip ? color.name : undefined}
			aria-label={`Select ${color.name} color`}
			aria-pressed={isSelected}>
			{isSelected && <RiCheckLine className="color-swatch__check" />}
			{showTooltip && (
				<span className="color-swatch__tooltip">{color.name}</span>
			)}
		</button>
	);
};

// ==================== MAIN COMPONENT ====================

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
	colors,
	selectedColor,
	onSelectColor,
	size = "md",
	maxDisplay = 5,
	showTooltip = false,
	className,
}) => {
	const displayColors = colors.slice(0, maxDisplay);
	const remainingCount = colors.length - maxDisplay;

	return (
		<div className={cn("color-swatch-group", className)}>
			{displayColors.map((color) => (
				<SingleSwatch
					key={color.hex}
					color={color}
					isSelected={selectedColor === color.hex}
					onClick={() => onSelectColor?.(color.hex)}
					size={size}
					showTooltip={showTooltip}
				/>
			))}

			{remainingCount > 0 && (
				<span
					className={cn(
						"color-swatch-more",
						`color-swatch-more--${size}`
					)}>
					+{remainingCount}
				</span>
			)}
		</div>
	);
};

export default ColorSwatch;
