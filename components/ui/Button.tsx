// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export default function Button({
	children,
	variant = "primary",
	size = "md",
	isLoading = false,
	leftIcon,
	rightIcon,
	className,
	disabled,
	...props
}: ButtonProps) {
	const sizeClasses = {
		sm: "btn-sm",
		md: "btn-md",
		lg: "btn-lg",
	};

	return (
		<button
			className={cn(
				"btn",
				`btn-${variant}`,
				sizeClasses[size],
				isLoading && "opacity-60 cursor-wait",
				disabled && "opacity-40 cursor-not-allowed pointer-events-none",
				className
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<svg
					className="animate-spin h-3.5 w-3.5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			) : (
				<>
					{leftIcon && (
						<span className="flex-shrink-0 -ml-0.5">
							{leftIcon}
						</span>
					)}
					<span>{children}</span>
					{rightIcon && (
						<span className="flex-shrink-0 -mr-0.5">
							{rightIcon}
						</span>
					)}
				</>
			)}
		</button>
	);
}
