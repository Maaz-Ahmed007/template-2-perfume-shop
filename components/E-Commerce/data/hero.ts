// ============================================
// DATA: Hero
// Hero section slides data
// ============================================

import type { HeroSlide } from "../lib/types";

export const heroSlides: HeroSlide[] = [
	{
		id: 1,
		tagline: "New Collection 2025",
		titleLine1: "Crafted for the",
		titleLine2: "Modern Gentleman",
		description:
			"Discover our exclusive collection of premium fabrics and ready-to-wear clothing designed for elegance, comfort, and the distinguished Pakistani man.",
		primaryCta: "Explore Collection",
		primaryCtaHref: "/collections/new-arrivals",
		secondaryCta: "View Lookbook",
		secondaryCtaHref: "/lookbook",
		bgImage: "/pictures/hero/1.webp",
		productImage: "/pictures/hero/1.1.webp",
	},
	{
		id: 2,
		tagline: "Summer Essentials",
		titleLine1: "Light & Breathable",
		titleLine2: "Summer Collection",
		description:
			"Premium lawn and cotton fabrics perfect for the Pakistani summer. Experience unmatched comfort without compromising on your signature style.",
		primaryCta: "Shop Summer",
		primaryCtaHref: "/collections/summer",
		secondaryCta: "See All Fabrics",
		secondaryCtaHref: "/fabrics",
		bgImage: "/pictures/hero/2.webp",
		productImage: "/pictures/hero/2.2.webp",
	},
	{
		id: 3,
		tagline: "Premium Quality",
		titleLine1: "Finest Unstitched",
		titleLine2: "Fabric Collection",
		description:
			"Handpicked fabrics for those who prefer custom tailoring. From everyday wear to special occasions, quality that speaks for itself.",
		primaryCta: "Browse Fabrics",
		primaryCtaHref: "/collections/unstitched",
		secondaryCta: "Find Tailors",
		secondaryCtaHref: "/tailors",
		bgImage: "/pictures/hero/3.webp",
		productImage: "/pictures/hero/3.3.webp",
	},
];

// Featured product for hero floating card
export const heroFeaturedProduct = {
	id: 1,
	name: "Premium Lawn 3-Piece Suit",
	price: "PKR 4,500",
	originalPrice: "PKR 5,999",
	rating: 4.9,
	reviews: 247,
	badge: "Best Seller",
	href: "/product/premium-lawn-3-piece-suit",
};

export default heroSlides;
