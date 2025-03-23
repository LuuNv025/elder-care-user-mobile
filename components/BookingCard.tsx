import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface BookingCardProps {
  item: {
    id: string;
    doctor: string;
    specialty: string;
    clinic: string;
    date: string;
    image: string;
  };
}

export default function BookingCard({ item }: BookingCardProps) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.doctor}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
        <Text style={styles.clinic}>{item.clinic}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rescheduleButton}
            // onPress={() =>
            //   router.push({
            //     // pathname: "/bookings/[id]",
            //     params: { id: item.id },
            //   })
            // }
          >
            <Text style={styles.buttonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  specialty: { fontSize: 14, color: "gray" },
  clinic: { fontSize: 12, color: "#555" },
  date: { fontSize: 12, color: "#333", marginTop: 5 },
  buttonContainer: { flexDirection: "row", marginTop: 10 },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: "#28A745",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
