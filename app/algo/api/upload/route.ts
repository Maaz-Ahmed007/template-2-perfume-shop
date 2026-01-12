import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function POST(req: Request) {
	const formData = await req.formData();
	const file = formData.get("file") as File;

	const html = await file.text();
	const dom = new JSDOM(html);
	const document = dom.window.document;

	const rows = Array.from(document.querySelectorAll("tr"));

	const sections = [];
	let currentProducts: any[] = [];

	for (const row of rows) {
		const cells = row.querySelectorAll("td");

		// Section total row
		if (row.textContent?.includes("Total:")) {
			const categoryName = row.textContent?.replace("Total:", "").trim();

			sections.push({
				categoryName,
				products: currentProducts,
			});

			currentProducts = [];
			continue;
		}

		// Product row (must have SKU column)
		if (cells.length >= 3) {
			const sku = cells[1]?.textContent?.trim();
			if (!sku || isNaN(Number(sku))) continue;

			currentProducts.push({
				sku,
				name: cells[2]?.textContent?.trim(),
				columns: Array.from(cells).map((td) => td.textContent?.trim()),
			});
		}
	}

	return NextResponse.json(sections);
}
