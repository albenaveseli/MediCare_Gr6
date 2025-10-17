import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from "../../components/Card";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import TimeSlots from "../../components/TimeSlots";

const BookingScreen = () => {
  const {
    doctorId,
    doctorName,
    doctorSpecialty,
    doctorPrice,
    doctorAvailability,
  } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
   const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const doctor = {
    id: doctorId,
    name: doctorName,
    specialty: doctorSpecialty,
    price: doctorPrice,
    availability: doctorAvailability ? doctorAvailability.split("|") : [],
  };

  const generateTimeSlots = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) return doctor.availability;
    const slots = [];
    for (let hour = 8; hour <= 16; hour++)
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    return slots;
  };

  const isWeekend = (date) => [0, 6].includes(date.getDay());

  useEffect(() => {
    if (isWeekend(selectedDate)) {
      setAvailableTimeSlots([]);
      setSelectedTime("");
    } else {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
      setSelectedTime("");
    }
  }, [selectedDate]);

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleBooking = () => {
    if (!selectedTime || !patientName)
      return Alert.alert("Error", "Please fill all required fields");
    if (isWeekend(selectedDate))
      return Alert.alert("Weekend", "Appointments not available on weekends");
    Alert.alert(
      "Appointment Booked!",
      `Your appointment with ${
        doctor.name
      } is confirmed for ${selectedDate.toDateString()} at ${selectedTime}`,
      [{ text: "OK", onPress: () => {
        setSelectedDate(new Date());
          setSelectedTime(null);
          setPatientName("");
          setNotes("");
          router.back();
      }, },]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Book Appointment" onBack={() => router.back()} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Doctor Info */}
        <Card style={styles.card}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <Text style={styles.price}>{doctor.price} per consultation</Text>
        </Card>

        {/* Date Selection */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color="#007ea7" />
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
          {isWeekend(selectedDate) && (
            <Text style={styles.warningText}>
              ⚠️ Appointments are not available on weekends
            </Text>
          )}
        </Card>

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
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>
            Select Time {isWeekend(selectedDate) ? "(Not Available)" : ""}
          </Text>
          {isWeekend(selectedDate) ? (
            <Text style={styles.noSlotsText}>
              No available time slots on weekends. Please select a weekday.
            </Text>
          ) : selectedDate.toDateString() === new Date().toDateString() ? (
            <View style={styles.timeGrid}>
               <TimeSlots
                slots={doctor.availability}
                selected={selectedTime}
                onSelect={setSelectedTime}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time" size={20} color="#007ea7" />
                <Text style={styles.dateText}>
                  {selectedTime ? selectedTime : "Select time (08:00 - 16:00)"}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  value={selectedDate}
                  display="spinner"
                  onChange={(e, date) => {
                    setShowTimePicker(false);
                    if (date) {
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                      if ((hours > 8 || (hours === 8 && minutes >= 0)) && 
                         (hours < 16 || (hours === 16 && minutes === 0))){
                        setSelectedTime(
                          `${hours.toString().padStart(2, "0")}:${minutes
                            .toString()
                            .padStart(2, "0")}`
                        );
                      }
                      else
                        Alert.alert(
                          "Invalid time",
                          "Please select a time between 08:00 and 16:00."
                        );
                    }
                  }}
                />
              )}
            </>
          )}
          <Text style={styles.availabilityInfo}>
            {selectedDate.toDateString() === new Date().toDateString()
              ? "Today: Doctor's specific availability"
              : "Other days: Full availability from 08:00 to 16:00"}
          </Text>
        </Card>

        {/* Patient Details */}
        <Card style={styles.card}>
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
        </Card>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
           <PrimaryButton
            title={isWeekend(selectedDate) ? "Weekend - Not Available" : "Confirm Appointment"}
            onPress={handleBooking}
            disabled={isWeekend(selectedDate) || !selectedTime || !patientName}
            icon={() => <Ionicons name="checkmark-circle" size={24} color="#fff" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8" },
  content: { flex: 1, padding: 16 },
  card: {
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: "#007ea7",
    fontWeight: "600",
    marginBottom: 6,
  },
  price: { fontSize: 16, color: "#666", fontWeight: "500" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dateText: { fontSize: 16, color: "#333", marginLeft: 10, fontWeight: "500" },
  warningText: {
    color: "#ff6b35",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  noSlotsText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    padding: 20,
  },
  availabilityInfo: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    fontStyle: "italic",
  },
  input: {
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  buttonContainer: { padding: 20, backgroundColor: "#e8f6f8" },
});

export default BookingScreen;
