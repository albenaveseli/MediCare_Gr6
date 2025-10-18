import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileCard() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Arta Krasniqi");
  const [email, setEmail] = useState("arta.krasniqi@gmail.com");
  const role = "Patient";

  const [birthdate, setBirthdate] = useState("2001-05-14");
  const [gender, setGender] = useState("Female");
  const [height, setHeight] = useState("168");
  const [weight, setWeight] = useState("58");
  const [allergies, setAllergies] = useState("No");

  const handleLogout = () => router.replace("/auth/login");
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleAbout = () =>
    router.push({
      pathname: "/common/about",
      params: { role: roleType.toLowerCase() },
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../assets/images/profilepicture.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>

      <View style={styles.infoCard}>
        {isEditing ? (
          <>
            <View style={styles.inputRow}>
              <Ionicons name="person-outline" size={20} color="#007ea7" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={20} color="#007ea7" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="calendar-outline" size={20} color="#007ea7" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={birthdate}
                onChangeText={setBirthdate}
                placeholder="Birthdate (YYYY-MM-DD)"
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="male-female-outline" size={20} color="#007ea7" style={styles.icon} />
              <View style={styles.pickerContainer}>
                <Picker selectedValue={gender} onValueChange={setGender}>
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="resize-outline" size={20} color="#007ea7" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                placeholder="Height (cm)"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="barbell-outline" size={20} color="#007ea7" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight (kg)"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="medkit-outline" size={20} color="#007ea7" style={styles.icon} />
              <View style={styles.pickerContainer}>
                <Picker selectedValue={allergies} onValueChange={setAllergies}>
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={20} color="#007ea7" style={styles.icon} />
              <Text>{name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={20} color="#007ea7" style={styles.icon} />
              <Text>{email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color="#007ea7" style={styles.icon} />
              <Text>{birthdate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="male-female-outline" size={20} color="#007ea7" style={styles.icon} />
              <Text>{gender}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="resize-outline" size={20} color="#007ea7" style={styles.icon} />
              <Text>{height} cm</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="barbell-outline" size={20} color="#007ea7" style={styles.icon} />
              <Text>{weight} kg</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="medkit-outline" size={20} color="#007ea7" style={styles.icon} />
              <Text>{allergies}</Text>
            </View>
          </>
        )}

        <View style={styles.buttonsContainer}>
          {isEditing ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.aboutButton} onPress={handleAbout}>
        <Text style={styles.aboutText}>About App</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9F8F9",
    alignItems: "center",
    paddingVertical: 40,
  },
  topSection: {
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4DB8FF",
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#033d49",
  },
  role: {
    fontSize: 16,
    color: "#4a6572",
    marginTop: 4,
  },
  infoCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  icon: {
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f2f9fb",
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },
  label: {
    fontSize: 15,
    color: "#6c757d",
    marginBottom: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: "500",
    color: "#033d49",
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f9fb",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },
  buttonsContainer: {
    marginTop: 20,
    gap: 12,
  },
  editButton: {
    backgroundColor: "#4DB8FF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#007ea7",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#B9ECF0",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#007ea7",
    fontSize: 16,
    fontWeight: "600",
  },
  aboutButton: {
    marginTop: 25,
    backgroundColor: "#48c774",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  aboutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
