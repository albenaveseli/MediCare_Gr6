import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import AuthForm from "../../components/AuthForm";
import AuthInput from "../../components/AuthInput";
import { auth, db } from "../../firebase";

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long and include:\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character (@$!%*?&)"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (email.toLowerCase().endsWith("@doctor.com")) {
      Alert.alert(
        "Registration Closed",
        "Doctor registration is currently closed."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const role = "patient";

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        role,
        createdAt: serverTimestamp(),
      });

      router.replace("/(auth)/onboarding");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Email Already Exists",
          "This email is already registered. Please login or use a different email."
        );
      } else {
        Alert.alert("Error", error.message);
      }
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
      <AuthInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <AuthInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
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
