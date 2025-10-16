import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

export default function Reminder() {
  const [medicines, setMedicines] = useState([
    { id: "1", name: "Paracetamol", time: "08:00 AM" },
    { id: "2", name: "Ibuprofen", time: "02:00 PM" },
  ]);

  const [newMedicineName, setNewMedicineName] = useState("");
  const [newMedicineTime, setNewMedicineTime] = useState("");

  const addMedicine = () => {
    if (!newMedicineName || !newMedicineTime) {
      Alert.alert("Please enter both medicine name and time");
      return;
    }

    const newMedicine = {
      id: (medicines.length + 1).toString(),
      name: newMedicineName,
      time: newMedicineTime,
    };

    setMedicines([...medicines, newMedicine]);
    setNewMedicineName("");
    setNewMedicineTime("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text style={styles.medicineTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#e8f6f8" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <Header
        title="Medicine Reminders"
        icon={<Ionicons name="medkit-outline" size={28} color="#007ea7" />}
      />

      <FlatList
        data={medicines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: 20,
          paddingTop: 10,
        }}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.input}
          placeholder="Medicine Name"
          value={newMedicineName}
          onChangeText={setNewMedicineName}
        />

        <TextInput
          style={styles.input}
          placeholder="Time (e.g., 08:00 AM)"
          value={newMedicineTime}
          onChangeText={setNewMedicineTime}
        />

        <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 6,
    borderRadius: 14,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007ea7",
  },
  medicineTime: {
    fontSize: 15,
    color: "#4a6572",
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d0d7e0",
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 6,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007ea7",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
