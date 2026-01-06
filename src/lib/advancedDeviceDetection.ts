import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

export interface AdvancedDeviceInfo {
	isTV: boolean;
	hasPhysicalKeyboard: boolean;
	isTouchDevice: boolean;
	screenType: 'mobile' | 'tablet' | 'tv' | 'desktop';
	inputMethods: string[];
	deviceInfo?: {
		model?: string;
		manufacturer?: string;
		[key: string]: unknown;
	};
	uiMode?: string;
	isLeanback: boolean;
	hasHardwareKeyboard: boolean;
	supportsGamepad: boolean;
	shouldUseTVUI: boolean;
}

/**
 * Enhanced device detection using Capacitor Device plugin
 */
export class AdvancedDeviceDetector {
	private static deviceInfo: {
		model?: string;
		manufacturer?: string;
		[key: string]: unknown;
	} | null = null;
	private static initialized = false;

	/**
	 * Initialize the device detector
	 */
	static async initialize(): Promise<void> {
		if (this.initialized) return;

		try {
			if (Capacitor.isNativePlatform()) {
				this.deviceInfo = (await Device.getInfo()) as unknown as {
					model?: string;
					manufacturer?: string;
					[key: string]: unknown;
				};
			}
			this.initialized = true;
		} catch (error) {
			console.warn('Failed to initialize device detection:', error);
			this.initialized = true;
		}
	}

	/**
	 * Check if TV mode is forced via environment variable
	 */
	private static isTVModeForced(): boolean {
		if (typeof window === 'undefined') return false;

		// Check if TV mode has been explicitly disabled
		if (localStorage.getItem('tv_mode_disabled') === 'true') {
			return false;
		}

		// Check for TV mode in URL params (for local testing)
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('tv') === 'true') return true;

