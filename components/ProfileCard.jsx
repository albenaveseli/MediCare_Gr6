import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
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
  homePath,
}) {
  const router = useRouter();

  const [name, setName] = useState(initialName || "First Name / Last Name");
  const [email, setEmail] = useState(initialEmail || "email@example.com");
  const [role] = useState(roleType || "Pacient");
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => router.replace("/auth/login");
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleAbout = () => router.push("/common/about"); 

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={require("../assets/images/profilepicture.jpg")}
          style={styles.profileImage}
        />

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
          </>
        ) : (
          <>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </>
        )}

        <Text style={styles.role}>{role}</Text>

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
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.aboutButtonOutside} onPress={handleAbout}>
        <Text style={styles.aboutTextOutside}>About App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F1FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4A90E2",
    marginBottom: 20,
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#2C3E50" },
  email: { fontSize: 16, color: "#7F8C8D", marginTop: 4 },
  role: { fontSize: 15, color: "#95A5A6", marginBottom: 25 },
  buttonsContainer: { width: "100%", marginTop: 10, gap: 15 },

  editButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  editText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  saveButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  backButton: {
    backgroundColor: "#AED9E0",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  backText: { color: "#1E6091", fontSize: 16, fontWeight: "600" },

  logoutButton: {
    backgroundColor: "#f8d7da",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#d9534f", fontSize: 16, fontWeight: "600" },

  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginVertical: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },

  aboutButtonOutside: {
    marginTop: 20,
    backgroundColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  aboutTextOutside: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
