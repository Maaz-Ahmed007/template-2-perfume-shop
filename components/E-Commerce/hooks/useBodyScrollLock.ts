// ============================================
// HOOK: useBodyScrollLock
// Locks body scroll when modals/overlays are open
// ============================================

"use client";

import { useEffect } from "react";
import { lockBodyScroll, unlockBodyScroll, isClient } from "../lib/utils";

export function useBodyScrollLock(isLocked: boolean): void {
	useEffect(() => {
		if (!isClient()) return;

		if (isLocked) {
			lockBodyScroll();
		} else {
			unlockBodyScroll();
		}

		return () => {
			unlockBodyScroll();
		};
	}, [isLocked]);
}

export default useBodyScrollLock;
