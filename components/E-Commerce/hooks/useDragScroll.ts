// ============================================
// HOOK: useDragScroll
// Enables drag-to-scroll on touch and mouse
// ============================================

"use client";

import {
	useRef,
	useState,
	useCallback,
	useEffect,
	type RefObject,
} from "react";

interface UseDragScrollOptions {
	speed?: number;
	direction?: "horizontal" | "vertical" | "both";
}

interface UseDragScrollReturn<T extends HTMLElement> {
	ref: RefObject<T | null>; // ← Fixed: Allow null in RefObject
	isDragging: boolean;
	handlers: {
		onMouseDown: (e: React.MouseEvent) => void;
		onMouseMove: (e: React.MouseEvent) => void;
		onMouseUp: () => void;
		onMouseLeave: () => void;
		onTouchStart: (e: React.TouchEvent) => void;
		onTouchMove: (e: React.TouchEvent) => void;
		onTouchEnd: () => void;
	};
}

export function useDragScroll<T extends HTMLElement = HTMLDivElement>(
	options: UseDragScrollOptions = {}
): UseDragScrollReturn<T> {
	const { speed = 1.5, direction = "horizontal" } = options;

	const ref = useRef<T | null>(null); // ← Fixed: Explicitly type as T | null
	const [isDragging, setIsDragging] = useState(false);
	const startPosRef = useRef({ x: 0, y: 0 });
	const scrollPosRef = useRef({ left: 0, top: 0 });

	// Mouse handlers
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		const element = ref.current;
		if (!element) return;

		setIsDragging(true);
		startPosRef.current = {
			x: e.pageX - element.offsetLeft,
			y: e.pageY - element.offsetTop,
		};
		scrollPosRef.current = {
			left: element.scrollLeft,
			top: element.scrollTop,
		};
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			const element = ref.current;
			if (!isDragging || !element) return;
			e.preventDefault();

			const x = e.pageX - element.offsetLeft;
			const y = e.pageY - element.offsetTop;

			if (direction === "horizontal" || direction === "both") {
				const walkX = (x - startPosRef.current.x) * speed;
				element.scrollLeft = scrollPosRef.current.left - walkX;
			}

			if (direction === "vertical" || direction === "both") {
				const walkY = (y - startPosRef.current.y) * speed;
				element.scrollTop = scrollPosRef.current.top - walkY;
			}
		},
		[isDragging, speed, direction]
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Touch handlers
	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		const element = ref.current;
		if (!element) return;

		setIsDragging(true);
		startPosRef.current = {
			x: e.touches[0].pageX - element.offsetLeft,
			y: e.touches[0].pageY - element.offsetTop,
		};
		scrollPosRef.current = {
			left: element.scrollLeft,
			top: element.scrollTop,
		};
	}, []);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			const element = ref.current;
			if (!isDragging || !element) return;

			const x = e.touches[0].pageX - element.offsetLeft;
			const y = e.touches[0].pageY - element.offsetTop;

			if (direction === "horizontal" || direction === "both") {
				const walkX = (x - startPosRef.current.x) * speed;
				element.scrollLeft = scrollPosRef.current.left - walkX;
			}

			if (direction === "vertical" || direction === "both") {
				const walkY = (y - startPosRef.current.y) * speed;
				element.scrollTop = scrollPosRef.current.top - walkY;
			}
		},
		[isDragging, speed, direction]
	);

	const handleTouchEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Prevent text selection while dragging
	useEffect(() => {
		if (isDragging) {
			document.body.style.userSelect = "none";
			document.body.style.cursor = "grabbing";
		} else {
			document.body.style.userSelect = "";
			document.body.style.cursor = "";
		}

		return () => {
			document.body.style.userSelect = "";
			document.body.style.cursor = "";
		};
	}, [isDragging]);

	return {
		ref,
		isDragging,
		handlers: {
			onMouseDown: handleMouseDown,
			onMouseMove: handleMouseMove,
			onMouseUp: handleMouseUp,
			onMouseLeave: handleMouseUp,
			onTouchStart: handleTouchStart,
			onTouchMove: handleTouchMove,
			onTouchEnd: handleTouchEnd,
		},
	};
}

export default useDragScroll;
