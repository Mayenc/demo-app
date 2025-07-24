import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function IndexScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const handleFocus = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      alert('Thiết bị không hỗ trợ đăng nhập sinh trắc học');
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      alert('Chưa cài đặt vân tay/khuôn mặt trên thiết bị');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Xác thực bằng vân tay/khuôn mặt',
      fallbackLabel: 'Nhập mật khẩu',
    });

    if (result.success) {
      // Xác thực thành công, chuyển trang
      router.replace('/(home)/menu');
    } else {
      alert('Xác thực thất bại');
    }
  };

  const handleLogin = () => {
    //router.replace('/(test)/webview');
    router.replace('/(home)/menu');
    // if(username.trim().toLowerCase() === 'tructd' && password === '123456'){
    //   router.replace('/(home)/home');
    // }
    // else{
    //    alert('Đăng nhập thất bại')
    // }
  };
  const image = require('../assets/images/imageBackground.png');
  return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Image
              style={styles.imageTop}
              source={image}
              resizeMode="cover"
            />
            <View style={styles.formLogin}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập số điện thoại hoặc email"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập mật khẩu"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword} 
                  style={styles.input}
                />
                <TouchableOpacity onPress={togglePassword} style={styles.icon}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBiometricAuth} style={styles.biometricIcon}>
                  <MaterialCommunityIcons name="face-recognition" size={32} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  loginButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginRight: 12, // tạo khoảng cách với icon
  },

  buttonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword:{
    color: 'blue',
    alignSelf: 'flex-end'
  },
  formLogin: {
    padding: 24,
    marginBottom: 100
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  icon: {
    paddingHorizontal: 4,
  },
  imageTop:{
    height: '60%', 
    width: '100%',
  },
  biometricIcon: {
    padding: 4,
  }
});