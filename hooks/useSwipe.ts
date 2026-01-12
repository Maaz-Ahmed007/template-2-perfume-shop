// src/hooks/useSwipe.ts
"use client";

import { useState, useCallback, useRef } from "react";

interface SwipeState {
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	isSwiping: boolean;
}

interface SwipeConfig {
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
	threshold?: number;
}

interface SwipeHandlers {
	onTouchStart: (e: React.TouchEvent) => void;
	onTouchMove: (e: React.TouchEvent) => void;
	onTouchEnd: () => void;
	swipeOffset: number;
	isSwiping: boolean;
}

export function useSwipe({
	onSwipeLeft,
	onSwipeRight,
	onSwipeUp,
	onSwipeDown,
	threshold = 50,
}: SwipeConfig): SwipeHandlers {
	const [swipeOffset, setSwipeOffset] = useState(0);
	const [isSwiping, setIsSwiping] = useState(false);

	const swipeState = useRef<SwipeState>({
		startX: 0,
		startY: 0,
		endX: 0,
		endY: 0,
		isSwiping: false,
	});

	const onTouchStart = useCallback((e: React.TouchEvent) => {
		const touch = e.touches[0];
		swipeState.current = {
			startX: touch.clientX,
			startY: touch.clientY,
			endX: touch.clientX,
			endY: touch.clientY,
			isSwiping: true,
		};
		setIsSwiping(true);
	}, []);

	const onTouchMove = useCallback((e: React.TouchEvent) => {
		if (!swipeState.current.isSwiping) return;

		const touch = e.touches[0];
		swipeState.current.endX = touch.clientX;
		swipeState.current.endY = touch.clientY;

		const diffX = swipeState.current.endX - swipeState.current.startX;
		const diffY = Math.abs(
			swipeState.current.endY - swipeState.current.startY
		);

		// Only track horizontal swipes
		if (Math.abs(diffX) > diffY) {
			setSwipeOffset(diffX * 0.3); // Dampen the movement
		}
	}, []);

	const onTouchEnd = useCallback(() => {
		if (!swipeState.current.isSwiping) return;

		const diffX = swipeState.current.endX - swipeState.current.startX;
		const diffY = swipeState.current.endY - swipeState.current.startY;

		const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);

		if (isHorizontalSwipe && Math.abs(diffX) > threshold) {
			if (diffX > 0) {
				onSwipeRight?.();
			} else {
				onSwipeLeft?.();
			}
		} else if (!isHorizontalSwipe && Math.abs(diffY) > threshold) {
			if (diffY > 0) {
				onSwipeDown?.();
			} else {
				onSwipeUp?.();
			}
		}

		swipeState.current.isSwiping = false;
		setIsSwiping(false);
		setSwipeOffset(0);
	}, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

	return {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		swipeOffset,
		isSwiping,
	};
}
