import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebase";

export default function OnBoarding() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("F");
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [hasAllergy, setHasAllergy] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const genders = useMemo(
    () => [
      { label: "Female", value: "F" },
      { label: "Male", value: "M" },
      { label: "Other", value: "T" },
    ],
    []
  );
  const fadeIn = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleNext = async () => {
    const trimmedBirthDate = birthDate.trim();

    const birthDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!birthDatePattern.test(trimmedBirthDate)) {
      Alert.alert(
        "Invalid format",
        "Please enter your birth date in DD/MM/YYYY format."
      );
      return;
    }

    const [day, month, year] = trimmedBirthDate.split("/").map(Number);
    const dateObj = new Date(year, month - 1, day);
    if (
      dateObj.getDate() !== day ||
      dateObj.getMonth() !== month - 1 ||
      dateObj.getFullYear() !== year
    ) {
      Alert.alert("Invalid Date", "Please enter a real birth date.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if (age < 0 || age > 120) {
      Alert.alert("Invalid Age", "Please enter a valid birth date.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "User not logged in.");
        return;
      }

      await addDoc(collection(db, "patients"), {
        userId: user.uid,
        birthDate: trimmedBirthDate,
        gender,
        weight,
        height,
        hasAllergy,
        createdAt: new Date(),
      });

      // Show success modal with fade-in
      fadeIn();

      // After 1.5 seconds fade out and navigate
      setTimeout(() => {
        fadeOut();
        router.replace("/(patient)/home");
      }, 1500);
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save your data. Please try again.");
    }
  };

  if (showWelcome) {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome to MediCare!</Text>
        <Text style={styles.welcomeText}>
          We will help you manage your health easily and safely.
        </Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => setShowWelcome(false)}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.safecontainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.card}>
          <Text style={styles.label}>Birth Date (DD/MM/YYYY):</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 25/12/1990"
            placeholderTextColor="#888"
            value={birthDate}
            onChangeText={setBirthDate}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Gender:</Text>
          <View style={styles.radioGroup}>
            {genders.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.radioButton}
                onPress={() => setGender(item.value)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    gender === item.value && styles.radioSelectedOuter,
                  ]}
                >
                  {gender === item.value && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Weight (kg): {weight}</Text>
          <Slider
            minimumValue={30}
            maximumValue={150}
            step={1}
            value={weight}
            onValueChange={setWeight}
            minimumTrackTintColor="#007ea7"
            maximumTrackTintColor="#d1d5db"
            thumbTintColor="#007ea7"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Height (cm): {height}</Text>
          <Slider
            minimumValue={100}
            maximumValue={220}
            step={1}
            value={height}
            onValueChange={setHeight}
            minimumTrackTintColor="#007ea7"
            maximumTrackTintColor="#d1d5db"
            thumbTintColor="#007ea7"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Do you have any medication allergies?
          </Text>
          <Switch
            value={hasAllergy}
            onValueChange={setHasAllergy}
            trackColor={{ false: "#d1d5db", true: "#007ea7" }}
            thumbColor={hasAllergy ? "#ffffff" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal with fade in/out */}
      <Modal transparent visible={modalVisible} animationType="none">
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
            <Text style={styles.modalText}>Success! Data saved.</Text>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: "#e8f6f8",
  },
  container: { backgroundColor: "#e8f6f8", padding: 20 },
  scrollContent: { paddingBottom: 40 },

  card: {
    marginBottom: 20,
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    color: "#033d49",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    color: "#033d49",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#007ea7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioSelectedOuter: {
    borderColor: "#007ea7",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007ea7",
  },
  radioLabel: {
    fontSize: 16,
    color: "#033d49",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#e8f6f8",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#007ea7",
  },
  welcomeText: {
    fontSize: 16,
    color: "#033d49",
    textAlign: "center",
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: "#007ea7",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
  },
  getStartedText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  nextButton: {
    backgroundColor: "#007ea7",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007ea7",
  },
});

