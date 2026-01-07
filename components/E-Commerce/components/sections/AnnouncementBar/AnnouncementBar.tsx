// ============================================
// COMPONENT: AnnouncementBar
// Top announcement/promotion bar
// ============================================

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiFireLine, RiCloseLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import "./AnnouncementBar.css";

// ==================== TYPES ====================

export interface AnnouncementItem {
	id: string;
	text: string;
	highlight?: string;
	href?: string;
}

export interface AnnouncementBarProps {
	items?: AnnouncementItem[];
	variant?: "default" | "sale" | "info";
	dismissible?: boolean;
	showIcon?: boolean;
	className?: string;
}

// ==================== DEFAULT DATA ====================

const defaultAnnouncements: AnnouncementItem[] = [
	{
		id: "1",
		highlight: "EID SALE LIVE",
		text: "Up to 50% Off Sitewide",
		href: "/sale",
	},
	{
		id: "2",
		text: "Free Delivery Above PKR 5,000",
		href: "/shipping",
	},
	{
		id: "3",
		text: "Cash on Delivery Available Nationwide",
	},
];

// ==================== COMPONENT ====================

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
	items = defaultAnnouncements,
	variant = "sale",
	dismissible = false,
	showIcon = true,
	className,
}) => {
	const [isVisible, setIsVisible] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Auto-rotate announcements
	React.useEffect(() => {
		if (items.length <= 1) return;

		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % items.length);
		}, 5000);

		return () => clearInterval(timer);
	}, [items.length]);

	if (!isVisible || items.length === 0) {
		return null;
	}

	const currentItem = items[currentIndex];

	const content = (
		<div className="announcement-bar__content">
			{/* Icon */}
			{showIcon && variant === "sale" && (
				<RiFireLine className="announcement-bar__icon" />
			)}

			{/* Highlight text */}
			{currentItem.highlight && (
				<span className="announcement-bar__highlight">
					{currentItem.highlight}
				</span>
			)}

			{/* Separator */}
			{currentItem.highlight && currentItem.text && (
				<span className="announcement-bar__separator">|</span>
			)}

			{/* Main text */}
			{currentItem.text && (
				<span className="announcement-bar__text">
					{currentItem.text}
				</span>
			)}

			{/* Additional items indicator (desktop) */}
			{items.length > 1 && (
				<div className="announcement-bar__additional">
					{items.slice(1, 3).map((item, idx) => (
						<React.Fragment key={item.id}>
							<span className="announcement-bar__separator">
								|
							</span>
							<span className="announcement-bar__text">
								{item.text}
							</span>
						</React.Fragment>
					))}
				</div>
			)}
		</div>
	);

	return (
		<div
			className={cn(
				"announcement-bar",
				`announcement-bar--${variant}`,
				className
			)}
			role="banner"
			aria-label="Announcement">
			<div className="announcement-bar__container">
				{/* Announcement content */}
				{currentItem.href ? (
					<Link
						href={currentItem.href}
						className="announcement-bar__link">
						{content}
					</Link>
				) : (
					content
				)}

				{/* Dismiss button */}
				{dismissible && (
					<button
						className="announcement-bar__dismiss"
						onClick={() => setIsVisible(false)}
						aria-label="Dismiss announcement">
						<RiCloseLine className="announcement-bar__dismiss-icon" />
					</button>
				)}
			</div>

			{/* Progress indicators for multiple items (mobile) */}
			{items.length > 1 && (
				<div className="announcement-bar__dots">
					{items.map((item, idx) => (
						<button
							key={item.id}
							className={cn(
								"announcement-bar__dot",
								currentIndex === idx &&
									"announcement-bar__dot--active"
							)}
							onClick={() => setCurrentIndex(idx)}
							aria-label={`Go to announcement ${idx + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default AnnouncementBar;
