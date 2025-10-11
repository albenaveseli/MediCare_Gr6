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
    console.log({
      birthDate,
      gender,
      ageGroup,
      weight,
      height,
      hasAllergy,
    });
    alert("Të dhënat u regjistruan!");
    
  };

  if (showWelcome) {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Mirë se erdhe në Medi Care!</Text>
        <Text style={styles.welcomeText}>
          Ne do të të ndihmojmë të menaxhosh shëndetin tënd në mënyrë të lehtë dhe të sigurt.
        </Text>
        <Button title="Fillojmë" onPress={() => setShowWelcome(false)} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}></Text>

      {/* Data e lindjes */}
      <Text style={styles.label}>Data e lindjes (DD/MM/YYYY):</Text>
      <TextInput
        style={styles.input}
        placeholder="p.sh. 25/12/1990"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      {/* Gjinia */}
      <Text style={styles.label}>Gjinia:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={setGender}>
          <Picker.Item label="Femër" value="F" />
          <Picker.Item label="Mashkull" value="M" />
          <Picker.Item label="Tjetër" value="T" />
        </Picker>
      </View>

      {/* Grupmosha */}
      <Text style={styles.label}>Grupmosha:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={ageGroup} onValueChange={setAgeGroup}>
          <Picker.Item label="Fëmijë" value="child" />
          <Picker.Item label="I rritur" value="adult" />
    
        </Picker>
      </View>

      {/* Pesha */}
      <Text style={styles.label}>Pesha (kg): {weight}</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={30}
        maximumValue={150}
        step={1}
        value={weight}
        onValueChange={setWeight}
        minimumTrackTintColor="#3b82f6"
        maximumTrackTintColor="#d1d5db"
      />

      {/* Gjatësia */}
      <Text style={styles.label}>Gjatësia (cm): {height}</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={100}
        maximumValue={220}
        step={1}
        value={height}
        onValueChange={setHeight}
        minimumTrackTintColor="#3b82f6"
        maximumTrackTintColor="#d1d5db"
      />

      {/* Alergji */}
      <View style={styles.switchContainer}>
        <Text>Ke alergji ndaj barnave?</Text>
        <Switch value={hasAllergy} onValueChange={setHasAllergy} />
      </View>

      <Button title="Vazhdo" onPress={handleNext} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
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
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#374151",
  },
});
