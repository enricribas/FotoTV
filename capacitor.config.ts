import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.phototv.app',
	appName: 'FotoTV',
	webDir: 'build',
	server: {
		androidScheme: 'https',
		hostname: 'fototv-90cf0.firebaseapp.com',
		cleartext: true
	},
	android: {
		allowMixedContent: true
	},
	plugins: {
		SplashScreen: {
			launchShowDuration: 2000,
			backgroundColor: '#000000',
			showSpinner: false
		},
		Browser: {
			presentationStyle: 'popover'
		},
		App: {
			url: 'com.phototv.app://',
			androidScheme: 'https'
		}
	},
	loggingBehavior: 'debug'
};

export default config;
