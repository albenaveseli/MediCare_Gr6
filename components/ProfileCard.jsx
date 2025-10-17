import { Ionicons } from "@expo/vector-icons"; // ✅ built-in icons
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
  const [role] = useState(roleType || "Patient");
  const [isEditing, setIsEditing] = useState(false);

  // New fields
  const [birthdate, setBirthdate] = useState("2001-05-14");
  const [gender, setGender] = useState("Female");
  const [height, setHeight] = useState("168");
  const [weight, setWeight] = useState("58");
  const [allergies, setAllergies] = useState("No");

  const handleLogout = () => router.replace("/auth/login");
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleAbout = () => router.push("/common/about");

  const renderIcon = (name) => (
    <Ionicons name={name} size={20} color="#007ea7" style={styles.icon} />
  );

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
            <View style={styles.inputRow}>
              {renderIcon("person-outline")}
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputRow}>
              {renderIcon("mail-outline")}
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputRow}>
              {renderIcon("calendar-outline")}
              <TextInput
                style={styles.input}
                value={birthdate}
                onChangeText={setBirthdate}
                placeholder="Birthdate (YYYY-MM-DD)"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputRow}>
              {renderIcon("male-female-outline")}
              <Picker
                selectedValue={gender}
                style={styles.input}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <View style={styles.inputRow}>
              {renderIcon("resize-outline")}
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                placeholder="Height (cm)"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputRow}>
              {renderIcon("barbell-outline")}
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputRow}>
              {renderIcon("medkit-outline")}
              <Picker
                selectedValue={allergies}
                style={styles.input}
                onValueChange={(itemValue) => setAllergies(itemValue)}
              >
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>
          </>
        ) : (
          <>
            <View style={styles.infoItem}>
              {renderIcon("person-outline")}
              <View>
                <Text style={styles.label}>Full Name</Text>
                <Text style={styles.value}>{name}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              {renderIcon("mail-outline")}
              <View>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{email}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              {renderIcon("briefcase-outline")}
              <View>
                <Text style={styles.label}>Role</Text>
                <Text style={styles.value}>{role}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              {renderIcon("calendar-outline")}
              <View>
                <Text style={styles.label}>Birthdate</Text>
                <Text style={styles.value}>{birthdate}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              {renderIcon("male-female-outline")}
              <View>
                <Text style={styles.label}>Gender</Text>
                <Text style={styles.value}>{gender}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              {renderIcon("resize-outline")}
              <View>
                <Text style={styles.label}>Height (cm)</Text>
                <Text style={styles.value}>{height}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              {renderIcon("barbell-outline")}
              <View>
                <Text style={styles.label}>Weight (kg)</Text>
                <Text style={styles.value}>{weight}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              {renderIcon("medkit-outline")}
              <View>
                <Text style={styles.label}>Allergies</Text>
                <Text style={styles.value}>{allergies}</Text>
              </View>
            </View>
          </>
        )}

        {/* Buttons */}
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

      {/* About Button */}
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
