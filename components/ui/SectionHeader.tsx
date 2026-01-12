// src/components/ui/SectionHeader.tsx
"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

interface SectionHeaderProps {
	eyebrow?: string;
	title: string;
	highlight?: string;
	description?: string;
	align?: "left" | "center" | "right";
	className?: string;
}

export default function SectionHeader({
	eyebrow,
	title,
	highlight,
	description,
	align = "center",
	className,
}: SectionHeaderProps) {
	const { ref, isInView } = useInView({ threshold: 0.2 });

	const alignClasses = {
		left: "text-left",
		center: "text-center mx-auto",
		right: "text-right ml-auto",
	};

	return (
		<div
			ref={ref as React.RefObject<HTMLDivElement>}
			className={cn("max-w-xl", alignClasses[align], className)}
		>
			{/* Eyebrow */}
			{eyebrow && (
				<div
					className={cn(
						"flex items-center gap-3 mb-3",
						align === "center" && "justify-center",
						align === "right" && "justify-end",
						"opacity-0",
						isInView && "animate-[fade-up_0.5s_ease-out_forwards]"
					)}
				>
					<span className="w-8 h-px bg-gradient-to-r from-transparent to-gold-500" />
					<span className="text-[10px] font-semibold text-gold-600 uppercase tracking-[0.2em]">
						{eyebrow}
					</span>
					<span className="w-8 h-px bg-gradient-to-l from-transparent to-gold-500" />
				</div>
			)}

			{/* Title */}
			<h2
				className={cn(
					"font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-noir-900 mb-3",
					"opacity-0",
					isInView && "animate-[fade-up_0.5s_ease-out_0.1s_forwards]"
				)}
			>
				{title}{" "}
				{highlight && (
					<span className="text-gradient-gold">{highlight}</span>
				)}
			</h2>

			{/* Description */}
			{description && (
				<p
					className={cn(
						"text-sm text-noir-500 leading-relaxed",
						"opacity-0",
						isInView &&
							"animate-[fade-up_0.5s_ease-out_0.2s_forwards]"
					)}
				>
					{description}
				</p>
			)}
		</div>
	);
}