		// Check for TV mode in localStorage (persists across page loads)
		return localStorage.getItem('tv_mode') === 'true';
	}

	/**
	 * Detects if running on Android TV using multiple methods
	 */
	static async isAndroidTV(): Promise<boolean> {
		await this.initialize();

		// Check for forced TV mode first (for local testing)
		if (this.isTVModeForced()) {
			return true;
		}

		// Check if TV mode has been explicitly disabled
		if (typeof window !== 'undefined' && localStorage.getItem('tv_mode_disabled') === 'true') {
			return false;
		}

		// Check for Echo Show devices specifically
		if (await this.isEchoShow()) {
			return true;
		}

		// Simplified: use screen-based detection
		const screenType = await this.getScreenType();
		return screenType !== 'mobile';
	}

	/**
	 * Detects if the device is an Amazon Echo Show
	 */
	static async isEchoShow(): Promise<boolean> {
		if (typeof window === 'undefined') return false;

		const userAgent = navigator.userAgent.toLowerCase();

		// Check for Echo Show specific identifiers
		if (
			userAgent.includes('echo show') ||
			(userAgent.includes('amazon') && userAgent.includes('webview')) ||
			(userAgent.includes('silk') && userAgent.includes('tv'))
		) {
			return true;
		}

		// Check device info if available
		if (this.deviceInfo) {
			const model = this.deviceInfo.model?.toLowerCase() || '';
			const manufacturer = this.deviceInfo.manufacturer?.toLowerCase() || '';

			if (manufacturer.includes('amazon') || model.includes('echo')) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Detects UI mode (normal, car, desk, television, etc.)
	 */
	static async getUIMode(): Promise<string> {
		await this.initialize();

		// For Android, we can infer UI mode from various indicators
		if (Capacitor.getPlatform() === 'android') {
			if (await this.isAndroidTV()) {
				return 'television';
			}

			// Check if in car mode (landscape + specific screen ratios)
			const isLandscape = window.screen.width > window.screen.height;
			const aspectRatio = window.screen.width / window.screen.height;

			if (isLandscape && aspectRatio > 2.5) {
				return 'car';
			}
		}

		return 'normal';
	}

	/**
	 * Checks if the device is in leanback mode (TV interface)
	 */
	static async isLeanback(): Promise<boolean> {
		const uiMode = await this.getUIMode();
		return uiMode === 'television' || (await this.isAndroidTV());
	}

	/**
	 * Enhanced keyboard detection
	 */
	static async hasPhysicalKeyboard(): Promise<boolean> {
		await this.initialize();

		// Web platform detection
		if (Capacitor.getPlatform() === 'web') {
			return this.detectWebKeyboard();
		}

		// Android detection
		if (Capacitor.getPlatform() === 'android') {
			// TV devices might have bluetooth keyboards
			if (await this.isAndroidTV()) {
				return await this.detectTVKeyboard();
			}

			// Mobile devices typically don't have physical keyboards
			return false;
		}

		return false;
	}

	/**
	 * Detects hardware keyboard availability on TV devices
	 */
	private static async detectTVKeyboard(): Promise<boolean> {
		// TV devices may have:
		// 1. Bluetooth keyboards
		// 2. USB keyboards
		// 3. Remote controls with QWERTY

		// Check if we can detect bluetooth devices (limited in web context)
		try {
			if ('bluetooth' in navigator) {
				// This requires user permission and might not work in all contexts
				return false; // Conservative approach
			}
		} catch {
			// Bluetooth API not available
		}

		// Check for keyboard events to infer keyboard presence
		return new Promise((resolve) => {
			const timeout: NodeJS.Timeout = setTimeout(() => {
				cleanup();
				resolve(false);
			}, 100);

			const cleanup = () => {
				document.removeEventListener('keydown', keyHandler);
				clearTimeout(timeout);
			};

			const keyHandler = (event: KeyboardEvent) => {
				// Physical keyboard events often have different characteristics
				if (event.key && event.key.length === 1 && !event.altKey && !event.ctrlKey) {
					cleanup();
					resolve(true);
				}
			};

			document.addEventListener('keydown', keyHandler);
		});
	}

	/**
	 * Web platform keyboard detection
	 */
	private static detectWebKeyboard(): boolean {
		// Check for fine pointer (mouse/trackpad) which usually indicates keyboard presence
		if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
			return true;
		}

		// Check if touch is not the primary input
		if (!('ontouchstart' in window) && !navigator.maxTouchPoints) {
			return true;
		}

		// Check for specific keyboard media queries
		if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
			return true;
		}

		return false;
	}

	/**
	 * Enhanced touch device detection
	 */
	static async isTouchDevice(): Promise<boolean> {
		await this.initialize();

		if (Capacitor.getPlatform() === 'web') {
			return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		}

		// Android devices
		if (Capacitor.getPlatform() === 'android') {
			// Echo Show devices have touch despite being TV devices
			if (await this.isEchoShow()) {
				return true;
			}

			// Other Android TV typically doesn't have touch
			if (await this.isAndroidTV()) {
				return false;
			}
			return true;
		}

		return false;
	}

	/**
	 * Detects gamepad/controller support
	 */
	static supportsGamepad(): boolean {
		return 'getGamepads' in navigator;
	}

	/**
	 * Gets active gamepads
	 */
	static getConnectedGamepads(): Gamepad[] {
		if (!this.supportsGamepad()) return [];

		const gamepads = navigator.getGamepads();
		return Array.from(gamepads).filter((gamepad) => gamepad !== null) as Gamepad[];
	}

	/**
	 * Enhanced screen type detection
	 */
	static async getScreenType(): Promise<'mobile' | 'tablet' | 'tv' | 'desktop'> {
		await this.initialize();

		// Check if TV mode has been explicitly disabled
		if (typeof window !== 'undefined' && localStorage.getItem('tv_mode_disabled') === 'true') {
			return 'desktop';
		}

		// Echo Show devices should be treated as TV regardless of size
		if (await this.isEchoShow()) {
			return 'tv';
		}

		// Simplified logic based on screen size
		const screenWidth = window.innerWidth || window.screen.width;
		const screenHeight = window.innerHeight || window.screen.height;
		const maxDimension = Math.max(screenWidth, screenHeight);
		const minDimension = Math.min(screenWidth, screenHeight);

		// Mobile detection - narrow screens or small overall size
		if (maxDimension < 768 || (maxDimension < 1024 && minDimension < 600)) {
			return 'mobile';
		}

		// For simplicity, treat everything else as TV
		// This includes tablets, desktops, and actual TVs
		return 'tv';
	}

	/**
	 * Gets available input methods
	 */
	static async getInputMethods(): Promise<string[]> {
		const methods: string[] = [];

		if (await this.isTouchDevice()) {
			methods.push('touch');
		}

		if (await this.hasPhysicalKeyboard()) {
			methods.push('keyboard');
		} else {
			methods.push('virtual-keyboard');
		}

		// Mouse/pointer detection
		if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
			methods.push('mouse');
		}

		// D-pad/remote detection for TV
		if (await this.isAndroidTV()) {
			methods.push('dpad');
			methods.push('remote');
		}

		// Gamepad detection
		if (this.supportsGamepad() && this.getConnectedGamepads().length > 0) {
			methods.push('gamepad');
		}

		return methods;
	}

	/**
	 * Gets comprehensive device information
	 */
	static async getAdvancedDeviceInfo(): Promise<AdvancedDeviceInfo> {
		await this.initialize();

		const isTV = await this.isAndroidTV();
		const hasPhysicalKeyboard = await this.hasPhysicalKeyboard();
		const isTouchDevice = await this.isTouchDevice();
		const screenType = await this.getScreenType();
		const inputMethods = await this.getInputMethods();
		const uiMode = await this.getUIMode();
		const isLeanback = await this.isLeanback();
		const isEchoShow = await this.isEchoShow();

		// Calculate shouldUseTVUI without circular dependency
		// Simplified: TV UI for anything that's not mobile
		const shouldUseTVUI = screenType !== 'mobile';

		const hasHardwareKeyboard = hasPhysicalKeyboard;
		const supportsGamepad = this.supportsGamepad();

		return {
			isTV,
			hasPhysicalKeyboard,
			isTouchDevice,
			screenType,
			inputMethods,
			deviceInfo: this.deviceInfo ? { ...this.deviceInfo, isEchoShow } : { isEchoShow },
			uiMode,
			isLeanback,
			hasHardwareKeyboard,
			supportsGamepad,
			shouldUseTVUI
		};
	}

	/**
	 * Determines if TV-optimized UI should be used
	 */
	static async shouldUseTVUI(): Promise<boolean> {
		await this.initialize();

		// Check if TV mode has been explicitly disabled
		if (typeof window !== 'undefined' && localStorage.getItem('tv_mode_disabled') === 'true') {
			return false;
		}

		// Simplified: use TV UI for anything that's not mobile
		const screenType = await this.getScreenType();
		return screenType !== 'mobile';
	}
}

