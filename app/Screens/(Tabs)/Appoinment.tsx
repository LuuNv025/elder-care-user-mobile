import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  Image 
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Simulated appointment data
const appointmentData = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'General Practitioner',
    date: 'Today, 15 July',
    time: '10:00 AM',
    status: 'upcoming',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    date: 'Tomorrow, 16 July',
    time: '2:30 PM',
    status: 'upcoming',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Wilson',
    specialty: 'Neurologist',
    date: '20 July 2023',
    time: '9:15 AM',
    status: 'upcoming',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '4',
    doctorName: 'Dr. Robert Davis',
    specialty: 'Physical Therapist',
    date: '10 July 2023',
    time: '11:30 AM',
    status: 'completed',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: '5',
    doctorName: 'Dr. Lisa Wong',
    specialty: 'Nutritionist',
    date: '5 July 2023',
    time: '4:45 PM',
    status: 'completed',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
];

// Day tabs for calendar
const days = [
  { day: 'Mon', date: '14', isToday: false, available: true },
  { day: 'Tue', date: '15', isToday: true, available: true },
  { day: 'Wed', date: '16', isToday: false, available: true },
  { day: 'Thu', date: '17', isToday: false, available: true },
  { day: 'Fri', date: '18', isToday: false, available: false },
  { day: 'Sat', date: '19', isToday: false, available: true },
  { day: 'Sun', date: '20', isToday: false, available: false },
];

const Appointment = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [selectedDay, setSelectedDay] = useState('15');

  const filteredAppointments = appointmentData.filter(
    appointment => appointment.status === activeFilter
  );

  // Function to navigate to AddNewAppointment screen
  const navigateToAddNewAppointment = () => {
    router.push('/screens/AddNewAppointment');
  };

  const renderAppointmentCard = ({ item }) => (
    <TouchableOpacity style={styles.appointmentCard}>
      {/* Card Header with Doctor Image and Info */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.image }} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{item.doctorName}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
      </View>

      {/* Card Body with Date, Time and Status */}
      <View style={styles.cardBody}>
        <View style={styles.appointmentDetail}>
          <Ionicons name="calendar-outline" size={20} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.appointmentDetail}>
          <Ionicons name="time-outline" size={20} color="#666" style={styles.detailIcon} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
      </View>

      {/* Card Footer with Actions */}
      <View style={styles.cardFooter}>
        {activeFilter === 'upcoming' ? (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
              <Text style={styles.rescheduleButtonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.bookAgainButton]}>
              <Text style={styles.bookAgainButtonText}>Book Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.reviewButton]}>
              <Text style={styles.reviewButtonText}>Leave Review</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddNewAppointment}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>July 2023</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
          {days.map((day) => (
            <TouchableOpacity
              key={day.date}
              style={[
                styles.dayItem,
                selectedDay === day.date && styles.selectedDayItem,
                !day.available && styles.unavailableDayItem,
              ]}
              onPress={() => day.available && setSelectedDay(day.date)}
              disabled={!day.available}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day.date && styles.selectedDayText,
                  !day.available && styles.unavailableDayText,
                ]}
              >
                {day.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDay === day.date && styles.selectedDayText,
                  !day.available && styles.unavailableDayText,
                ]}
              >
                {day.date}
              </Text>
              {day.isToday && <View style={styles.todayIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'upcoming' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('upcoming')}
        >
          <Text
            style={[styles.filterText, activeFilter === 'upcoming' && styles.activeFilterText]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'completed' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('completed')}
        >
          <Text
            style={[styles.filterText, activeFilter === 'completed' && styles.activeFilterText]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointment List */}
      {filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments}
          renderItem={renderAppointmentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.appointmentList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="calendar-outline" size={60} color="#ccc" />
          <Text style={styles.emptyStateText}>No {activeFilter} appointments</Text>
          {activeFilter === 'upcoming' && (
            <TouchableOpacity 
              style={styles.bookAppointmentButton}
              onPress={navigateToAddNewAppointment}
            >
              <Text style={styles.bookAppointmentButtonText}>Book New Appointment</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#28A745',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Calendar Styles
  calendarContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  daysContainer: {
    paddingHorizontal: 15,
  },
  dayItem: {
    width: 50,
    height: 75,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
  },
  selectedDayItem: {
    backgroundColor: '#28A745',
  },
  unavailableDayItem: {
    backgroundColor: '#f5f5f5',
    opacity: 0.5,
  },
  dayText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDayText: {
    color: 'white',
  },
  unavailableDayText: {
    color: '#999',
  },
  todayIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#28A745',
    position: 'absolute',
    bottom: 10,
  },
  
  // Filter Tabs
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterTab: {
    borderBottomColor: '#28A745',
  },
  filterText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#28A745',
    fontWeight: '600',
  },
  
  // Appointment List & Cards
  appointmentList: {
    padding: 15,
    paddingBottom: 30,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    marginBottom: 12,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  rescheduleButton: {
    backgroundColor: '#e6f7eb',
  },
  rescheduleButtonText: {
    color: '#28A745',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#ffebee',
  },
  cancelButtonText: {
    color: '#f44336',
    fontWeight: '600',
  },
  bookAgainButton: {
    backgroundColor: '#e6f7eb',
  },
  bookAgainButtonText: {
    color: '#28A745',
    fontWeight: '600',
  },
  reviewButton: {
    backgroundColor: '#e3f2fd',
  },
  reviewButtonText: {
    color: '#2196f3',
    fontWeight: '600',
  },
  
  // Empty State
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
    marginBottom: 20,
  },
  bookAppointmentButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookAppointmentButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});