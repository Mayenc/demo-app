// TabNavigator.tsx

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
// import HomeScreen from '../(home)/home';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <></>
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     headerShown: true,
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName:
    //             | 'home'
    //             | 'home-outline'
    //             | 'cart'
    //             | 'cart-outline'
    //             | 'settings'
    //             | 'settings-outline' = 'home';

    //       if (route.name === 'Trang chủ') {
    //         iconName = focused ? 'home' : 'home-outline';
    //       } else if (route.name === 'Giỏ hàng') {
    //         iconName = focused ? 'cart' : 'cart-outline';
    //       } else if (route.name === 'Cài đặt') {
    //         iconName = focused ? 'settings' : 'settings-outline';
    //       }

    //       return <Ionicons name={iconName} size={size} color={color} />;
    //     },
    //     tabBarActiveTintColor: '#1e90ff',
    //     tabBarInactiveTintColor: 'gray',
    //   })}
    // >
    //   {/* <Tab.Screen name="Trang chủ" component={HomeScreen} />
    //   <Tab.Screen name="Giỏ hàng" component={HomeScreen}/>
    //   <Tab.Screen name="Cài đặt" component={HomeScreen} /> */}
    // </Tab.Navigator>
  );
}
