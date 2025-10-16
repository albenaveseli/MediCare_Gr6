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
    backgroundColor: "#e8f6f8",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 18,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#48c774",
    marginBottom: 20,
  },
  name: { fontSize: 22, fontWeight: "600", color: "#033d49" },
  email: { fontSize: 16, color: "#4a6572", marginTop: 4 },
  role: { fontSize: 15, color: "#6c757d", marginBottom: 25 },
  buttonsContainer: { width: "100%", marginTop: 10, gap: 15 },

  editButton: {
    backgroundColor: "#4db8ff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  editText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  saveButton: {
    backgroundColor: "#007ea7",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  logoutButton: {
    backgroundColor: "#b9ecf0",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: { color: "#007ea7", fontSize: 16, fontWeight: "600" },

  input: {
    backgroundColor: "#f2f9fb",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginVertical: 6,
    width: "100%",
    borderWidth: 1,
    borderColor: "#d4f1f4",
    textAlign: "center",
  },

  aboutButtonOutside: {
    marginTop: 20,
    backgroundColor: "#48c774",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  aboutTextOutside: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
