"use client";

import { useSyncExternalStore, useCallback, useRef, cache } from "react";

interface ScrollPosition {
	y: number;
	direction: "up" | "down" | null;
	isScrolled: boolean;
}

const SERVER_SNAPSHOT: ScrollPosition = {
	y: 0,
	direction: null,
	isScrolled: false,
};

export function useScrollPosition(threshold: number = 50): ScrollPosition {
	const lastScrollY = useRef(0);
	const cachedSnapshot = useRef<ScrollPosition>(SERVER_SNAPSHOT);

	const subscribe = useCallback((callback: () => void) => {
		window.addEventListener("scroll", callback, { passive: true });
		return () => window.removeEventListener("scroll", callback);
	}, []);

	const getSnapshot = useCallback((): ScrollPosition => {
		const currentY = window.scrollY;
		const prevSnapshot = cachedSnapshot.current;

		const direction: "up" | "down" | null =
			currentY > lastScrollY.current
				? "down"
				: currentY < lastScrollY.current
				? "up"
				: null;
		lastScrollY.current = currentY;

		const isScrolled = currentY > threshold;

		if (
			prevSnapshot.y === currentY &&
			prevSnapshot.direction === direction &&
			prevSnapshot.isScrolled === isScrolled
		) {
			return prevSnapshot;
		}

		lastScrollY.current = currentY;

		const newSnapshot: ScrollPosition = {
			y: currentY,
			direction,
			isScrolled,
		};

		cachedSnapshot.current = newSnapshot;
		return newSnapshot;
	}, [threshold]);

	const getServerSnapshot = useCallback((): ScrollPosition => {
		return SERVER_SNAPSHOT;
	}, []);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
