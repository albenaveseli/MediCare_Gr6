import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePatient() {
  const router = useRouter(); // 👈 për navigim

  const handleLogout = () => {
    // këtu mund ta shtosh logjikën e "clear user session" më vonë
    router.replace("/auth/login"); // e çon direkt në faqen e login
  };

  return (
    <View style={styles.container}>
      {/* Foto rrethore */}
      <Image
        source={{ uri: "https://via.placeholder.com/120" }}
        style={styles.profileImage}
      />

      {/* Emri, Emaili dhe Roli */}
      <Text style={styles.name}>Nisa Gashi</Text>
      <Text style={styles.email}>nisa.gashi@example.com</Text>
      <Text style={styles.role}>Pacient</Text>

      {/* Butonat */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 💅🏻 Stilet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#4A90E2",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  role: {
    fontSize: 15,
    color: "#999",
    marginBottom: 30,
  },
  buttonsContainer: {
    width: "80%",
    gap: 15,
  },
  editButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#f8d7da",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#d9534f",
    fontSize: 16,
    fontWeight: "600",
  },
});
