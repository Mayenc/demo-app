import { Ionicons } from "@expo/vector-icons";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabProduct() {
  const phoneNumber = '0123456789'; 

  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.chatButton} onPress={makeCall}>
            <Ionicons name="call" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
    )
    
}
const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#28a745', 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});