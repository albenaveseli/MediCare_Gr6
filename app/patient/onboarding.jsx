import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";

export default function App() {
  const [page, setPage] = useState("onboarding");

  const [signUpData] = useState({
    name: "Your name",
  });

  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("F");
  const [ageGroup, setAgeGroup] = useState("adult");
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(170);
  const [hasAllergy, setHasAllergy] = useState(false);

  const [nickname, setNickname] = useState(signUpData.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleNext = () => setPage("profile");
  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Profile Saved", "Your profile data has been updated!");
  };

  if (page === "onboarding") {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Complete Your Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Birth Date (DD/MM/YYYY):</Text>
          <TextInput style={styles.input} placeholder="25/12/1990" value={birthDate} onChangeText={setBirthDate} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Gender:</Text>
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Female" value="F" />
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Other" value="T" />
          </Picker>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Age Group:</Text>
          <Picker selectedValue={ageGroup} onValueChange={setAgeGroup} style={styles.picker}>
            <Picker.Item label="Child" value="child" />
            <Picker.Item label="Adult" value="adult" />
            <Picker.Item label="Elder" value="elder" />
          </Picker>
        </View>

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

        <View style={styles.card}>
          <Text>Do you have any medication allergies?</Text>
          <Switch value={hasAllergy} onValueChange={setHasAllergy} />
        </View>

        <Button title="Next" color="#3b82f6" onPress={handleNext} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
      <Text style={styles.profileTitle}>Your Profile</Text>

      <View style={[styles.card, { width: "90%" }]}>
        <Text style={styles.label}>Nickname</Text>
        {isEditing ? (
          <TextInput style={styles.input} value={nickname} onChangeText={setNickname} />
        ) : (
          <Text style={[styles.value, { textAlign: "center" }]}>{nickname}</Text>
        )}
      </View>

      <View style={[styles.card, { width: "90%" }]}>
        <Text style={styles.label}>Birth Date</Text>
        {isEditing ? (
          <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} />
        ) : (
          <Text style={[styles.value, { textAlign: "center" }]}>{birthDate || "-"}</Text>
        )}

        <Text style={styles.label}>Gender</Text>
        {isEditing ? (
          <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
            <Picker.Item label="Female" value="F" />
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Other" value="T" />
          </Picker>
        ) : (
          <Text style={[styles.value, { textAlign: "center" }]}>{gender || "-"}</Text>
        )}

        <Text style={styles.label}>Age Group</Text>
        {isEditing ? (
          <Picker selectedValue={ageGroup} onValueChange={setAgeGroup} style={styles.picker}>
            <Picker.Item label="Child" value="child" />
            <Picker.Item label="Adult" value="adult" />
            <Picker.Item label="Elder" value="elder" />
          </Picker>
        ) : (
          <Text style={[styles.value, { textAlign: "center" }]}>{ageGroup || "-"}</Text>
        )}

        <Text style={styles.label}>Weight</Text>
        {isEditing ? (
          <Slider
            minimumValue={30}
            maximumValue={150}
            step={1}
            value={weight}
            onValueChange={setWeight}
            minimumTrackTintColor="#3b82f6"
            maximumTrackTintColor="#d1d5db"
          />
        ) : (
          <Text style={[styles.value, { textAlign: "center" }]}>{weight} kg</Text>
        )}

        <Text style={styles.label}>Height</Text>
        {isEditing ? (
          <Slider
            minimumValue={100}
            maximumValue={220}
            step={1}
            value={height}
            onValueChange={setHeight}
            minimumTrackTintColor="#3b82f6"
            maximumTrackTintColor="#d1d5db"
          />
        ) : (
          <Text style={[styles.value, { textAlign: "center" }]}>{height} cm</Text>
        )}

        <Text style={styles.label}>Allergies</Text>
        {isEditing ? (
          <Switch value={hasAllergy} onValueChange={setHasAllergy} />
        ) : (
          <Text style={[styles.value, { textAlign: "center" }]}>{hasAllergy ? "Yes" : "No"}</Text>
        )}
      </View>

      <View style={{ width: "90%", marginBottom: 10 }}>
        <Button
          title={isEditing ? "Save Profile" : "Edit Profile"}
          color="#3b82f6"
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#1e293b" },
  profileTitle: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#1e293b" },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontSize: 14, color: "#64748b", marginBottom: 4, marginTop: 8 },
  value: { fontSize: 16, fontWeight: "500", color: "#1e293b" },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1e293b",
    backgroundColor: "#ffffff",
  },
  picker: { width: "100%" },
});
