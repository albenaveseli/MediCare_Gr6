import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

const BookingScreen = () => {
  const {
    doctorId,
    doctorName,
    doctorSpecialty,
    doctorPrice,
    doctorAvailability,
  } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
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
      [{ text: "OK", onPress: () => router.back() }]
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
        <View style={styles.card}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <Text style={styles.price}>{doctor.price} per consultation</Text>
        </View>

        {/* Date Selection */}
        <View style={styles.card}>
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
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Select Time {isWeekend(selectedDate) ? "(Not Available)" : ""}
          </Text>
          {isWeekend(selectedDate) ? (
            <Text style={styles.noSlotsText}>
              No available time slots on weekends. Please select a weekday.
            </Text>
          ) : selectedDate.toDateString() === new Date().toDateString() ? (
            <View style={styles.timeGrid}>
              {doctor.availability.map((time, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
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
                      if (hours >= 8 && hours <= 16)
                        setSelectedTime(
                          `${hours.toString().padStart(2, "0")}:${minutes
                            .toString()
                            .padStart(2, "0")}`
                        );
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
        </View>

        {/* Patient Details */}
        <View style={styles.card}>
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
              (isWeekend(selectedDate) || !selectedTime || !patientName) &&
                styles.disabledButton,
            ]}
            onPress={handleBooking}
            disabled={isWeekend(selectedDate) || !selectedTime || !patientName}
          >
            <Text style={styles.confirmButtonText}>
              {isWeekend(selectedDate)
                ? "Weekend - Not Available"
                : "Confirm Appointment"}
            </Text>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#e8f6f8",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#007ea7" },
  content: { flex: 1, padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
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
  timeSlot: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 10,
    alignItems: "center",
  },
  selectedTimeSlot: { backgroundColor: "#007ea7", borderColor: "#007ea7" },
  timeText: { fontSize: 14, fontWeight: "600", color: "#333" },
  selectedTimeText: { color: "#fff" },
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
  confirmButton: {
    backgroundColor: "#007ea7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: { backgroundColor: "#6c757d", shadowColor: "#6c757d" },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
});

export default BookingScreen;
