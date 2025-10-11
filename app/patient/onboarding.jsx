import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function OnBoarding() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("F");
  const [ageGroup, setAgeGroup] = useState("adult");
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [hasAllergy, setHasAllergy] = useState(false);

  const handleNext = () => {
    console.log({ birthDate, gender, ageGroup, weight, height, hasAllergy });
    alert("Your information has been saved!");
  };

  if (showWelcome) {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome to Medi Care!</Text>
        <Text style={styles.welcomeText}>
          We will help you manage your health easily and safely.
        </Text>
        <Button title="Get Started" onPress={() => setShowWelcome(false)} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}></Text>

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
        <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
          <Picker.Item label="Female" value="F" />
          <Picker.Item label="Male" value="M" />
          <Picker.Item label="Other" value="T" />
        </Picker>
      </View>

      {/* Age Group */}
      <View style={styles.card}>
        <Text style={styles.label}>Age Group:</Text>
        <Picker selectedValue={ageGroup} onValueChange={setAgeGroup} style={styles.picker}>
          <Picker.Item label="Child" value="child" />
          <Picker.Item label="Adult" value="adult" />
          <Picker.Item label="Elder" value="elder" />
        </Picker>
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
          minimumTrackTintColor="#3b82f6"
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
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#d1d5db"
        />
      </View>

      {/* Allergies */}
      <View style={styles.card}>
        <Text>Do you have any medication allergies?</Text>
        <Switch value={hasAllergy} onValueChange={setHasAllergy} />
      </View>

      <Button title="Next" onPress={handleNext} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e293b",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },
  picker: {
    width: "100%",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f9ff",
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: =p10,
    color: "#1e293b",
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#64748b",
  },
});
