import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthForm from "../../components/AuthForm";
import AuthInput from "../../components/AuthInput";
import { auth } from "../../components/firebase";

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

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      // 1️⃣ Krijo përdoruesin në Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Ruaj full name dhe role në displayName si JSON
      await updateProfile(user, {
        displayName: JSON.stringify({ fullName, role }),
      });

      Alert.alert("Success", "Account created successfully!");

      // 3️⃣ Navigo sipas rolit
      if (role === "patient") router.replace("/(auth)/onboarding");
      else if (role === "doctor") router.replace("/(doctor)/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <AuthForm
      title="Create Account"
      buttonText="Register"
      onSubmit={handleSignup}
      buttonColor="#34C759"
      linkText="Already have an account? Login"
      onLinkPress={() => router.push("/(auth)/login")}
    >
      <AuthInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <AuthInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AuthInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AuthInput
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
    </AuthForm>
  );
}

const styles = StyleSheet.create({
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
});
