// ============================================
// MENCLOTH - CONSTANTS
// Static configuration and constants
// ============================================

import type { Breakpoints } from "./types";

// ==================== BREAKPOINTS ====================

export const BREAKPOINTS: Breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

// ==================== TIMING ====================

export const ANIMATION_DURATION = {
	fast: 150,
	normal: 300,
	slow: 500,
	slower: 700,
} as const;

export const AUTO_SLIDE_INTERVAL = 6000; // 6 seconds

// ==================== IMAGE SIZES ====================

export const IMAGE_SIZES = {
	hero: {
		width: 1920,
		height: 1080,
		aspectRatio: "16/9",
	},
	heroProduct: {
		width: 400,
		height: 500,
		aspectRatio: "4/5",
	},
	menuFeatured: {
		width: 400,
		height: 530,
		aspectRatio: "3/4",
	},
	menuThumbnail: {
		width: 120,
		height: 120,
		aspectRatio: "1/1",
	},
	productCard: {
		width: 600,
		height: 800,
		aspectRatio: "3/4",
	},
	saleBanner: {
		width: 600,
		height: 400,
		aspectRatio: "3/2",
	},
} as const;

// ==================== PRODUCT CARD WIDTHS ====================

export const PRODUCT_CARD_WIDTH = {
	sm: 280,
	md: 320,
	lg: 360,
} as const;

// ==================== WHATSAPP ====================

export const WHATSAPP_CONFIG = {
	phoneNumber: "923001234567",
	defaultMessage: "Hello MenCloth! I have a question.",
} as const;

export const getWhatsAppUrl = (message?: string): string => {
	const encodedMessage = encodeURIComponent(
		message || WHATSAPP_CONFIG.defaultMessage
	);
	return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
};

// ==================== CONTACT INFO ====================

export const CONTACT_INFO = {
	phone: "+92 300 1234567",
	email: "info@mencloth.pk",
	address: "Lahore, Pakistan",
} as const;

// ==================== SOCIAL LINKS ====================

export const SOCIAL_LINKS = {
	facebook: "https://facebook.com/mencloth",
	instagram: "https://instagram.com/mencloth",
	twitter: "https://twitter.com/mencloth",
	whatsapp: getWhatsAppUrl(),
} as const;

// ==================== SEO ====================

export const SEO_DEFAULTS = {
	siteName: "MenCloth",
	title: "MenCloth - Premium Men's Clothing & Fabrics",
	description:
		"Discover premium men's clothing, fabrics, and traditional wear. Shop shalwar kameez, kurtas, suits, and unstitched fabric from Pakistan's finest collection.",
	keywords: [
		"men clothing pakistan",
		"shalwar kameez",
		"kurta",
		"unstitched fabric",
		"lawn suits",
		"cotton fabric",
		"men fashion",
		"pakistani clothing",
	],
} as const;

// ==================== CURRENCY ====================

export const CURRENCY = {
	code: "PKR",
	symbol: "PKR",
	name: "Pakistani Rupee",
	locale: "en-PK",
} as const;

export const formatPrice = (amount: number): string => {
	return `${CURRENCY.symbol} ${amount.toLocaleString(CURRENCY.locale)}`;
};

// ==================== FREE SHIPPING ====================

export const FREE_SHIPPING_THRESHOLD = 5000; // PKR

// ==================== Z-INDEX LAYERS ====================

export const Z_INDEX = {
	dropdown: 40,
	sticky: 50,
	overlay: 60,
	modal: 70,
	floating: 80,
	tooltip: 90,
	max: 100,
} as const;