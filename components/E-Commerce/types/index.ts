// ============================================
// NAVIGATION TYPES
// ============================================

export interface CategoryItem {
	name: string;
	href: string;
	isNew?: boolean;
	isHot?: boolean;
}

export interface FeaturedProduct {
	id: number;
	name: string;
	price: string;
	originalPrice?: string;
	image: string;
	href: string;
}

export interface PopularProduct {
	id: number;
	name: string;
	price: string;
	rating: number;
	reviews: number;
	image: string;
	href: string;
}

export interface SaleBanner {
	title: string;
	discount: string;
	description: string;
	href: string;
	bgColor: string;
	bgImage?: string;
}

export interface NavigationItem {
	id: string;
	label: string;
	categories: CategoryItem[];
	featuredProducts?: FeaturedProduct[];
	popularProducts?: PopularProduct[];
	saleBanner?: SaleBanner;
}

// ============================================
// HERO TYPES
// ============================================

export interface HeroSlide {
	id: number;
	tagline: string;
	titleLine1: string;
	titleLine2: string;
	description: string;
	primaryCta: string;
	secondaryCta: string;
	bgImage: string;
	productImage?: string;
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
	id: number;
	name: string;
	category: string;
	price: string;
	originalPrice?: string;
	rating: number;
	reviews: number;
	isNew?: boolean;
	isSale?: boolean;
	colors: string[];
	image: string;
	hoverImage?: string;
}

// ============================================
// UI COMPONENT TYPES
// ============================================

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	loading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	children: React.ReactNode;
}

export type BadgeVariant = "new" | "sale" | "hot" | "default";

export interface BadgeProps {
	variant?: BadgeVariant;
	children: React.ReactNode;
	pulse?: boolean;
	className?: string;
}

export interface RatingProps {
	value: number;
	maxValue?: number;
	size?: "sm" | "md" | "lg";
	showValue?: boolean;
	reviewCount?: number;
}

export interface ImageWithFallbackProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	sizes?: string;
	priority?: boolean;
	className?: string;
	fallbackLabel?: string;
}
