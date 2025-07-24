import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://tuoitre.vn/anh-giang-loc-xoay-quet-qua-trong-vai-phut-lam-19-can-nha-thiet-hai-nang-20250723140203897.htm' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
