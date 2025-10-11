import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(null);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword || !role) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const existing = await AsyncStorage.getItem(email);
      if (existing) {
        Alert.alert("This email already exists!");
        return;
      }

      const userData = { fullName, email, password, role };
      await AsyncStorage.setItem(email, JSON.stringify(userData));

      Alert.alert("Success", "Account created successfully!");
      if (role === "patient") router.replace("/patient/onboarding");
      else if (role === "doctor") router.replace("/doctor/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === "patient" && styles.active]}
          onPress={() => setRole("patient")}
        >
          <Text style={role === "patient" ? styles.roleTextActive : styles.roleText}>Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "doctor" && styles.active]}
          onPress={() => setRole("doctor")}
        >
          <Text style={role === "doctor" ? styles.roleTextActive : styles.roleText}>Doctor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>
          Already have an account? <Text style={styles.linkBold}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#007AFF" },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  roleContainer: { flexDirection: "row", marginVertical: 10 },
  roleButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  active: { backgroundColor: "#007AFF" },
  roleText: { color: "#333" },
  roleTextActive: { color: "#fff", fontWeight: "600" },
  signupButton: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  signupText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { color: "#333", marginTop: 20, fontSize: 15 },
  linkBold: { color: "#007AFF", fontWeight: "600" },
});
