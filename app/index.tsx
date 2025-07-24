import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Screens
import TabCalender from "./(tabs)/calender";
import TabMain from "./(tabs)/main";
import TabNews from "./(tabs)/news";
import TabProduct from "./(tabs)/product";

import Icon from 'react-native-vector-icons/Ionicons';

type ScreenKey = "main" | "news" | "product" | "calender";

const screenComponents: Record<ScreenKey, React.ComponentType> = {
  main: TabMain,
  news: TabNews,
  product: TabProduct,
  calender: TabCalender
};

const DRAWER_WIDTH = 240;

export default function Index() {
  const insets = useSafeAreaInsets();
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("main");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;


  const ActiveComponent = screenComponents[activeScreen];

  return (
    <View style={[styles.container]}>
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
      
      {/* Top Left Drawer Toggle Button */}
      <View style={{ flex: 1, paddingBottom: 80 }}>
        <ActiveComponent />
      </View>

      {/* Bottom Tab Bar */}
      <View style={[styles.tabBarContainer]}>
        <View style={styles.tabBar}>
          <TabButton
            iconName="home-outline"
            onPress={() => setActiveScreen("main")}
            active={activeScreen === "main"}
          />
          <TabButton
            iconName="cube-outline"
            onPress={() => setActiveScreen("product")}
            active={activeScreen === "product"}
          />
          <TabButton
            iconName="newspaper-outline"
            onPress={() => setActiveScreen("news")}
            active={activeScreen === "news"}
          />
          <TabButton
            iconName="calendar-outline"
            onPress={() => setActiveScreen("calender")}
            active={activeScreen === "calender"}
          />
        </View>
      </View>
    </View>
  );
}

function DrawerItem({ label, onPress, active }: { label: string; onPress: () => void; active: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.drawerItem, active && styles.drawerItemActive]}>
      <Text style={[styles.drawerItemText, active && styles.drawerItemTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
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

  drawerButton: {
    position: "absolute",
    left: 10,
    zIndex: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bar: {
    width: 24,
    height: 3,
    backgroundColor: "#333",
    marginVertical: 2,
    borderRadius: 1.5,
  },
  drawer: {
    position: "absolute",
    top: Platform.select({
      ios: -20,
      android: 40,
    }),    
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderColor: "#ddd",
    zIndex: 10,
  },
  drawerHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  drawerItemActive: {
    backgroundColor: "#007AFF22",
  },
  drawerItemText: {
    fontSize: 16,
    color: "#333",
  },
  drawerItemTextActive: {
    fontWeight: "600",
    color: "#007AFF",
  },
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: Platform.OS === 'ios' ? 5 : 5, // Add padding for iOS safe area
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
});