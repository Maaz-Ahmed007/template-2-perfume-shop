// src/lib/constants.ts
export const SITE_CONFIG = {
	name: "LUMIÈRE",
	tagline: "Maison de Parfum",
	description:
		"Discover the art of luxury perfumery. Handcrafted fragrances that tell your unique story.",
	location: "Pakistan",
	currency: "PKR",
} as const;

export const NAV_LINKS = [
	{ id: "home", name: "Home", href: "/" },
	{ id: "collections", name: "Collections", href: "/collections" },
	{ id: "new", name: "New Arrivals", href: "/new-arrivals" },
	{ id: "bestsellers", name: "Bestsellers", href: "/bestsellers" },
	{ id: "about", name: "Our Story", href: "/about" },
	{ id: "contact", name: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = [
	{ id: "instagram", name: "Instagram", href: "https://instagram.com" },
	{ id: "tiktok", name: "TikTok", href: "https://tiktok.com" },
	{ id: "facebook", name: "Facebook", href: "https://facebook.com" },
] as const;

export const HERO_SLIDES = [
	{
		id: 1,
		title: "The Art of",
		highlight: "Elegance",
		subtitle: "Discover your signature scent",
		description:
			"Immerse yourself in a world of exquisite fragrances, where every note tells a story of sophistication and allure.",
		image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2048&auto=format&fit=crop",
		perfumeImage:
			"https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
		cta: "Explore Collection",
		price: 4999,
		accent: "New Arrival",
	},
	{
		id: 2,
		title: "Essence of",
		highlight: "Mystery",
		subtitle: "Unveil the extraordinary",
		description:
			"Each fragrance is a journey through rare ingredients and masterful craftsmanship, designed for the discerning soul.",
		image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2048&auto=format&fit=crop",
		perfumeImage:
			"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
		cta: "Discover More",
		price: 7499,
		accent: "Exclusive",
	},
	{
		id: 3,
		title: "Pure",
		highlight: "Luxury",
		subtitle: "Crafted with passion",
		description:
			"Experience the pinnacle of perfumery with our handcrafted collection, where tradition meets modern elegance.",
		image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2048&auto=format&fit=crop",
		perfumeImage:
			"https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop",
		cta: "Shop Now",
		price: 5999,
		accent: "Premium",
	},
] as const;

export const BRAND_PROMISES = [
	{
		id: 1,
		icon: "sparkles",
		title: "Premium Quality",
		description: "Finest ingredients sourced globally",
	},
	{
		id: 2,
		icon: "leaf",
		title: "Handcrafted",
		description: "Artisan-made with precision",
	},
	{
		id: 3,
		icon: "shield",
		title: "Authentic",
		description: "100% genuine fragrances",
	},
] as const;

export const FEATURED_PRODUCTS = [
	{
		id: "fp-001",
		name: "Midnight Oud",
		tagline: "The Essence of Night",
		price: 8999,
		originalPrice: 10999,
		image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
		category: "Oud Collection",
		badge: "bestseller" as const,
		rating: 4.9,
		notes: {
			top: ["Saffron", "Cardamom"],
			middle: ["Rose", "Oud"],
			base: ["Musk", "Amber"],
		},
		size: "100ml",
		description: "A captivating blend of precious oud and oriental spices.",
	},
	{
		id: "fp-002",
		name: "Rose Elixir",
		tagline: "Timeless Romance",
		price: 6499,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
		category: "Floral Collection",
		badge: "new" as const,
		rating: 4.8,
		notes: {
			top: ["Bergamot", "Pink Pepper"],
			middle: ["Bulgarian Rose", "Peony"],
			base: ["Sandalwood", "White Musk"],
		},
		size: "75ml",
		description: "An elegant bouquet of fresh roses with a modern twist.",
	},
	{
		id: "fp-003",
		name: "Velvet Noir",
		tagline: "Bold & Mysterious",
		price: 7999,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop",
		category: "Evening Collection",
		badge: null,
		rating: 4.7,
		notes: {
			top: ["Black Pepper", "Ginger"],
			middle: ["Leather", "Iris"],
			base: ["Vetiver", "Tonka Bean"],
		},
		size: "100ml",
		description: "A sophisticated scent for the confident individual.",
	},
	{
		id: "fp-004",
		name: "Ocean Breeze",
		tagline: "Fresh & Invigorating",
		price: 5499,
		originalPrice: 6499,
		image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
		category: "Fresh Collection",
		badge: "sale" as const,
		rating: 4.6,
		notes: {
			top: ["Sea Salt", "Citrus"],
			middle: ["Marine Notes", "Jasmine"],
			base: ["Driftwood", "White Tea"],
		},
		size: "100ml",
		description:
			"Crisp aquatic notes that transport you to coastal shores.",
	},
] as const;

// Collections Data
export const COLLECTIONS = [
	{
		id: "col-oud",
		name: "Oud Collection",
		slug: "oud",
		tagline: "The King of Fragrances",
		description:
			"Rich, deep, and luxurious. Our oud collection features the finest Arabian oud blended with precious ingredients.",
		image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop",
		productCount: 12,
		featured: true,
		color: "from-amber-900/80 to-noir-900/90",
		accent: "#D4A574",
	},
	{
		id: "col-floral",
		name: "Floral",
		slug: "floral",
		tagline: "Blooming Elegance",
		description:
			"Timeless floral compositions featuring rose, jasmine, and exotic blooms.",
		image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
		productCount: 8,
		featured: false,
		color: "from-rose-900/80 to-noir-900/90",
		accent: "#E8B4B8",
	},
	{
		id: "col-fresh",
		name: "Fresh",
		slug: "fresh",
		tagline: "Crisp & Vibrant",
		description:
			"Light, airy scents with citrus, aquatic, and green notes for everyday wear.",
		image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
		productCount: 10,
		featured: false,
		color: "from-cyan-900/80 to-noir-900/90",
		accent: "#7DD3C0",
	},
	{
		id: "col-oriental",
		name: "Oriental",
		slug: "oriental",
		tagline: "Exotic Mystique",
		description:
			"Warm, spicy, and sensual fragrances inspired by the East.",
		image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
		productCount: 6,
		featured: false,
		color: "from-purple-900/80 to-noir-900/90",
		accent: "#C4A7E7",
	},
	{
		id: "col-woody",
		name: "Woody",
		slug: "woody",
		tagline: "Nature's Essence",
		description:
			"Earthy, grounding scents featuring sandalwood, cedar, and vetiver.",
		image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
		productCount: 7,
		featured: false,
		color: "from-emerald-900/80 to-noir-900/90",
		accent: "#A3C9A8",
	},
] as const;

// Gallery Products - Premium Collection
export const GALLERY_PRODUCTS = [
	{
		id: "gp-001",
		name: "Royal Oud Supreme",
		price: 12999,
		originalPrice: 15999,
		image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
		category: "Oud",
		isNew: false,
		isBestseller: true,
		rating: 4.9,
		size: "100ml",
	},
	{
		id: "gp-002",
		name: "Noir Intense",
		price: 8999,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
		category: "Oriental",
		isNew: true,
		isBestseller: false,
		rating: 4.8,
		size: "75ml",
	},
	{
		id: "gp-003",
		name: "Rose Damascena",
		price: 9499,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop",
		category: "Floral",
		isNew: false,
		isBestseller: true,
		rating: 4.9,
		size: "100ml",
	},
	{
		id: "gp-004",
		name: "Aqua Vitae",
		price: 6999,
		originalPrice: 8499,
		image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
		category: "Fresh",
		isNew: false,
		isBestseller: false,
		rating: 4.7,
		size: "100ml",
	},
	{
		id: "gp-005",
		name: "Amber Elixir",
		price: 10999,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop",
		category: "Oriental",
		isNew: true,
		isBestseller: false,
		rating: 4.8,
		size: "75ml",
	},
	{
		id: "gp-006",
		name: "Santal Majesty",
		price: 11499,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
		category: "Woody",
		isNew: false,
		isBestseller: true,
		rating: 4.9,
		size: "100ml",
	},
	{
		id: "gp-007",
		name: "Jasmine Nights",
		price: 7999,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
		category: "Floral",
		isNew: true,
		isBestseller: false,
		rating: 4.6,
		size: "75ml",
	},
	{
		id: "gp-008",
		name: "Leather & Smoke",
		price: 13999,
		originalPrice: null,
		image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
		hoverImage:
			"https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600&auto=format&fit=crop",
		category: "Woody",
		isNew: false,
		isBestseller: true,
		rating: 4.9,
		size: "100ml",
	},
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
export type HeroSlide = (typeof HERO_SLIDES)[number];
export type SocialLink = (typeof SOCIAL_LINKS)[number];
export type BrandPromise = (typeof BRAND_PROMISES)[number];
export type FeaturedProduct = (typeof FEATURED_PRODUCTS)[number];
export type Collection = (typeof COLLECTIONS)[number];
export type GalleryProduct = (typeof GALLERY_PRODUCTS)[number];
