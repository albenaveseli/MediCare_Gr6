import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from "../../components/Card";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import TimeSlots from "../../components/TimeSlots";
import { db } from "../firebase";

export default function BookingScreen(){
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

  useEffect(() => {
  const fetchPatientName = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPatientName(data.fullName);
      }
    } catch (err) {
      console.error("Error fetching user full name:", err);
    }
  };

  fetchPatientName();
}, []);


  const doctor = {
    id: doctorId,
    name: doctorName,
    specialty: doctorSpecialty,
    price: doctorPrice,
    availability: doctorAvailability ? doctorAvailability.split("|") : [],
  };

const generateTimeSlots = async (date) => {
  const slots = [];
  for (let hour = 8; hour <= 15; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  slots.push("16:00");
  return slots;
};
const filterAvailableSlots = async (date) => {
  let allSlots = await generateTimeSlots(date);
  if (date.toDateString() === new Date().toDateString()) {
    const now = new Date();
    allSlots = allSlots.filter((slot) => {
      const [h, m] = slot.split(":").map(Number);
      const slotDate = new Date();
      slotDate.setHours(h, m, 0, 0);
      return slotDate >= now; 
    });
  }

  const appointmentsRef = collection(db, "appointments");
  const q = query(
    appointmentsRef,
    where("doctorId", "==", doctor.id),
    where("date", "==", date.toDateString())
  );
  const snapshot = await getDocs(q);
  const bookedSlots = snapshot.docs.map((doc) => doc.data().time);
  const availableSlots = allSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );
  setAvailableTimeSlots(availableSlots);
};

  const isWeekend = (date) => [0, 6].includes(date.getDay());

useEffect(() => {
  if (isWeekend(selectedDate)) {
    setAvailableTimeSlots([]);
    setSelectedTime(null);
  } else {
    filterAvailableSlots(selectedDate);
    setSelectedTime(null);
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

  const handleBooking = async () => {
    if (isWeekend(selectedDate))
      return Alert.alert("Weekend", "Appointments not available on weekends");
 try {
    const user = getAuth().currentUser;
    if (!user) return Alert.alert("Error", "You must be logged in to book.");
    const appointmentsRef = collection(db, "appointments");
  const q = query(
    appointmentsRef,
    where("doctorId", "==", doctor.id),
    where("date", "==", selectedDate.toDateString()),
    where("time", "==", selectedTime)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return Alert.alert("Time slot taken", "Please select another time slot.");
  }
  const q2 = query(
    appointmentsRef,
    where("patientId", "==", user.uid),
    where("doctorId", "==", doctor.id),
    where("date", "==", selectedDate.toDateString())
  );

  const patientAppointments = await getDocs(q2);

  if (!patientAppointments.empty) {
    return Alert.alert(
      "Limit reached",
      "You already booked an appointment with this doctor for this day."
    );
  }
const q3 = query(
    appointmentsRef,
    where("patientId", "==", user.uid),
    where("date", "==", selectedDate.toDateString()),
    where("time", "==", selectedTime)
);

const patientAppointments1 = await getDocs(q3);

if (!patientAppointments1.empty) {
    return Alert.alert(
      "Limit reached",
      "You already have an appointment at this time with another doctor."
    );
}


    await addDoc(collection(db, "appointments"), {
      doctorId,
      patientId: user.uid,
      doctorName,
      patientName,
      date: selectedDate.toDateString(),
      time: selectedTime,
      reason: "General Consultation", 
      notes,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    Alert.alert(
      "Success",
      `Appointment booked with ${doctorName} on ${selectedDate.toDateString()} at ${selectedTime}`,
      [
        {
          text: "OK",
          onPress: () => {
            setSelectedDate(new Date());
            setSelectedTime(null);
            setNotes("");
            router.back();
          },
        },
      ]
    );
  } catch (error) {
    console.error("Error saving appointment:", error);
    Alert.alert("Error", "Could not save appointment. Please try again.");
  }
};
  return (
    <View style={styles.container}>
      <Header title="Book Appointment" onBack={() => router.push("/(patient)/doctor-list")} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Card style={styles.card}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <Text style={styles.price}>{doctor.price} per consultation</Text>
        </Card>

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

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>
            Select Time {isWeekend(selectedDate) ? "(Not Available)" : ""}
          </Text>
          {isWeekend(selectedDate) ? (
            <Text style={styles.noSlotsText}>
              No available time slots on weekends. Please select a weekday.
            </Text>
          ) : selectedDate.toDateString() === new Date().toDateString() ? (
             availableTimeSlots.length === 0 ? (
              <Text
                style={{textAlign: "center",color: "red",fontStyle: "italic",padding: 15,}}>
                There are no available times for today.
              </Text>
            ) :(
                <View style={styles.timeGrid}>
                  <TimeSlots
                    slots={availableTimeSlots}
                    selected={selectedTime}
                    onSelect={setSelectedTime}
                  />
                </View>
              )
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
                      let hours = date.getHours();
                      let minutes = date.getMinutes();
                      minutes = minutes < 15 ? 0 : minutes < 45 ? 30 : 0;
                      if (minutes === 0 && date.getMinutes() >= 45) {
                        hours += 1;
                      }
                      if (hours < 8 || (hours === 16 && minutes > 0) || hours > 16) {
                        Alert.alert(
                          "Invalid time",
                          "Please select a time between 08:00 and 16:00."
                        );
                        return;
                      }
                      const finalTime =
                        `${hours.toString().padStart(2, "0")}:` +
                        `${minutes.toString().padStart(2, "0")}`;

                      setSelectedTime(finalTime);
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

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <TextInput
            style={[styles.input, { backgroundColor: "#e0e0e0" }]}
            value={patientName}
            editable={false}
            selectTextOnFocus={false}
            placeholder="Full Name"
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
        
        <View style={styles.buttonContainer}>
           <PrimaryButton
            title={isWeekend(selectedDate) ? "Weekend - Not Available" : "Confirm Appointment"}
            onPress={handleBooking}
            disabled={isWeekend(selectedDate) || !selectedTime || !patientName}
            icon={() => <Ionicons name="checkmark-circle" size={24} color="#fff" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
