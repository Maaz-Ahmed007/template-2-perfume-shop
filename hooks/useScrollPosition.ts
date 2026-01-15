"use client";

import { useSyncExternalStore, useCallback, useRef } from "react";

interface ScrollPosition {
	y: number;
	direction: "up" | "down" | null;
	isScrolled: boolean;
}

export function useScrollPosition(threshold: number = 50): ScrollPosition {
	const lastScrollY = useRef(0);

	const subscribe = useCallback((callback: () => void) => {
		window.addEventListener("scroll", callback, { passive: true });
		return () => window.removeEventListener("scroll", callback);
	}, []);

	const getSnapshot = useCallback((): ScrollPosition => {
		const currentY = window.scrollY;
		const direction: "up" | "down" | null =
			currentY > lastScrollY.current
				? "down"
				: currentY < lastScrollY.current
				? "up"
				: null;
		lastScrollY.current = currentY;

		return {
			y: currentY,
			direction,
			isScrolled: currentY > threshold,
		};
	}, [threshold]);

	const getServerSnapshot = useCallback((): ScrollPosition => {
		return {
			y: 0,
			direction: null,
			isScrolled: false,
		};
	}, []);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
