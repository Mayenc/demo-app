import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const menuItems = [
  { id: '1', label: 'Trang chủ', icon: 'home-outline', route: '/(home)/home' },
  { id: '2', label: 'Thông báo', icon: 'notifications-outline', route: '/notifications' },
  { id: '3', label: 'Tài khoản', icon: 'person-outline', route: '/account' },
  { id: '4', label: 'Cài đặt', icon: 'settings-outline', route: '/settings' },
  { id: '5', label: 'Hỗ trợ', icon: 'help-circle-outline', route: '/support' },
  { id: '6', label: 'Khác', icon: 'ellipsis-horizontal-circle-outline', route: '(car)/video' },
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;

export default function GridMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.menuItem, { width: itemWidth }]}
          onPress={() => router.push(item.route as any)}
        >
          <Ionicons name={item.icon as any} size={30} color="#333" style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    marginTop: 50,
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
