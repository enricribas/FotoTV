import { Capacitor } from '@capacitor/core';

export interface DeviceInfo {
	isTV: boolean;
	hasPhysicalKeyboard: boolean;
	isTouchDevice: boolean;
	screenType: 'mobile' | 'tablet' | 'tv' | 'desktop';
	inputMethods: string[];
}

/**
 * Detects if the device primarily uses touch input
 */
export function isTouchDevice(): boolean {
	if (Capacitor.getPlatform() === 'web') {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	}

	// Android platform is generally a touch device
	if (Capacitor.getPlatform() === 'android') {
		return true;
	}

	return false;
}

/**
 * Determines the screen/device type based on size
 * Simplified logic: anything not mobile is treated as TV-capable
 */
export function getScreenType(): 'mobile' | 'tablet' | 'tv' | 'desktop' {
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
 * Simplified TV detection
 * Assumes TV mode for any device that's not a phone and has a wide screen
 */
export function isTV(): boolean {
	const screenType = getScreenType();

	// Everything that's not mobile is considered TV
	// This includes tablets, desktops, and actual TVs
	return screenType !== 'mobile';
}

/**
 * Detects if the device has a physical keyboard available
 * Simplified: assume non-touch devices have keyboards
 */
export function hasPhysicalKeyboard(): boolean {
	// If no touch support, likely has keyboard
	if (!isTouchDevice()) {
		return true;
	}

	// Check for pointer precision as an indicator
	if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
		return true;
	}

	return false;
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
	} else if (isTouchDevice()) {
		methods.push('virtual-keyboard');
	}

	// Mouse/pointer detection
	if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
		methods.push('mouse');
	}

	// For TV mode, assume remote/dpad input
	if (isTV()) {
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
		isTV: isTV(),
		hasPhysicalKeyboard: hasPhysicalKeyboard(),
		isTouchDevice: isTouchDevice(),
		screenType: getScreenType(),
		inputMethods: getInputMethods()
	};
}

/**
 * Checks if the app should use TV-optimized UI
 * Simplified: use TV UI for anything that's not a mobile phone
 */
export function shouldUseTVUI(): boolean {
	return isTV();
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

/**
 * Checks for Android TV platform (kept for backwards compatibility)
 */
export function isAndroidTV(): boolean {
	// Simply use the new isTV logic
	return isTV();
}
