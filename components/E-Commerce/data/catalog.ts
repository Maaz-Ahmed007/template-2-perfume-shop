import type { Product } from "../lib/types";
import { topProducts } from "./products";

export const catalogProducts: Product[] = Array.from({ length: 24 }).map(
	(_, i) => {
		const base = topProducts[i % topProducts.length];
		const k = Math.floor(i / topProducts.length);

		return {
			...base,
			id: base.id + 1000 * (k + 1),
			slug: `${base.slug}-${k + 1}`,
			// Optional: map colors to images if you want true color-image switching
			images: [
				base.image,
				base.hoverImage ?? base.image,
				base.image,
				base.hoverImage ?? base.image,
			],
		};
	}
);
