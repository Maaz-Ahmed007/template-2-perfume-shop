// src/components/ui/MagneticElement.tsx
"use client";

import {
	useRef,
	useState,
	useCallback,
	type ReactNode,
	type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticElementProps {
	children: ReactNode;
	className?: string;
	strength?: number;
	disabled?: boolean;
}

export default function MagneticElement({
	children,
	className,
	strength = 0.3,
	disabled = false,
}: MagneticElementProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const isMobile = useMediaQuery("(max-width: 1024px)");

	const handleMouseMove = useCallback(
		(e: MouseEvent<HTMLDivElement>) => {
			if (!ref.current || isMobile || disabled) return;

			const rect = ref.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const x = (e.clientX - centerX) * strength;
			const y = (e.clientY - centerY) * strength;

			setPosition({ x, y });
		},
		[strength, isMobile, disabled]
	);

	const handleMouseLeave = useCallback(() => {
		setPosition({ x: 0, y: 0 });
	}, []);

	return (
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={cn("will-change-transform", className)}
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
				transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
			}}
		>
			{children}
		</div>
	);
}
