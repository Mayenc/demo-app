// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import 'react-native-reanimated';


// import { useColorScheme } from '@/hooks/useColorScheme';
// import { useState } from 'react';
// import { StatusBar, StatusBarStyle, StyleSheet } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const STYLES = ['default', 'dark-content', 'light-content'] as const;
// const TRANSITIONS = ['fade', 'slide', 'none'] as const;
// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [hidden, setHidden] = useState(false);
//   const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
//     STYLES[0],
//   );
//   const [statusBarTransition, setStatusBarTransition] = useState<
//     'fade' | 'slide' | 'none'
//   >(TRANSITIONS[0]);

//   const changeStatusBarVisibility = () => setHidden(!hidden);

//   const changeStatusBarStyle = () => {
//     const styleId = STYLES.indexOf(statusBarStyle) + 1;
//     if (styleId === STYLES.length) {
//       setStatusBarStyle(STYLES[0]);
//     } else {
//       setStatusBarStyle(STYLES[styleId]);
//     }
//   };

//   const changeStatusBarTransition = () => {
//     const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
//     if (transition === TRANSITIONS.length) {
//       setStatusBarTransition(TRANSITIONS[0]);
//     } else {
//       setStatusBarTransition(TRANSITIONS[transition]);
//     }
//   };
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <SafeAreaView style={styles.container}>
//           <StatusBar
//             animated={true}
//             backgroundColor="#61dafb"
//             barStyle={statusBarStyle}
//             showHideTransition={statusBarTransition}
//             hidden={hidden}
//           />
//           <Stack screenOptions={
//               {
//                 headerShown: false
//               }
//             }/>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>

//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   text: {
//     fontSize: 25,
//     fontWeight: '500',
//   },
//   buttonsContainer: {
//     padding: 10,
//   },
//   textStyle: {
//     textAlign: 'center',
//     marginBottom: 8,
//   },
// });

// app/_layout.tsx
import { Stack } from 'expo-router';
export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
  );
}




// //Version 2
// import { useFonts } from 'expo-font';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useRef, useState } from 'react';
// import { Animated, Image, Platform, StatusBar, StatusBarStyle, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// // Screens
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import TabCalender from "./(tabs)/calender";
// import TabMain from "./(tabs)/main";
// import TabMyVehicle from "./(tabs)/myvehicle";
// import TabNews from "./(tabs)/news";
// import TabProduct from "./(tabs)/product";

// type ScreenKey = "main" | "news" | "product" | "calender" | "myvehicle";

// const screenComponents: Record<ScreenKey, React.ComponentType> = {
//   main: TabMain,
//   news: TabNews,
//   product: TabProduct,
//   calender: TabCalender,
//   myvehicle: TabMyVehicle,
// };

// function TabButton({
//   iconName,
//   onPress,
//   active,
// }: {
//   iconName: string;
//   onPress: () => void;
//   active: boolean;
// }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         styles.tabButton,
//         active && styles.tabButtonActive,
//       ]}
//     >
//       <Icon
//         name={iconName}
//         size={24}
//         color={active ? "#011e50" : "#ccc"}
//       />
//     </TouchableOpacity>
//   );
// }
// const STYLES = ['default', 'dark-content', 'light-content'] as const;
// const TRANSITIONS = ['fade', 'slide', 'none'] as const;
// const DRAWER_WIDTH = 240;
// export default function Layout() {
//   const colorScheme = useColorScheme();
//   const [hidden, setHidden] = useState(false);
//   const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
//     STYLES[0],
//   );
//   const [statusBarTransition, setStatusBarTransition] = useState<
//     'fade' | 'slide' | 'none'
//   >(TRANSITIONS[0]);

//   const changeStatusBarVisibility = () => setHidden(!hidden);

//   const changeStatusBarStyle = () => {
//     const styleId = STYLES.indexOf(statusBarStyle) + 1;
//     if (styleId === STYLES.length) {
//       setStatusBarStyle(STYLES[0]);
//     } else {
//       setStatusBarStyle(STYLES[styleId]);
//     }
//   };

//   const changeStatusBarTransition = () => {
//     const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
//     if (transition === TRANSITIONS.length) {
//       setStatusBarTransition(TRANSITIONS[0]);
//     } else {
//       setStatusBarTransition(TRANSITIONS[transition]);
//     }
//   };
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

  
//   const insets = useSafeAreaInsets();
//   const [activeScreen, setActiveScreen] = useState<ScreenKey>("main");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   const ActiveComponent = screenComponents[activeScreen];
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//        <SafeAreaProvider>
//          <SafeAreaView style={styles.container}>
//            <StatusBar
//              animated={true}
//              backgroundColor="#61dafb"
//              barStyle={statusBarStyle}
//              showHideTransition={statusBarTransition}
//              hidden={hidden}
//            />
//           <View style={styles.container}>
//             {/* Header */}
//           <LinearGradient
//             colors={['#ffffff', '#5a96cb']}
//             locations={[0.3, 0.8]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.headerContainer}
//           >
//             <View style={styles.headerContent}>
//               {/* Left Icon */}
//               <TouchableOpacity onPress={() => console.log("Left icon pressed")}>
//                 <Image
//                   source={require('../assets/images/logo.png')} // or use a remote URL
//                   style={{ width: 30, height: 30 }} // match icon size & color
//                   resizeMode="contain"
//                 />
//               </TouchableOpacity>

//               {/* Right Icons */}
//               <View style={styles.headerRight}>
//                 <TouchableOpacity onPress={() => console.log("Bell pressed")} style={styles.iconSpacing}>
//                   <Icon name="notifications-outline" size={24} color="#fff" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => console.log("Other icon pressed")}>
//                   <Icon name="person-circle-outline" size={24} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </LinearGradient>

//             {/* Content */}
//             <View style={{ flex: 1, paddingBottom: 80 }}>
//               <ActiveComponent />
//             </View>

//             {/* Tab Bar */}
//             <View style={styles.tabBarContainer}>
//               <View style={styles.tabBar}>
//               <TabButton
//                 iconName="car-outline"
//                 onPress={() => setActiveScreen("myvehicle")}
//                 active={activeScreen === "myvehicle"}
//               />

//               <TabButton
//                 iconName="cube-outline"
//                 onPress={() => setActiveScreen("product")}
//                 active={activeScreen === "product"}
//               />
//               <TabButton
//                 iconName="home-outline"
//                 onPress={() => setActiveScreen("main")}
//                 active={activeScreen === "main"}
//               />
//               <TabButton
//                 iconName="newspaper-outline"
//                 onPress={() => setActiveScreen("news")}
//                 active={activeScreen === "news"}
//               />
//               <TabButton
//                 iconName="calendar-outline"
//                 onPress={() => setActiveScreen("calender")}
//                 active={activeScreen === "calender"}
//               />
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   headerContainer: { height: 60, justifyContent: 'center', paddingHorizontal: 20 },
//   tabBarContainer: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     paddingBottom: Platform.OS === 'ios' ? 5 : 5,
//     paddingTop: 10,
//     backgroundColor: 'transparent',
//     zIndex: 20,
//   },
//   tabBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "#011e50",
//     borderRadius: 30,
//     paddingVertical: 12,
//     marginHorizontal: 20,
//     elevation: 6,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//   },
//   tabButton: {
//     padding: 10,
//     borderRadius: 25,
//   },
//   tabButtonActive: {
//     backgroundColor: "#ffffff",
//   },
//   tabText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   tabTextActive: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: '100%',
//   },
  
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
  
//   iconSpacing: {
//     marginRight: 15,
//   },
// });
