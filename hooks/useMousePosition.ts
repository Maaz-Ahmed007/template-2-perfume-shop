// src/hooks/useMousePosition.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface MousePosition {
	x: number;
	y: number;
	normalizedX: number;
	normalizedY: number;
}

export function useMousePosition(): MousePosition {
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
		normalizedX: 0,
		normalizedY: 0,
	});

	const ticking = useRef(false);

	const updatePosition = useCallback((clientX: number, clientY: number) => {
		const normalizedX = (clientX / window.innerWidth - 0.5) * 2;
		const normalizedY = (clientY / window.innerHeight - 0.5) * 2;

		setMousePosition({
			x: clientX,
			y: clientY,
			normalizedX,
			normalizedY,
		});
		ticking.current = false;
	}, []);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!ticking.current) {
				requestAnimationFrame(() =>
					updatePosition(e.clientX, e.clientY)
				);
				ticking.current = true;
			}
		},
		[updatePosition]
	);

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove, {
			passive: true,
		});
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [handleMouseMove]);

	return mousePosition;
}