// Convenience functions for easier usage
export const isAndroidTV = () => AdvancedDeviceDetector.isAndroidTV();
export const isEchoShow = () => AdvancedDeviceDetector.isEchoShow();
export const hasPhysicalKeyboard = () => AdvancedDeviceDetector.hasPhysicalKeyboard();
export const isTouchDevice = () => AdvancedDeviceDetector.isTouchDevice();
export const getScreenType = () => AdvancedDeviceDetector.getScreenType();
export const getInputMethods = () => AdvancedDeviceDetector.getInputMethods();
export const getAdvancedDeviceInfo = () => AdvancedDeviceDetector.getAdvancedDeviceInfo();
export const shouldUseTVUI = () => AdvancedDeviceDetector.shouldUseTVUI();

// TV mode simulation helpers
export const enableTVMode = () => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('tv_mode', 'true');
		localStorage.removeItem('tv_mode_disabled');
		window.location.reload();
	}
};

export const disableTVMode = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('tv_mode');
		localStorage.setItem('tv_mode_disabled', 'true');
		// Remove the tv parameter from URL without reloading
		const url = new URL(window.location.href);
		url.searchParams.delete('tv');
		window.history.replaceState({}, '', url.toString());
	}
};

export const isTVModeEnabled = () => {
	if (typeof window === 'undefined') return false;
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('tv') === 'true' || localStorage.getItem('tv_mode') === 'true';
};
