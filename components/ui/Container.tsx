// src/components/ui/Container.tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;
	className?: string;
	as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav";
}

export default function Container({
	children,
	className,
	as: Component = "div",
}: ContainerProps) {
	return (
		<Component className={cn("container-luxury", className)}>
			{children}
		</Component>
	);
}
