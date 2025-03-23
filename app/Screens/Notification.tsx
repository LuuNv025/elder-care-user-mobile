import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NotificationItem from "../../components/NotificationItem";
import { useRouter } from "expo-router";

type NotificationType = "success" | "cancelled" | "changed";

interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
}

const notifications: NotificationData[] = [
  {
    id: "1",
    type: "success",
    title: "Appointment Success",
    message:
      "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "1h",
  },
  {
    id: "2",
    type: "cancelled",
    title: "Appointment Cancelled",
    message:
      "You have successfully cancelled your appointment with Dr. David Patel.",
    time: "2h",
  },
  {
    id: "3",
    type: "changed",
    title: "Scheduled Changed",
    message:
      "You have successfully changed your appointment with Dr. Jesica Turner.",
    time: "8h",
  },
  {
    id: "4",
    type: "success",
    title: "Appointment Success",
    message:
      "You have successfully booked your appointment with Dr. David Patel.",
    time: "1d",
  },
];


export default function Notification() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.newBadge}>
          <Text style={styles.newText}>1 New</Text>
        </View>
      </View>

      {/* Section: Today */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>TODAY</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem {...item} />}
      />

      {/* Section: Yesterday */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>YESTERDAY</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications.slice(3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerTitle: { fontSize: 25, fontWeight: "bold", color: "#28A745" },
  newBadge: {
    backgroundColor: "#4F6D7A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  newText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#888" 
},
  markRead: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#4F6D7A" },
});
