// ============================================
// COMPONENT: Features
// Trust bar / USP section
// ============================================

"use client";

import React from "react";
import {
	RiTruckLine,
	RiShieldCheckLine,
	RiRefund2Line,
	RiCustomerServiceLine,
	RiSecurePaymentLine,
	RiAwardLine,
} from "react-icons/ri";
import { cn } from "../../../lib/utils";
import "./Features.css";

// ==================== TYPES ====================

export interface Feature {
	id: string;
	icon: React.ReactNode;
	title: string;
	description: string;
}

export interface FeaturesProps {
	features?: Feature[];
	variant?: "default" | "bordered" | "cards";
	columns?: 3 | 4 | 6;
	className?: string;
}

// ==================== DEFAULT DATA ====================

const defaultFeatures: Feature[] = [
	{
		id: "delivery",
		icon: <RiTruckLine />,
		title: "Free Delivery",
		description: "On orders above PKR 5,000",
	},
	{
		id: "quality",
		icon: <RiAwardLine />,
		title: "Premium Quality",
		description: "Finest fabrics guaranteed",
	},
	{
		id: "returns",
		icon: <RiRefund2Line />,
		title: "Easy Returns",
		description: "7-day return policy",
	},
	{
		id: "secure",
		icon: <RiSecurePaymentLine />,
		title: "Secure Payment",
		description: "100% secure checkout",
	},
];

// ==================== COMPONENT ====================

export const Features: React.FC<FeaturesProps> = ({
	features = defaultFeatures,
	variant = "default",
	columns = 4,
	className,
}) => {
	return (
		<section
			className={cn(
				"features",
				`features--${variant}`,
				`features--cols-${columns}`,
				className
			)}>
			<div className="features__container">
				<div className="features__grid">
					{features.map((feature, index) => (
						<div
							key={feature.id}
							className="features__item"
							style={
								{ "--item-index": index } as React.CSSProperties
							}>
							<div className="features__icon-wrapper">
								<span className="features__icon">
									{feature.icon}
								</span>
							</div>
							<div className="features__content">
								<h3 className="features__title">
									{feature.title}
								</h3>
								<p className="features__description">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
