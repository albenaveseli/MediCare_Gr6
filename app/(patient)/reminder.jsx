import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "../../components/Header";
import { scheduleNotification } from "../../utils/notifications";


import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Reminder() {
  const [medicines, setMedicines] = useState([]);
  const [newMedicineName, setNewMedicineName] = useState("");
  const [newMedicineTime, setNewMedicineTime] = useState("");

  
  const isValidTime = (time) => {
    const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
    return regex.test(time);
  };


  useEffect(() => {
    const loadMedicines = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, "reminders"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const meds = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMedicines(meds);
      } catch (error) {
        console.error("Error loading reminders:", error);
      }
    };

    loadMedicines();
  }, []);

  
  const addMedicine = async () => {
    if (!newMedicineName || !newMedicineTime) {
      Alert.alert("⚠️ Error", "Please enter both medicine name and time");
      return;
    }

    if (!isValidTime(newMedicineTime)) {
      Alert.alert("⚠️ Error", "Time must be in HH:MM AM/PM format");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    try {
      const newMed = {
        name: newMedicineName.trim(),
        time: newMedicineTime.trim(),
        userId: user.uid,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "reminders"), newMed);

      setMedicines((prev) => [...prev, { id: docRef.id, ...newMed }]);

      await scheduleNotification(newMedicineName, newMedicineTime);

      Alert.alert("✅ Success", "Medicine reminder added!");
      setNewMedicineName("");
      setNewMedicineTime("");
    } catch (error) {
      console.error("Error adding reminder:", error);
      Alert.alert("Error", "Failed to add reminder");
    }
  };

 
  const deleteMedicine = async (id) => {
    try {
      await deleteDoc(collection(db, "reminders").doc(id));
      setMedicines((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };


  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.medicineName}>{item.name}</Text>
            <Text style={styles.medicineTime}>{item.time}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteMedicine(item.id)}>
            <Ionicons name="trash-outline" size={24} color="#d9534f" />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [medicines]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#e8f6f8" }}>
      <Header
        title="Medicine Reminders"
        icon={<Ionicons name="medkit-outline" size={28} color="#007ea7" />}
      />

      <View style={styles.inputContainer}>
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
      </View>

      <FlatList
        data={medicines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 6,
    borderRadius: 14,
    elevation: 3,
  },
  medicineName: { fontSize: 18, fontWeight: "700", color: "#007ea7" },
  medicineTime: { fontSize: 15, color: "#4a6572", marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#d0d7e0",
    padding: 14,
    borderRadius: 12,
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
  },
  addButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
