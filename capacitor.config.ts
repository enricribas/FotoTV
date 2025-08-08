import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.phototv.app',
	appName: 'FotoTV',
	webDir: 'build',
	server: {
		androidScheme: 'https',
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
		FirebaseAuthentication: {
			skipNativeAuth: false,
			providers: ['google.com'],
			customUrlScheme: 'com.phototv.app'
		}
	}
};

export default config;
