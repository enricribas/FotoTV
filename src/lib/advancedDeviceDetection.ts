import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

export interface AdvancedDeviceInfo {
	isTV: boolean;
	hasPhysicalKeyboard: boolean;
	isTouchDevice: boolean;
	screenType: 'mobile' | 'tablet' | 'tv' | 'desktop';
	inputMethods: string[];
	deviceInfo?: Record<string, unknown>;
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
	private static deviceInfo: Record<string, unknown> | null = null;
	private static initialized = false;

	/**
	 * Initialize the device detector
	 */
	static async initialize(): Promise<void> {
		if (this.initialized) return;

		try {
			if (Capacitor.isNativePlatform()) {
				this.deviceInfo = await Device.getInfo();
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

		if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') {
			return false;
		}

		// Method 1: Check device info from Capacitor
		if (this.deviceInfo) {
			const model = this.deviceInfo.model?.toLowerCase() || '';
			const manufacturer = this.deviceInfo.manufacturer?.toLowerCase() || '';

			// Common Android TV manufacturers and models
			const tvManufacturers = ['nvidia', 'sony', 'philips', 'tcl', 'hisense', 'xiaomi'];
			const tvModels = ['shield', 'bravia', 'androidtv', 'googletv', 'chromecast'];

			if (
				tvManufacturers.some((m) => manufacturer.includes(m)) ||
				tvModels.some((m) => model.includes(m))
			) {
				return true;
			}
		}

		// Method 2: Check user agent
		const userAgent = navigator.userAgent.toLowerCase();
		const tvIndicators = [
			'android tv',
			'googletv',
			'smarttv',
			'smart-tv',
			'television',
			'settopbox',
			'nexus player',
			'adt-'
		];

		if (tvIndicators.some((indicator) => userAgent.includes(indicator))) {
			return true;
		}

		// Method 3: Check screen characteristics
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const diagonal = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);
		const density = window.devicePixelRatio || 1;

		// Large screen with low density often indicates TV
		if (diagonal > 2000 && density <= 2) {
			return true;
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
			// Android TV typically doesn't have touch
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

		// Check for TV first
		if (await this.isAndroidTV()) {
			return 'tv';
		}

		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const maxDimension = Math.max(screenWidth, screenHeight);
		const minDimension = Math.min(screenWidth, screenHeight);

		// Desktop/web platform
		if (Capacitor.getPlatform() === 'web' && maxDimension >= 1280) {
			return 'desktop';
		}

		// Use device info for better detection
		if (this.deviceInfo && Capacitor.isNativePlatform()) {
			const model = this.deviceInfo.model?.toLowerCase() || '';

			// Tablet detection based on model names
			if (model.includes('tablet')) {
				return 'tablet';
			}

			// Use density-independent pixels
			const density = window.devicePixelRatio || 1;
			const dpWidth = screenWidth / density;
			const dpHeight = screenHeight / density;
			const maxDp = Math.max(dpWidth, dpHeight);

			if (maxDp >= 900) {
				return 'tablet';
			}
		}

		// Fallback to screen size
		if (maxDimension >= 1024 && minDimension >= 768) {
			return 'tablet';
		}

		return 'mobile';
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

		// Calculate shouldUseTVUI without circular dependency
		const shouldUseTVUI =
			isTV ||
			isLeanback ||
			((screenType === 'tv' || screenType === 'desktop') &&
				(inputMethods.includes('dpad') ||
					inputMethods.includes('remote') ||
					(!isTouchDevice && inputMethods.includes('gamepad'))));

		return {
			isTV,
			hasPhysicalKeyboard,
			isTouchDevice,
			screenType,
			inputMethods,
			deviceInfo: this.deviceInfo,
			uiMode,
			isLeanback,
			hasHardwareKeyboard: hasPhysicalKeyboard,
			supportsGamepad: this.supportsGamepad(),
			shouldUseTVUI
		};
	}

	/**
	 * Determines if TV-optimized UI should be used
	 */
	static async shouldUseTVUI(): Promise<boolean> {
		await this.initialize();

		const isTV = await this.isAndroidTV();
		const isLeanback = await this.isLeanback();

		// Use TV UI if:
		// 1. Running on Android TV
		// 2. In leanback mode
		// 3. Large screen with remote/dpad input

		if (isTV || isLeanback) {
			return true;
		}

		const screenType = await this.getScreenType();
		const inputMethods = await this.getInputMethods();
		const isTouchDevice = await this.isTouchDevice();

		if (screenType === 'tv' || screenType === 'desktop') {
			if (
				inputMethods.includes('dpad') ||
				inputMethods.includes('remote') ||
				(!isTouchDevice && inputMethods.includes('gamepad'))
			) {
				return true;
			}
		}

		return false;
	}
}

// Convenience functions for easier usage
export const isAndroidTV = () => AdvancedDeviceDetector.isAndroidTV();
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
		window.location.reload();
	}
};

export const disableTVMode = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('tv_mode');
		window.location.reload();
	}
};

export const isTVModeEnabled = () => {
	if (typeof window === 'undefined') return false;
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('tv') === 'true' || localStorage.getItem('tv_mode') === 'true';
};
