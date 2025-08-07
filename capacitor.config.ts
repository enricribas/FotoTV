import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.knomni.fototv',
	appName: 'FotoTV',
	webDir: 'build',
	server: {
		androidScheme: 'https'
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
		}
	}
};

export default config;
