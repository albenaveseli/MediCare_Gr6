import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import AuthForm from "../../components/AuthForm";
import AuthInput from "../../components/AuthInput";
import { auth, db } from "../../components/firebase";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = email.toLowerCase().endsWith("@doctor.com") ? "doctor" : "patient";

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        role,
        createdAt: serverTimestamp(),
      });

      if (role === "doctor") router.replace("/(doctor)/home");
      else router.replace("/(auth)/onboarding");
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
    </AuthForm>
  );
}

const styles = StyleSheet.create({});
