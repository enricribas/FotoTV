import { Capacitor } from '@capacitor/core';

export interface DeviceInfo {
	isTV: boolean;
	hasPhysicalKeyboard: boolean;
	isTouchDevice: boolean;
	screenType: 'mobile' | 'tablet' | 'tv' | 'desktop';
	inputMethods: string[];
}

/**
 * Detects if the app is running on an Android TV or similar TV device
 */
export function isAndroidTV(): boolean {
	if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') {
		return false;
	}

	// Check for Android TV specific features
	const userAgent = navigator.userAgent.toLowerCase();

	// Android TV user agents typically contain these identifiers
	const tvIndicators = [
		'android tv',
		'googletv',
		'smarttv',
		'smart-tv',
		'television',
		'tv',
		'settopbox'
	];

	return tvIndicators.some((indicator) => userAgent.includes(indicator));
}

/**
 * Detects if the device has a physical keyboard available
 */
export function hasPhysicalKeyboard(): boolean {
	// For web platform, check if touch is the primary input
	if (Capacitor.getPlatform() === 'web') {
		// If no touch support, likely has keyboard
		if (!('ontouchstart' in window) && !navigator.maxTouchPoints) {
			return true;
		}

		// Check for keyboard-specific media queries
		if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
			return true;
		}

		return false;
	}

	// For Android, check configuration and hardware features
	if (Capacitor.getPlatform() === 'android') {
		// TV devices typically don't have physical keyboards but may have bluetooth keyboards
		// We'll check screen size and TV indicators as proxies
		const screenWidth = window.screen.width;
		const screenHeight = window.screen.height;
		const largeScreen = Math.max(screenWidth, screenHeight) >= 1280;

		// Large screens (TV/desktop-like) are more likely to have keyboards
		if (largeScreen && isAndroidTV()) {
			// TV might have bluetooth keyboard, assume false by default
			return false;
		}

		// Mobile devices typically have virtual keyboards only
		return false;
	}

	// For iOS, typically no physical keyboard on phones/tablets
	if (Capacitor.getPlatform() === 'ios') {
		return false;
	}

	// Default to false for unknown platforms
	return false;
}

/**
 * Detects if the device primarily uses touch input
 */
export function isTouchDevice(): boolean {
	if (Capacitor.getPlatform() === 'web') {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	}

	// Mobile platforms are touch devices
	if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
		// Android TV might not have touch
		if (isAndroidTV()) {
			return false;
		}
		return true;
	}

	return false;
}

/**
 * Determines the screen/device type based on size and capabilities
 */
export function getScreenType(): 'mobile' | 'tablet' | 'tv' | 'desktop' {
	const screenWidth = window.screen.width;
	const screenHeight = window.screen.height;
	const maxDimension = Math.max(screenWidth, screenHeight);

	// Check for TV first
	if (isAndroidTV()) {
		return 'tv';
	}

	// Desktop/web platform with large screen
	if (Capacitor.getPlatform() === 'web' && maxDimension >= 1280) {
		return 'desktop';
	}

	// Mobile vs Tablet based on screen size
	if (Capacitor.isNativePlatform()) {
		// Use density-independent pixels (rough estimate)
		const density = window.devicePixelRatio || 1;
		const dpWidth = screenWidth / density;
		const dpHeight = screenHeight / density;
		const maxDp = Math.max(dpWidth, dpHeight);

		if (maxDp >= 900) {
			return 'tablet';
		} else {
			return 'mobile';
		}
	}

	// Fallback for web based on viewport
	if (maxDimension >= 1024 && Math.min(screenWidth, screenHeight) >= 768) {
		return 'tablet';
	}

	return 'mobile';
}

/**
 * Detects available input methods
 */
export function getInputMethods(): string[] {
	const methods: string[] = [];

	if (isTouchDevice()) {
		methods.push('touch');
	}

	if (hasPhysicalKeyboard()) {
		methods.push('keyboard');
	} else {
		methods.push('virtual-keyboard');
	}

	// Mouse/pointer detection
	if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
		methods.push('mouse');
	}

	// D-pad detection for TV
	if (isAndroidTV()) {
		methods.push('dpad');
		methods.push('remote');
	}

	return methods;
}

/**
 * Gets comprehensive device information
 */
export function getDeviceInfo(): DeviceInfo {
	return {
		isTV: isAndroidTV(),
		hasPhysicalKeyboard: hasPhysicalKeyboard(),
		isTouchDevice: isTouchDevice(),
		screenType: getScreenType(),
		inputMethods: getInputMethods()
	};
}

/**
 * Checks if the app should use TV-optimized UI
 */
export function shouldUseTVUI(): boolean {
	const deviceInfo = getDeviceInfo();

	// Use TV UI if:
	// 1. Running on Android TV
	// 2. Large screen with no touch input
	// 3. Primary input is not touch

	if (deviceInfo.isTV) {
		return true;
	}

	if (deviceInfo.screenType === 'tv' || deviceInfo.screenType === 'desktop') {
		if (!deviceInfo.isTouchDevice || deviceInfo.inputMethods.includes('dpad')) {
			return true;
		}
	}

	return false;
}

/**
 * Reactive store for device information that updates on resize/orientation change
 */
export function createDeviceStore() {
	let deviceInfo = getDeviceInfo();
	const subscribers = new Set<(info: DeviceInfo) => void>();

	const updateDeviceInfo = () => {
		const newInfo = getDeviceInfo();
		// Only update if something changed
		if (JSON.stringify(newInfo) !== JSON.stringify(deviceInfo)) {
			deviceInfo = newInfo;
			subscribers.forEach((callback) => callback(deviceInfo));
		}
	};

	// Listen for changes
	window.addEventListener('resize', updateDeviceInfo);
	window.addEventListener('orientationchange', updateDeviceInfo);

	return {
		subscribe: (callback: (info: DeviceInfo) => void) => {
			subscribers.add(callback);
			callback(deviceInfo); // Initial call

			return () => {
				subscribers.delete(callback);
				if (subscribers.size === 0) {
					window.removeEventListener('resize', updateDeviceInfo);
					window.removeEventListener('orientationchange', updateDeviceInfo);
				}
			};
		},
		get: () => deviceInfo
	};
}

// Export a default device store instance
export const deviceStore = createDeviceStore();
