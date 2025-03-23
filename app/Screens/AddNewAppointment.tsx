import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Doctor specialties available for selection
const specialties = [
  'General Practitioner',
  'Cardiologist',
  'Neurologist',
  'Dermatologist',
  'Orthopedic',
  'Physical Therapist',
  'Nutritionist'
];

// Available time slots
const timeSlots = [
  '9:00 AM', 
  '10:00 AM', 
  '11:00 AM', 
  '1:00 PM', 
  '2:00 PM', 
  '3:00 PM', 
  '4:00 PM'
];

const AddNewAppointment = () => {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Function to handle form submission
  const handleSubmit = () => {
    console.log({
      specialty: selectedSpecialty,
      date: selectedDate,
      time: selectedTime,
      notes,
    });
    
    // Navigate back to appointments screen
    router.back();
  };
  
  // Function to go to next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Function to go to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  // Format the current date as a string (e.g., "Friday, July 21, 2023")
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={prevStep} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Appointment</Text>
          <View style={styles.emptyView} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(currentStep / 3) * 100}%` }]} />
          </View>
          <Text style={styles.stepText}>Step {currentStep} of 3</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Step 1: Select Specialty */}
          {currentStep === 1 && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Select Specialty</Text>
              <Text style={styles.stepDescription}>
                Choose the type of healthcare professional you need
              </Text>

              <View style={styles.optionsContainer}>
                {specialties.map((specialty) => (
                  <TouchableOpacity
                    key={specialty}
                    style={[
                      styles.specialtyOption,
                      selectedSpecialty === specialty && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedSpecialty(specialty)}
                  >
                    <Text
                      style={[
                        styles.specialtyText,
                        selectedSpecialty === specialty && styles.selectedOptionText,
                      ]}
                    >
                      {specialty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Step 2: Select Date */}
          {currentStep === 2 && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Select Date</Text>
              <Text style={styles.stepDescription}>
                Choose a date for your appointment
              </Text>

              <Text style={styles.currentDate}>{formatDate()}</Text>

              {/* Here would normally be a date picker component */}
              {/* For simplicity, we'll use a text input */}
              <View style={styles.dateInputContainer}>
                <Ionicons name="calendar-outline" size={24} color="#28A745" />
                <TextInput
                  style={styles.dateInput}
                  placeholder="Select date (MM/DD/YYYY)"
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                />
              </View>

              <Text style={styles.sectionTitle}>Available Time Slots</Text>
              <View style={styles.timeSlotContainer}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.selectedTimeSlot,
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        selectedTime === time && styles.selectedTimeSlotText,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Step 3: Additional Info */}
          {currentStep === 3 && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Additional Information</Text>
              <Text style={styles.stepDescription}>
                Provide any additional notes for the healthcare provider
              </Text>

              <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Specialty:</Text>
                  <Text style={styles.summaryValue}>{selectedSpecialty}</Text>
                </View>
                
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Date:</Text>
                  <Text style={styles.summaryValue}>{selectedDate}</Text>
                </View>
                
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Time:</Text>
                  <Text style={styles.summaryValue}>{selectedTime}</Text>
                </View>
              </View>

              <Text style={styles.notesLabel}>Notes (Optional)</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Enter any symptoms, questions, or information you want to share"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          )}
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={currentStep < 3 ? nextStep : handleSubmit}
          >
            <Text style={styles.buttonText}>
              {currentStep < 3 ? 'Continue' : 'Book Appointment'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNewAppointment;

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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 5,
  },
  emptyView: {
    width: 24,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#28A745',
  },
  stepText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  optionsContainer: {
    marginTop: 10,
  },
  specialtyOption: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#28A745',
    backgroundColor: '#e6f7eb',
  },
  specialtyText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  currentDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 24,
  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '48%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  selectedTimeSlot: {
    borderColor: '#28A745',
    backgroundColor: '#e6f7eb',
  },
  timeSlotText: {
    fontSize: 15,
    color: '#333',
  },
  selectedTimeSlotText: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 15,
    height: 120,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 