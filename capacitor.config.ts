import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.phototv.app',
	appName: 'PhotoTV',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	},
	android: {
		allowMixedContent: true,
		flavor: 'tv'
	},
	plugins: {
		SplashScreen: {
			launchShowDuration: 2000,
			backgroundColor: '#000000',
			showSpinner: false
		}
	}
};

export default config;
