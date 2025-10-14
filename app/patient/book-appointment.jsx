import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const BookingScreen = ({ navigation, route }) => {
  const { 
    doctorId,
    doctorName, 
    doctorSpecialty, 
    doctorPrice,
    doctorAvailability 
  } = useLocalSearchParams();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [notes, setNotes] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const doctor = {
    id: doctorId,
    name: doctorName,
    specialty: doctorSpecialty,
    price: doctorPrice,
    availability: doctorAvailability ? doctorAvailability.split('|') : []
  };

   const generateTimeSlots = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return doctor.availability;
    } else {
     const slots = [];
      for (let hour = 8; hour <= 16; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        slots.push(timeString);
      }
      return slots;
    }
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = e Diel, 6 = e Shtunë
  };

  useEffect(() => {
    if (isWeekend(selectedDate)) {
      setAvailableTimeSlots([]);
      setSelectedTime('');
    } else {
      const slots = generateTimeSlots(selectedDate);
      setAvailableTimeSlots(slots);
      setSelectedTime('');
    }
  }, [selectedDate]);

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
   const handleBooking = () => {
    if (!selectedTime || !patientName) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    if (isWeekend(selectedDate)) {
      Alert.alert('Weekend', 'Appointments are not available on weekends. Please select a weekday.');
      return;
    }

    Alert.alert('Appointment Booked!',
      `Your appointment with ${doctor.name} is confirmed for ${selectedDate.toDateString()} at ${selectedTime}`,
      [
        {
          text: 'OK',
          onPress: () => router.back() 
        }
      ]
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Doctor Info */}
        <View style={styles.doctorCard}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <Text style={styles.price}>{doctor.price} per consultation</Text>
        </View>
         {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color="#007AFF" />
            <Text style={styles.dateText}>
              {formatDate(selectedDate)}
            </Text>
          </TouchableOpacity>
          {isWeekend(selectedDate) && (
            <Text style={styles.warningText}>
              ⚠️ Appointments are not available on weekends
            </Text>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Select Time {isWeekend(selectedDate) ? '(Not Available)' : ''}
          </Text>
          {isWeekend(selectedDate) ? (
            <Text style={styles.noSlotsText}>
              No available time slots on weekends. Please select a weekday.
            </Text>
          ) : availableTimeSlots.length > 0 ? (
            <View style={styles.timeGrid}>
              {availableTimeSlots.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.noSlotsText}>
              No available time slots for selected date.
            </Text>
          )}
          <Text style={styles.availabilityInfo}>
            {selectedDate.toDateString() === new Date().toDateString() 
              ? "Today: Doctor's specific availability"
              : "Other days: Full availability from 08:00 to 16:00"
            }
          </Text>
        </View>

        {/* Patient Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={patientName}
            onChangeText={setPatientName}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Additional Notes (Optional)"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

         {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            (isWeekend(selectedDate) || !selectedTime || !patientName) && styles.disabledButton
          ]} 
          onPress={handleBooking}
          disabled={isWeekend(selectedDate) || !selectedTime || !patientName}
        >
          <Text style={styles.confirmButtonText}>
            {isWeekend(selectedDate) ? 'Weekend - Not Available' : 'Confirm Appointment'}
          </Text>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  doctorCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  section: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 12,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#333',
  marginBottom: 15,
},
dateButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  padding: 16,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e0e0e0',
},
dateText: {
  fontSize: 16,
  color: '#333',
  marginLeft: 10,
  fontWeight: '500',
},
warningText: {
  color: '#ff6b35',
  fontSize: 14,
  marginTop: 8,
  fontWeight: '500',
},
timeGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},
timeSlot: {
  width: '48%',
  backgroundColor: '#f8f9fa',
  padding: 16,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  marginBottom: 10,
  alignItems: 'center',
},
selectedTimeSlot: {
  backgroundColor: '#007AFF',
  borderColor: '#007AFF',
},
timeText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
},
selectedTimeText: {
  color: '#fff',
},
noSlotsText: {
  textAlign: 'center',
  color: '#666',
  fontStyle: 'italic',
  padding: 20,
},
availabilityInfo: {
  fontSize: 12,
  color: '#666',
  marginTop: 10,
  fontStyle: 'italic',
},
input: {
  backgroundColor: '#f8f9fa',
  padding: 16,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  marginBottom: 12,
  fontSize: 16,
},
textArea: {
  height: 80,
  textAlignVertical: 'top',
},
buttonContainer: {
  padding: 20,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderTopColor: '#e0e0e0',
},
confirmButton: {
  backgroundColor: '#28a745',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 16,
  borderRadius: 12,
  shadowColor: '#28a745',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
},
disabledButton: {
  backgroundColor: '#6c757d',
  shadowColor: '#6c757d',
},
confirmButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
  marginRight: 8,
},

});

export default BookingScreen;