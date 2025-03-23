import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NotificationItemProps {
  type: "success" | "cancelled" | "changed";
  title: string;
  message: string;
  time: string;
}

// Định nghĩa các icon hợp lệ
type IconType = "calendar-outline" | "close-circle-outline" | "time-outline";

export default function NotificationItem({
  type,
  title,
  message,
  time,
}: NotificationItemProps) {
  // Hàm trả về icon tương ứng
  const getIconInfo = (): { icon: IconType; color: string } => {
    switch (type) {
      case "success":
        return { icon: "calendar-outline", color: "#A5D6A7" };
      case "cancelled":
        return { icon: "close-circle-outline", color: "#EF9A9A" };
      case "changed":
        return { icon: "time-outline", color: "#B0BEC5" };
      default:
        return { icon: "calendar-outline", color: "#90CAF9" };
    }
  };

  const { icon, color } = getIconInfo();

  return (
    <View style={styles.container}>
      {/* Icon bên trái */}
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={24}
          color="#fff"
        />
      </View>

      {/* Nội dung thông báo */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>

      {/* Thời gian */}
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  message: { fontSize: 14, color: "#777" },
  time: { fontSize: 12, color: "#999" },
});
