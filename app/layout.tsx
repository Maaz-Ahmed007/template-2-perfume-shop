// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const playfair = Playfair_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
	variable: "--font-cormorant",
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: "#C9A227",
	viewportFit: "cover",
};

export const metadata: Metadata = {
	title: {
		default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
		template: `%s | ${SITE_CONFIG.name}`,
	},
	description: SITE_CONFIG.description,
	keywords: [
		"luxury perfume",
		"fragrance",
		"oud",
		"attar",
		"Pakistan perfume",
		"designer fragrance",
		"niche perfume",
	],
	authors: [{ name: SITE_CONFIG.name }],
	creator: SITE_CONFIG.name,
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: SITE_CONFIG.name,
		title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
		description: SITE_CONFIG.description,
	},
	twitter: {
		card: "summary_large_image",
		title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
		description: SITE_CONFIG.description,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
			suppressHydrationWarning
		>
			<body className="antialiased overflow-x-hidden">{children}</body>
		</html>
	);
}
