// src/app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";
import ProductGallery from "@/components/sections/ProductGallery";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<FeaturedProducts />
				<CollectionsShowcase />
				<ProductGallery />
				<Footer />
			</main>
		</>
	);
}
