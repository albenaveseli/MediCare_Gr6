import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function OnBoarding() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("F");
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [hasAllergy, setHasAllergy] = useState(false);

  const handleNext = () => {
    console.log({ birthDate, gender, weight, height, hasAllergy });
    alert("Your information has been saved!");
    router.replace("/patient/home");
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Birth Date */}
      <View style={styles.card}>
        <Text style={styles.label}>Birth Date (DD/MM/YYYY):</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 25/12/1990"
          value={birthDate}
          onChangeText={setBirthDate}
        />
      </View>

      {/* Gender */}
      <View style={styles.card}>
        <Text style={styles.label}>Gender:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="Female" value="F" />
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Other" value="T" />
          </Picker>
        </View>
      </View>

      {/* Weight */}
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
        />
      </View>

      {/* Height */}
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
        />
      </View>

      {/* Allergies */}
      <View style={styles.card}>
        <Text style={styles.label}>Do you have any medication allergies?</Text>
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8", padding: 20 },
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
  },
  picker: {
    height: 50,
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
});
