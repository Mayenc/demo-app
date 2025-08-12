import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Linking, Animated, Image, Platform, StatusBar, StatusBarStyle, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Screens
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


function TabButton({
  iconName,
  onPress,
  active,
}: {
  iconName: string;
  onPress: () => void;
  active: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tabButton,
        active && styles.tabButtonActive,
      ]}
    >
      <Icon
        name={iconName}
        size={24}
        color={active ? "#011e50" : "#ccc"}
      />
    </TouchableOpacity>
  );
}
const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;
const DRAWER_WIDTH = 240;
export default function RootUI({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [activeScreen, setActiveScreen] = useState("main");
  const colorScheme = useColorScheme();
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );
  const [statusBarTransition, setStatusBarTransition] = useState<
    'fade' | 'slide' | 'none'
  >(TRANSITIONS[0]);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const phoneNumber = '0123456789'; 

  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  
  const insets = useSafeAreaInsets();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const pathname = usePathname(); // Lấy route hiện tại để set active
  const getActive = (route: string) => pathname.startsWith(route);

  //Code for Fab Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current; // 0 = closed, 1 = open

  const toggleMenu = () => {
    Animated.spring(menuAnim, {
      toValue: menuOpen ? 0 : 1,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const menuHeight = 300;
  const menuTranslate = menuAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0], // move up when opening
  });

  const menuOpacity = menuAnim;

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <SafeAreaProvider>
         <SafeAreaView style={styles.container}>
           <StatusBar
             animated={true}
             backgroundColor="#61dafb"
             barStyle={statusBarStyle}
             showHideTransition={statusBarTransition}
             hidden={hidden}
           />
          <View style={styles.container}>
            {/* Header */}
          <LinearGradient
            colors={['#ffffff', '#5a96cb']}
            locations={[0.3, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerContainer}
          >
            <View style={styles.headerContent}>
              {/* Left Icon */}
              <TouchableOpacity onPress={() => console.log("Left icon pressed")}>
                <Image
                  source={require('../assets/images/logo.png')} // or use a remote URL
                  style={{ width: 30, height: 30 }} // match icon size & color
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Right Icons */}
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => console.log("Bell pressed")} style={styles.iconSpacing}>
                  <Icon name="notifications-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Other icon pressed")}>
                  <Icon name="person-circle-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

            {/* Content */}
            <View style={{ flex: 1, paddingBottom: 80 }}>
              {children}
            </View>

            {/* FLOATING ACTION BUTTON MENU */}
            <View style={[styles.fabContainer, {display: "flex", justifyContent: "center"}]} pointerEvents="box-none">
              <Animated.View
                style={[
                  styles.menuContainer,
                  {
                    borderRadius: styles.fabButton.borderRadius,
                    width: styles.fabButton.width,
                    transform: [{ translateY: menuTranslate }],
                    opacity: menuOpacity,
                    paddingBottom: styles.fabButton.width
                  },
                ]}
              >
                <TouchableOpacity style={styles.menuItem} onPress={makeCall}>
                  <Icon name="call-outline" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => alert("Press car")}>
                  <Icon name="car-outline" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => alert("Press chat")}>
                  <Icon name="chatbox-ellipses-outline" size={22} color="#fff" />
                </TouchableOpacity>
              </Animated.View>

              <TouchableOpacity 
                style={[
                  styles.fabButton,
                  { backgroundColor: menuOpen ? "white" : "#011e50" }
                ]}
                onPress={toggleMenu}>
                <Icon name={"headset-outline"} size={28} style={{ color: !menuOpen ? "white" : "#011e50" }} />
              </TouchableOpacity>
            </View>

            {/* Tab Bar */}
            <View style={styles.tabBarContainer}>
              <View style={styles.tabBar}>
              <TabButton
                iconName="car-outline"
                onPress={() => router.replace('/(tabs)/myvehicle')}
                active={getActive('/myvehicle')}
              />

              <TabButton
                iconName="cube-outline"
                onPress={() => router.replace('/(tabs)/product')}
                active={getActive('/product')}
              />
              <TabButton
                iconName="home-outline"
                onPress={() => router.replace('/(tabs)/main')}
                active={getActive('/main')}
              />
              <TabButton
                iconName="newspaper-outline"
                onPress={() => router.replace('/(tabs)/news')}
                active={getActive('/news')}
              />
              <TabButton
                iconName="calendar-outline"
                onPress={() => router.replace('/(tabs)/calender')}
                active={getActive('/calender')}
              />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: { height: 60, justifyContent: 'center', paddingHorizontal: 20 },
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Platform.OS === 'ios' ? 5 : 5,
    paddingTop: 10,
    backgroundColor: 'transparent',
    zIndex: 20,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#011e50",
    borderRadius: 30,
    paddingVertical: 12,
    marginHorizontal: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  tabButton: {
    padding: 10,
    borderRadius: 25,
  },
  tabButtonActive: {
    backgroundColor: "#ffffff",
  },
  tabText: {
    fontSize: 14,
    color: "#333",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  iconSpacing: {
    marginRight: 15,
  },

  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 80, // above the tab bar
    alignItems: "flex-end",
    zIndex: 30,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderWidth: 6,
    borderColor: "#011e50",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  menuContainer: {
    marginBottom: -56,
    backgroundColor: "#011e50",
    borderRadius: 10,
    paddingVertical: 8,
    width: 150,
  },

  menuItem: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },
});
