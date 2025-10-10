import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);

  const handleSignup = async () => {
    if (!email || !password || !role) {
      Alert.alert("Gabim", "Plotëso të gjitha fushat!");
      return;
    }

    try {
      const existing = await AsyncStorage.getItem(email);
      if (existing) {
        Alert.alert("Ky email ekziston tashmë!");
        return;
      }

      const userData = { email, password, role };
      await AsyncStorage.setItem(email, JSON.stringify(userData));

      Alert.alert("Sukses", "Llogaria u krijua me sukses!");
      router.replace("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Krijo Llogari</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Fjalëkalimi"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === "patient" && styles.active]}
          onPress={() => setRole("patient")}
        >
          <Text>Pacient</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "doctor" && styles.active]}
          onPress={() => setRole("doctor")}
        >
          <Text>Doktor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Regjistrohu</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>Ke tashmë llogari? Kyçu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#007AFF" },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  roleContainer: { flexDirection: "row", marginVertical: 10 },
  roleButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  active: { backgroundColor: "#007AFF" },
  signupButton: {
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  signupText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { color: "#007AFF", marginTop: 20 },
});
