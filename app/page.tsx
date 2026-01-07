// ============================================
// PAGE: Home
// Main homepage with all sections assembled
// ============================================

"use client";

import { useState } from "react";
import {
	AnnouncementBar,
	Navbar,
	Hero,
	TopProducts,
	Categories,
	PromoBanner,
	ProductGallery,
	Features,
	WhatsAppButton,
	Footer,
} from "@/components/E-Commerce/components/sections";
import {
	navigationItems,
	heroSlides,
	heroFeaturedProduct,
	topProducts,
	catalogProducts,
} from "@/components/E-Commerce/data";

// ==================== PAGE COMPONENT ====================

export default function HomePage() {
	const [wishlistCount] = useState(2);
	const [cartCount] = useState(3);

	return (
		<>
			{/* Announcement Bar */}
			<AnnouncementBar
				variant="sale"
				showIcon={true}
				dismissible={false}
			/>

			{/* Navigation */}
			<Navbar
				items={navigationItems}
				wishlistCount={wishlistCount}
				cartCount={cartCount}
			/>

			{/* Main Content */}
			<main>
				{/* Hero Section */}
				<Hero
					slides={heroSlides}
					featuredProduct={heroFeaturedProduct}
					autoPlayInterval={6000}
				/>

				{/* Top Products Section */}
				<TopProducts
					products={topProducts}
					title="Top Picks"
					subtitle="Handpicked for You"
					description="Our most loved pieces, curated for the modern gentleman"
					viewAllHref="/collections/all"
					viewAllText="View All Products"
				/>

				{/* Categories Section */}
				<Categories />

				{/* Promo Banner */}
				<PromoBanner
					title="Eid Collection"
					highlightText="2025"
					subtitle="Limited Edition"
					description="Discover our exclusive Eid collection featuring premium fabrics, elegant designs, and timeless styles for the modern gentleman."
					primaryCta="Shop Eid Collection"
					primaryCtaHref="/collections/eid-2025"
					secondaryCta="View Lookbook"
					secondaryCtaHref="/lookbook/eid-2025"
					variant="gradient"
				/>

				<ProductGallery products={catalogProducts} />

				{/* Features / Trust Bar */}
				<Features variant="default" columns={4} />
			</main>

			<Footer />

			{/* WhatsApp Floating Button */}
			<WhatsAppButton
				showTooltip={true}
				tooltipText="Chat with us"
				position="bottom-right"
				pulseAnimation={true}
			/>
		</>
	);
}
