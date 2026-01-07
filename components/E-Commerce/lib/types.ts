// ============================================
// MENCLOTH - TYPE DEFINITIONS
// All TypeScript interfaces and types
// ============================================

// ==================== NAVIGATION TYPES ====================

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

// ==================== HERO TYPES ====================

export interface HeroSlide {
	id: number;
	tagline: string;
	titleLine1: string;
	titleLine2: string;
	description: string;
	primaryCta: string;
	primaryCtaHref: string;
	secondaryCta: string;
	secondaryCtaHref: string;
	bgImage: string;
	productImage?: string;
}

export interface HeroFeaturedProduct {
	id: number;
	name: string;
	price: string;
	originalPrice?: string;
	rating: number;
	reviews: number;
	badge?: string;
	href: string;
}

// ==================== PRODUCT TYPES ====================

export interface ProductColor {
	name: string;
	hex: string;
}

export interface Product {
	id: number;
	name: string;
	slug: string;
	category: string;
	price: string;
	priceNumeric: number;
	originalPrice?: string;
	originalPriceNumeric?: number;
	rating: number;
	reviews: number;
	isNew?: boolean;
	isSale?: boolean;
	isFeatured?: boolean;
	colors: ProductColor[];
	image: string;
	hoverImage?: string;
	images?: string[];
	description?: string;
	inStock?: boolean;
}

// ==================== UI COMPONENT TYPES ====================

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	isLoading?: boolean;
	disabled?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	children: React.ReactNode;
	onClick?: () => void;
	href?: string;
	type?: "button" | "submit" | "reset";
	className?: string;
}

export type BadgeVariant =
	| "default"
	| "new"
	| "sale"
	| "hot"
	| "soldOut"
	| "limited";

export interface BadgeProps {
	variant?: BadgeVariant;
	children: React.ReactNode;
	className?: string;
	animate?: boolean;
}

export interface RatingProps {
	value: number;
	max?: number;
	reviews?: number;
	showCount?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}

export interface ImageWithFallbackProps {
	src: string;
	alt: string;
	fill?: boolean;
	width?: number;
	height?: number;
	sizes?: string;
	priority?: boolean;
	className?: string;
	fallbackLabel?: string;
	onLoad?: () => void;
}

export interface ProductCardProps {
	product: Product;
	onAddToCart?: (productId: number) => void;
	onToggleWishlist?: (productId: number) => void;
	isInWishlist?: boolean;
	showQuickView?: boolean;
	className?: string;
}

// ==================== LAYOUT TYPES ====================

export interface NavbarProps {
	items: NavigationItem[];
	isScrolled?: boolean;
	wishlistCount?: number;
	cartCount?: number;
}

export interface MegaMenuProps {
	item: NavigationItem;
	isActive: boolean;
}

export interface MobileMenuProps {
	items: NavigationItem[];
	isOpen: boolean;
	onClose: () => void;
}

export interface HeroProps {
	slides: HeroSlide[];
	featuredProduct?: HeroFeaturedProduct;
	autoPlayInterval?: number;
}

export interface TopProductsProps {
	products: Product[];
	title?: string;
	subtitle?: string;
	description?: string;
}

// ==================== UTILITY TYPES ====================

export interface AnimationDelayProps {
	index: number;
	baseDelay?: number;
	increment?: number;
}

export type BreakpointKey = "sm" | "md" | "lg" | "xl" | "2xl";

export interface Breakpoints {
	sm: number;
	md: number;
	lg: number;
	xl: number;
	"2xl": number;
}

// ==================== STATE TYPES ====================

export interface CartItem {
	productId: number;
	quantity: number;
	color?: string;
	size?: string;
}

export interface WishlistState {
	items: number[];
}

export interface UIState {
	isMobileMenuOpen: boolean;
	isSearchOpen: boolean;
	activeMenuId: string | null;
}