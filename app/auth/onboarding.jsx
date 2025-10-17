import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnBoarding() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("F");
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [hasAllergy, setHasAllergy] = useState(false);

  const handleNext = () => {
    // ✅ Validim për formatin e datës (DD/MM/YYYY)
    const birthDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!birthDatePattern.test(birthDate)) {
      Alert.alert(
        "Format i pavlefshëm",
        "Ju lutem shkruani datëlindjen në formatin e saktë (DD/MM/YYYY)."
      );
      return;
    }

    console.log({ birthDate, gender, weight, height, hasAllergy });
    Alert.alert("Sukses!", "Të dhënat u ruajtën me sukses!");
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

  const genders = [
    { label: "Female", value: "F" },
    { label: "Male", value: "M" },
    { label: "Other", value: "T" },
  ];

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
          placeholderTextColor="#888"
          value={birthDate}
          onChangeText={setBirthDate}
        />
      </View>

      {/* Gender as Radio Buttons */}
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
          thumbTintColor="#007ea7"
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
          thumbTintColor="#007ea7"
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

      {/* Next Button */}
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
});
