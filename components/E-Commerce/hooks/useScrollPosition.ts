"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollPosition {
	x: number;
	y: number;
}

interface UseScrollPositionOptions {
	throttleMs?: number;
	threshold?: number;
}

interface UseScrollPositionReturn {
	position: ScrollPosition;
	isScrolled: boolean;
	isScrollingUp: boolean;
	isScrollingDown: boolean;
}

export function useScrollPosition(
	options: UseScrollPositionOptions = {}
): UseScrollPositionReturn {
	const { throttleMs = 100, threshold = 30 } = options;

	const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
	const [isScrollingUp, setIsScrollingUp] = useState(false);
	const [isScrollingDown, setIsScrollingDown] = useState(false);

	const lastYRef = useRef(0);
	const tickingRef = useRef(false);
	const timeoutRef = useRef<number | null>(null);

	const readScroll = useCallback(() => {
		const x = window.scrollX;
		const y = window.scrollY;

		setPosition({ x, y });
		setIsScrollingUp(y < lastYRef.current);
		setIsScrollingDown(y > lastYRef.current);
		lastYRef.current = y;
	}, []);

	const onScroll = useCallback(() => {
		// Throttle without calling setState synchronously in effect
		if (tickingRef.current) return;
		tickingRef.current = true;

		if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

		timeoutRef.current = window.setTimeout(() => {
			window.requestAnimationFrame(() => {
				readScroll();
				tickingRef.current = false;
			});
		}, throttleMs);
	}, [readScroll, throttleMs]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		window.addEventListener("scroll", onScroll, { passive: true });

		// Initial sync (NOT synchronous)
		const raf = window.requestAnimationFrame(() => {
			lastYRef.current = window.scrollY;
			readScroll();
		});

		return () => {
			window.cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		};
	}, [onScroll, readScroll]);

	return {
		position,
		isScrolled: position.y > threshold,
		isScrollingUp,
		isScrollingDown,
	};
}

export default useScrollPosition;
