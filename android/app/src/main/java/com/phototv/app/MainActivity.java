package com.phototv.app;

import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private WebView webView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Keep the screen on to prevent sleep during slideshow
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        // Post a delayed task to configure WebView after Capacitor initializes
        getWindow().getDecorView().post(() -> {
            configureWebViewForTouchAndTV();
        });
    }

    /**
     * Configure WebView to properly handle touch events on Fire TV and Echo Show
     */
    private void configureWebViewForTouchAndTV() {
        try {
            // Get the WebView from the bridge
            webView = getBridge().getWebView();
            
            if (webView != null) {
                // Enable touch processing
                webView.setOnTouchListener((v, event) -> {
                    // Request focus to ensure touch events are processed
                    if (!webView.hasFocus()) {
                        webView.requestFocus();
                    }
                    // Return false to let the WebView handle the event normally
                    return false;
                });

                // Ensure WebView can receive focus
                webView.setFocusable(true);
                webView.setFocusableInTouchMode(true);
                webView.requestFocus();

                // Configure WebView settings for TV devices
                WebView.setWebContentsDebuggingEnabled(false);
                
                // Log configuration success (will appear in logcat)
                android.util.Log.d("PhotoTV", "WebView configured for touch and TV mode");
            }
        } catch (Exception e) {
            android.util.Log.e("PhotoTV", "Failed to configure WebView: " + e.getMessage());
        }
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent event) {
        // Ensure WebView gets touch events on Fire TV
        if (webView != null && !webView.hasFocus()) {
            webView.requestFocus();
        }
        return super.dispatchTouchEvent(event);
    }
}
