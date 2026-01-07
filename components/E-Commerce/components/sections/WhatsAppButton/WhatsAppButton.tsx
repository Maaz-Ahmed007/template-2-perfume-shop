// ============================================
// COMPONENT: WhatsAppButton
// Floating WhatsApp contact button
// ============================================

"use client";

import React, { useState, useEffect } from "react";
import { RiWhatsappLine } from "react-icons/ri";
import { cn } from "../../../lib/utils";
import { getWhatsAppUrl, WHATSAPP_CONFIG } from "../../../lib/constants";
import "./WhatsAppButton.css";

// ==================== TYPES ====================

export interface WhatsAppButtonProps {
	phoneNumber?: string;
	message?: string;
	showTooltip?: boolean;
	tooltipText?: string;
	position?: "bottom-right" | "bottom-left";
	showAfterScroll?: number; // Show after scrolling X pixels
	pulseAnimation?: boolean;
	className?: string;
}

// ==================== COMPONENT ====================

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
	phoneNumber = WHATSAPP_CONFIG.phoneNumber,
	message = WHATSAPP_CONFIG.defaultMessage,
	showTooltip = true,
	tooltipText = "Chat with us",
	position = "bottom-right",
	showAfterScroll = 0,
	pulseAnimation = true,
	className,
}) => {
	const [isVisible, setIsVisible] = useState(showAfterScroll === 0);
	const [isHovered, setIsHovered] = useState(false);

	// If showAfterScroll === 0, always visible. No state sync needed.
	const visible = showAfterScroll === 0 ? true : isVisible;

	useEffect(() => {
		if (showAfterScroll === 0) return; // no setState in effect

		const handleScroll = () => {
			setIsVisible(window.scrollY > showAfterScroll);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		// Initial sync, but NOT synchronous (avoids lint)
		const raf = window.requestAnimationFrame(handleScroll);

		return () => {
			window.cancelAnimationFrame(raf);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [showAfterScroll]);

	const whatsappUrl = getWhatsAppUrl(message);

	return (
		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"whatsapp-btn",
				`whatsapp-btn--${position}`,
				isVisible && "whatsapp-btn--visible",
				pulseAnimation && "whatsapp-btn--pulse",
				className
			)}
			aria-label="Chat on WhatsApp"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Ping animation */}
			{pulseAnimation && <span className="whatsapp-btn__ping" />}

			{/* Button body */}
			<span className="whatsapp-btn__body">
				<RiWhatsappLine className="whatsapp-btn__icon" />
			</span>

			{/* Tooltip */}
			{showTooltip && (
				<span
					className={cn(
						"whatsapp-btn__tooltip",
						isHovered && "whatsapp-btn__tooltip--visible"
					)}>
					{tooltipText}
					<span className="whatsapp-btn__tooltip-arrow" />
				</span>
			)}
		</a>
	);
};

export default WhatsAppButton;
