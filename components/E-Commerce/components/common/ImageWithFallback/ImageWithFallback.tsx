// ============================================
// COMPONENT: ImageWithFallback
// Next.js Image with error handling and placeholder
// ============================================

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RiImageLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import "./ImageWithFallback.css";

// ==================== TYPES ====================

export interface ImageWithFallbackProps {
	src: string;
	alt: string;
	fill?: boolean;
	width?: number;
	height?: number;
	sizes?: string;
	priority?: boolean;
	quality?: number;
	className?: string;
	containerClassName?: string;
	fallbackClassName?: string;
	fallbackLabel?: string;
	showDimensions?: boolean;
	objectFit?: "cover" | "contain" | "fill" | "none";
	onLoad?: () => void;
	onError?: () => void;
}

// ==================== COMPONENT ====================

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
	src,
	alt,
	fill = false,
	width,
	height,
	sizes,
	priority = false,
	quality = 85,
	className,
	containerClassName,
	fallbackClassName,
	fallbackLabel = "Image",
	showDimensions = false,
	objectFit = "cover",
	onLoad,
	onError,
}) => {
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleError = () => {
		setHasError(true);
		setIsLoading(false);
		onError?.();
	};

	const handleLoad = () => {
		setIsLoading(false);
		onLoad?.();
	};

	// Show fallback if error occurred
	if (hasError) {
		return (
			<div className={cn("image-fallback", fallbackClassName)}>
				<RiImageLine className="image-fallback__icon" />
				<span className="image-fallback__label">{fallbackLabel}</span>
				{showDimensions && width && height && (
					<span className="image-fallback__dimensions">
						{width} × {height}
					</span>
				)}
			</div>
		);
	}

	// Image with loading state
	return (
		<div className={cn("image-wrapper", containerClassName)}>
			{/* Loading skeleton */}
			{isLoading && <div className="image-skeleton animate-shimmer" />}

			{/* Actual image */}
			{fill ? (
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					priority={priority}
					quality={quality}
					className={cn(
						"image",
						`image--${objectFit}`,
						isLoading && "image--loading",
						className
					)}
					onLoad={handleLoad}
					onError={handleError}
				/>
			) : (
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					sizes={sizes}
					priority={priority}
					quality={quality}
					className={cn(
						"image",
						`image--${objectFit}`,
						isLoading && "image--loading",
						className
					)}
					onLoad={handleLoad}
					onError={handleError}
				/>
			)}
		</div>
	);
};

export default ImageWithFallback;
