import React, { useCallback, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { WebView } from "react-native-webview"

const App = () => {
    const [loadingPage, setLoadingPage] = useState(false)

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <!-- Jquery -->
        <script src="https://worldchatbox.worldfone.vn/assets/js/widget_mobile.js"></script>
        <!-- // Jquery -->

      </head>
      <body>
        <script>
          window.oscWidget.init({
            token: "6881e1a1eb8670c38a8eb75d",
          });
          (function() {
            const interval = setInterval(function() {
              if (!window.oscWidget.isOpen()) {
                window.ReactNativeWebView.postMessage('hello');
                window.oscWidget.open();
              } else {
                window.ReactNativeWebView.postMessage('opened');
                clearInterval(interval);
              }
            }, 1000); // Kiểm tra mỗi giây

            // Dừng interval sau 5 giây nếu chưa mở được
            setTimeout(function() {
              if (!window.oscWidget.isOpen()) {
                window.ReactNativeWebView.postMessage('error');
              } else {
                window.ReactNativeWebView.postMessage('done');
              }
              clearInterval(interval);
            }, 5000);
          })();
        </script>
      </body>
    </html>
  `

    const handleLoadStart = useCallback(() => {
        setLoadingPage(true)
    }, [])

    const handleLoadEnd = useCallback(() => {
        setLoadingPage(false)
    }, [])

    const handleMessage = useCallback((event: any) => {
        console.log(event.nativeEvent.data)
        if (event.nativeEvent.data === "error") {
            setLoadingPage(false)
        }
    }, [])

    return (
        <View style={styles.container}>
            {loadingPage && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
            <WebView
                source={{ html: html, baseUrl: "https://omnisales.worldfone.vn" }}
                originWhitelist={["*"]}
                style={styles.webView}
                onLoadStart={handleLoadStart}
                onLoadEnd={handleLoadEnd}
                onMessage={handleMessage}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#aaa" />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    webView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default App
