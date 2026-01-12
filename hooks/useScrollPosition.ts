// src/hooks/useScrollPosition.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollPosition {
	y: number;
	direction: "up" | "down" | null;
	isScrolled: boolean;
}

export function useScrollPosition(threshold: number = 50): ScrollPosition {
	const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
		y: 0,
		direction: null,
		isScrolled: false,
	});

	const lastScrollY = useRef(0);
	const ticking = useRef(false);

	const updateScrollPosition = useCallback(() => {
		const currentY = window.scrollY;

		setScrollPosition({
			y: currentY,
			direction:
				currentY > lastScrollY.current
					? "down"
					: currentY < lastScrollY.current
					? "up"
					: null,
			isScrolled: currentY > threshold,
		});

		lastScrollY.current = currentY;
		ticking.current = false;
	}, [threshold]);

	const handleScroll = useCallback(() => {
		if (!ticking.current) {
			requestAnimationFrame(updateScrollPosition);
			ticking.current = true;
		}
	}, [updateScrollPosition]);

	useEffect(() => {
		updateScrollPosition();

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll, updateScrollPosition]);

	return scrollPosition;
}
