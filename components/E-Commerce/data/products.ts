// ============================================
// DATA: Products
// Product listings data
// ============================================

import type { Product } from "../lib/types";

export const topProducts: Product[] = [
	{
		id: 1,
		name: "Premium Lawn 3-Piece Suit",
		slug: "premium-lawn-3-piece-suit",
		category: "Ready to Wear",
		price: "PKR 4,500",
		priceNumeric: 4500,
		originalPrice: "PKR 5,999",
		originalPriceNumeric: 5999,
		rating: 4.9,
		reviews: 247,
		isSale: true,
		isFeatured: true,
		colors: [
			{ name: "Black", hex: "#1a1a1a" },
			{ name: "Navy Blue", hex: "#3d5a80" },
			{ name: "Light Gray", hex: "#e0e0e0" },
		],
		image: "/pictures/products/1.webp",
		hoverImage: "/pictures/products/1.1.webp",
		description: "Premium quality lawn fabric with elegant design.",
		inStock: true,
	},
	{
		id: 2,
		name: "Embroidered Cotton Kurta",
		slug: "embroidered-cotton-kurta",
		category: "Kurtas",
		price: "PKR 3,200",
		priceNumeric: 3200,
		rating: 4.8,
		reviews: 182,
		isNew: true,
		colors: [
			{ name: "White", hex: "#ffffff" },
			{ name: "Cream", hex: "#f5f5dc" },
			{ name: "Beige", hex: "#d4a574" },
		],
		image: "/pictures/products/2.webp",
		hoverImage: "/pictures/products/2.2.webp",
		description: "Beautiful embroidered kurta for special occasions.",
		inStock: true,
	},
	{
		id: 3,
		name: "Classic Shalwar Kameez",
		slug: "classic-shalwar-kameez",
		category: "Ready to Wear",
		price: "PKR 5,800",
		priceNumeric: 5800,
		rating: 4.7,
		reviews: 324,
		isFeatured: true,
		colors: [
			{ name: "Dark Slate", hex: "#2c3e50" },
			{ name: "Brown", hex: "#8b4513" },
			{ name: "Black", hex: "#000000" },
		],
		image: "/pictures/products/3.webp",
		hoverImage: "/pictures/products/3.3.webp",
		description: "Timeless classic shalwar kameez for everyday elegance.",
		inStock: true,
	},
	{
		id: 4,
		name: "Premium Wool Shawl",
		slug: "premium-wool-shawl",
		category: "Accessories",
		price: "PKR 8,500",
		priceNumeric: 8500,
		rating: 4.9,
		reviews: 156,
		isNew: true,
		colors: [
			{ name: "Charcoal", hex: "#1a1a1a" },
			{ name: "Maroon", hex: "#8b0000" },
			{ name: "Dark Teal", hex: "#2f4f4f" },
		],
		image: "/pictures/products/4.webp",
		hoverImage: "/pictures/products/4.4.webp",
		description: "Luxurious wool shawl for winter warmth.",
		inStock: true,
	},
	{
		id: 5,
		name: "Designer Waistcoat Set",
		slug: "designer-waistcoat-set",
		category: "Formal Wear",
		price: "PKR 7,200",
		priceNumeric: 7200,
		originalPrice: "PKR 8,999",
		originalPriceNumeric: 8999,
		rating: 4.8,
		reviews: 98,
		isSale: true,
		colors: [
			{ name: "Black", hex: "#000000" },
			{ name: "Dark Gray", hex: "#1c1c1c" },
			{ name: "Charcoal", hex: "#333333" },
		],
		image: "/pictures/products/5.webp",
		hoverImage: "/pictures/products/5.5.webp",
		description: "Elegant waistcoat set for formal occasions.",
		inStock: true,
	},
	{
		id: 6,
		name: "Linen Summer Suit",
		slug: "linen-summer-suit",
		category: "Unstitched",
		price: "PKR 4,200",
		priceNumeric: 4200,
		rating: 4.6,
		reviews: 211,
		colors: [
			{ name: "Off White", hex: "#f5f5f5" },
			{ name: "Sand", hex: "#e8e4c9" },
			{ name: "Taupe", hex: "#c4b7a6" },
		],
		image: "/pictures/products/6.webp",
		hoverImage: "/pictures/products/6.6.webp",
		description: "Lightweight linen suit perfect for summer.",
		inStock: true,
	},
	{
		id: 7,
		name: "Jamawar Wedding Fabric",
		slug: "jamawar-wedding-fabric",
		category: "Premium Fabrics",
		price: "PKR 12,500",
		priceNumeric: 12500,
		rating: 5.0,
		reviews: 67,
		isNew: true,
		isFeatured: true,
		colors: [
			{ name: "Gold", hex: "#b8860b" },
			{ name: "Burgundy", hex: "#800020" },
			{ name: "Royal Blue", hex: "#000080" },
		],
		image: "/pictures/products/7.webp",
		hoverImage: "/pictures/products/7.7.webp",
		description: "Exquisite Jamawar fabric for wedding celebrations.",
		inStock: true,
	},
	{
		id: 8,
		name: "Cotton Casual Kurta",
		slug: "cotton-casual-kurta",
		category: "Casual Wear",
		price: "PKR 2,800",
		priceNumeric: 2800,
		originalPrice: "PKR 3,500",
		originalPriceNumeric: 3500,
		rating: 4.5,
		reviews: 289,
		isSale: true,
		colors: [
			{ name: "White", hex: "#ffffff" },
			{ name: "Sky Blue", hex: "#87ceeb" },
			{ name: "Mint Green", hex: "#90ee90" },
		],
		image: "/pictures/products/8.webp",
		hoverImage: "/pictures/products/8.8.webp",
		description: "Comfortable cotton kurta for casual wear.",
		inStock: true,
	},
];

// Get featured products
export const getFeaturedProducts = (): Product[] => {
	return topProducts.filter((product) => product.isFeatured);
};

// Get products on sale
export const getSaleProducts = (): Product[] => {
	return topProducts.filter((product) => product.isSale);
};

// Get new arrivals
export const getNewArrivals = (): Product[] => {
	return topProducts.filter((product) => product.isNew);
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
	return topProducts.filter(
		(product) => product.category.toLowerCase() === category.toLowerCase()
	);
};

export default topProducts;
