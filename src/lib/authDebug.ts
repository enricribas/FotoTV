// src/lib/authDebug.ts
import { auth } from '$lib/firebase';
import { Capacitor } from '@capacitor/core';
import { writable } from 'svelte/store';

// Debug log store
export const authDebugLog = writable<string[]>([]);

// Add a log entry
export function logDebug(message: string, data?: any): void {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const logMessage = `[${timestamp}] ${message}`;

  if (data) {
    console.log(logMessage, data);
    authDebugLog.update(logs => {
      const newLogs = [...logs, `${logMessage} ${JSON.stringify(data, null, 2)}`];
      // Keep last 50 logs
      return newLogs.slice(-50);
    });
  } else {
    console.log(logMessage);
    authDebugLog.update(logs => {
      const newLogs = [...logs, logMessage];
      return newLogs.slice(-50);
    });
  }
}

// Get current platform info
export function getPlatformInfo(): Record<string, any> {
  return {
    platform: Capacitor.getPlatform(),
    isNative: Capacitor.isNativePlatform(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    currentAuthState: auth.currentUser ? {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      isAnonymous: auth.currentUser.isAnonymous,
      providerIds: auth.currentUser.providerData.map(p => p.providerId)
    } : 'Not authenticated',
    capacitorConfig: Capacitor.config
  };
}

// Setup debug listeners
export function setupAuthDebugListeners(): void {
  // Auth state change listener
  auth.onAuthStateChanged((user) => {
    if (user) {
      logDebug('Auth state changed: SIGNED IN', {
        uid: user.uid,
        email: user.email,
        providers: user.providerData.map(p => p.providerId)
      });
    } else {
      logDebug('Auth state changed: SIGNED OUT');
    }
  });

  // Listen for auth errors
  const originalError = console.error;
  console.error = function(...args) {
    if (args[0] && typeof args[0] === 'string' &&
        (args[0].includes('auth') || args[0].includes('firebase'))) {
      logDebug('AUTH ERROR:', args);
    }
    originalError.apply(console, args);
  };

  // App state
  try {
    // Listen for URL open events (deep links)
    if (Capacitor.isNativePlatform()) {
      import('@capacitor/app').then(({ App }) => {
        App.addListener('appUrlOpen', (data: { url: string }) => {
          logDebug('App URL opened', { url: data.url });
        });

        App.addListener('appStateChange', (state: { isActive: boolean }) => {
          logDebug('App state changed', { isActive: state.isActive });
        });
      });
    }
  } catch (e) {
    logDebug('Could not set up Capacitor App listeners', e);
  }

  logDebug('Auth debug listeners set up', getPlatformInfo());
}

// Add global debug object for console access
if (typeof window !== 'undefined') {
  (window as any).authDebug = {
    log: logDebug,
    getInfo: getPlatformInfo,
    getAuthState: () => auth.currentUser,
    getAllLogs: () => {
      let logs: string[] = [];
      authDebugLog.subscribe(value => {
        logs = value;
      })();
      return logs;
    }
  };
}

// Initialize
setupAuthDebugListeners();
