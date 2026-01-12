// src/hooks/useInView.ts
"use client";

import { useState, useEffect, useRef, type RefObject } from "react";

interface UseInViewOptions {
	threshold?: number;
	rootMargin?: string;
	triggerOnce?: boolean;
}

interface UseInViewReturn {
	ref: RefObject<HTMLElement | null>;
	isInView: boolean;
	hasBeenInView: boolean;
}

export function useInView({
	threshold = 0.1,
	rootMargin = "0px",
	triggerOnce = true,
}: UseInViewOptions = {}): UseInViewReturn {
	const ref = useRef<HTMLElement | null>(null);
	const [isInView, setIsInView] = useState(false);
	const [hasBeenInView, setHasBeenInView] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const inView = entry.isIntersecting;
				setIsInView(inView);

				if (inView && !hasBeenInView) {
					setHasBeenInView(true);
				}

				if (inView && triggerOnce) {
					observer.unobserve(element);
				}
			},
			{ threshold, rootMargin }
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [threshold, rootMargin, triggerOnce, hasBeenInView]);

	return { ref, isInView, hasBeenInView };
}
