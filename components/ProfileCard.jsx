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

export default function ProfileCard({
  name: initialName,
  email: initialEmail,
  roleType,
}) {
  const router = useRouter();

  const [name, setName] = useState(initialName || "Arta Krasniqi");
  const [email, setEmail] = useState(initialEmail || "arta.krasniqi@gmail.com");
  const [role] = useState(roleType || "Pacient");
  const [isEditing, setIsEditing] = useState(false);

  // Fusha të reja
  const [birthdate, setBirthdate] = useState("2001-05-14");
  const [gender, setGender] = useState("Female");
  const [height, setHeight] = useState("168");
  const [weight, setWeight] = useState("58");
  const [allergies, setAllergies] = useState("No");

  const handleLogout = () => router.replace("/auth/login");
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleAbout = () => router.push("/common/about");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Top Section */}
      <View style={styles.topSection}>
        <Image
          source={require("../assets/images/profilepicture.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Emri"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Emaili"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              value={birthdate}
              onChangeText={setBirthdate}
              placeholder="Data e lindjes (YYYY-MM-DD)"
              placeholderTextColor="#999"
            />

            <Picker
              selectedValue={gender}
              style={styles.input}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="Gjatësia (cm)"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Pesha (kg)"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />

            <Picker
              selectedValue={allergies}
              style={styles.input}
              onValueChange={(itemValue) => setAllergies(itemValue)}
            >
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </>
        ) : (
          <>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Emri</Text>
              <Text style={styles.value}>{name}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Roli</Text>
              <Text style={styles.value}>{role}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Data e Lindjes</Text>
              <Text style={styles.value}>{birthdate}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Gjinia</Text>
              <Text style={styles.value}>{gender}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Gjatësia (cm)</Text>
              <Text style={styles.value}>{height}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Pesha (kg)</Text>
              <Text style={styles.value}>{weight}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Alergji</Text>
              <Text style={styles.value}>{allergies}</Text>
            </View>
          </>
        )}

        <View style={styles.buttonsContainer}>
          {isEditing ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Ruaj Ndryshimet</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editText}>Përditëso Profilin</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Dil nga Llogaria</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Button */}
      <TouchableOpacity style={styles.aboutButton} onPress={handleAbout}>
        <Text style={styles.aboutText}>Rreth Aplikacionit</Text>
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
    marginBottom: 15,
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
    backgroundColor: "#f2f9fb",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginVertical: 6,
    width: "100%",
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
