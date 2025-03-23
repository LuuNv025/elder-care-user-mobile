import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import BookingCard from "../../../components/BookingCard";

const appointments = [
  {
    id: "1",
    doctor: "Dr. James Robinson",
    specialty: "Orthopedic Surgery",
    clinic: "Elite Ortho Clinic, USA",
    date: "May 22, 2023 - 10:00 AM",
    status: "Upcoming",
    image: "../../../assets/images/test1.jpeg",
  },
  {
    id: "2",
    doctor: "Dr. Daniel Lee",
    specialty: "Gastroenterologist",
    clinic: "Digestive Institute, USA",
    date: "June 14, 2023 - 03:00 PM",
    status: "Completed",
    image: "../../../assets/images/test1.jpeg",
  },
  {
    id: "3",
    doctor: "Dr. Nathan Harris",
    specialty: "Cardiologist",
    clinic: "Heart Care Center, USA",
    date: "July 10, 2023 - 09:00 AM",
    status: "Canceled",
    image: "../../../assets/images/test1.jpeg",
  },
];

export default function BookingsScreen() {
  const [selectedTab, setSelectedTab] = useState("Upcoming");

  const filteredAppointments = appointments.filter(
    (item) => item.status === selectedTab
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["Upcoming", "Completed", "Canceled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Booking List */}
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookingCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#28A745",
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#28A745",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
});
