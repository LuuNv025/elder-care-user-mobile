import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const Header = () => {
  return (
    <View style={styles.headerContainer as any}>
      <Text style={styles.logo}>ElderCare</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/Screens/(Tabs)/Notification")}>
          <FontAwesome name="bell" size={20} color="#28A745" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="comment" size={20} color="#28A745" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#2b7a45",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28A745",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
  },
});

export default Header;
