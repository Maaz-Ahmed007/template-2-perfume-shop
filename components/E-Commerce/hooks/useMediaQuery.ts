"use client";

import { useSyncExternalStore } from "react";
import { BREAKPOINTS } from "../lib/constants";
import type { BreakpointKey } from "../lib/types";

// Legacy MediaQueryList API (Safari < 14)
// addListener/removeListener exist there.
type MQLLegacyListener = (
	this: MediaQueryList,
	ev: MediaQueryListEvent
) => void;

type LegacyMQL = MediaQueryList & {
	addListener?: (listener: MQLLegacyListener) => void;
	removeListener?: (listener: MQLLegacyListener) => void;
};

export function useMediaQuery(query: string): boolean {
	const getServerSnapshot = () => false;

	const getSnapshot = () => {
		if (typeof window === "undefined") return false;
		return window.matchMedia(query).matches;
	};

	const subscribe = (onStoreChange: () => void) => {
		if (typeof window === "undefined") return () => {};

		const mql = window.matchMedia(query) as LegacyMQL;

		// Modern API handler: (event) => void
		const modernHandler = (_ev: MediaQueryListEvent) => {
			onStoreChange();
		};

		// Legacy API handler: function with `this` binding
		const legacyHandler: MQLLegacyListener = function (_ev) {
			onStoreChange();
		};

		if (typeof mql.addEventListener === "function") {
			mql.addEventListener("change", modernHandler);
			return () => mql.removeEventListener("change", modernHandler);
		}

		if (typeof mql.addListener === "function") {
			mql.addListener(legacyHandler);
			return () => {
				if (typeof mql.removeListener === "function") {
					mql.removeListener(legacyHandler);
				}
			};
		}

		return () => {};
	};

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Convenience hooks
export function useIsMobile(): boolean {
	return !useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
}

export function useIsTablet(): boolean {
	const isAboveSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
	const isBelowLg = !useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
	return isAboveSm && isBelowLg;
}

export function useIsDesktop(): boolean {
	return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export function useBreakpoint(breakpoint: BreakpointKey): boolean {
	return useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
}

export default useMediaQuery;
