import { router } from "expo-router";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../components/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastTwitterClick, setLastTwitterClick] = useState(0);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Please fill in both email and password!");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const role = trimmedEmail.endsWith("@doctor.com") ? "doctor" : "patient";
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.role !== role) await updateDoc(userRef, { role });
        if (role === "doctor") router.replace("/(doctor)/home");
        else router.replace("/(patient)/home");
      } else {
        await setDoc(userRef, {
          email: trimmedEmail,
          role,
          createdAt: serverTimestamp(),
        });
        if (role === "doctor") router.replace("/(doctor)/home");
        else router.replace("/(patient)/home");
      }
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const email = user.email || "";
      const role = email.endsWith("@doctor.com") ? "doctor" : "patient";
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || "",
          email,
          role,
          createdAt: serverTimestamp(),
        });
      } else {
        const data = userDoc.data();
        if (data.role !== role) await updateDoc(userRef, { role });
      }
      if (role === "doctor") router.replace("/(doctor)/home");
      else router.replace("/(patient)/home");
    } catch (error) {
      Alert.alert("Google Login Error", error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const email = user.email || "";
      const role = email.endsWith("@doctor.com") ? "doctor" : "patient";
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || "",
          email,
          role,
          createdAt: serverTimestamp(),
        });
        router.replace("/(auth)/onboarding");
      } else {
        const data = userDoc.data();
        if (data.role !== role) await updateDoc(userRef, { role });
        if (role === "doctor") router.replace("/(doctor)/home");
        else router.replace("/(patient)/home");
      }
    } catch (error) {
      Alert.alert("Github Login Error", error.message);
    }
  };

  const handleTwitterLogin = async () => {
    const now = Date.now();
    if (now - lastTwitterClick < 120000) {
      Alert.alert("Wait", "You can’t click again yet!");
      return;
    }
    setLastTwitterClick(now);
    try {
      const provider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const email = user.email || "";
      const role = email.endsWith("@doctor.com") ? "doctor" : "patient";
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || "",
          email,
          role,
          createdAt: serverTimestamp(),
        });
      } else {
        const data = userDoc.data();
        if (data.role !== role) await updateDoc(userRef, { role });
      }
      if (role === "doctor") router.replace("/(doctor)/home");
      else router.replace("/(patient)/home");
    } catch (error) {
      Alert.alert("Twitter Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/logo.jpg")} style={styles.logo} />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: "#007ea7" }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#DB4437" }]} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#333" }]} onPress={handleGitHubLogin}>
        <Text style={styles.buttonText}>Login with GitHub</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#1DA1F2" }]} onPress={handleTwitterLogin}>
        <Text style={styles.buttonText}>Login with Twitter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e8f6f8",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    backgroundColor: "#b9ecf0",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
    color: "#007ea7",
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  link: {
    color: "#007ea7",
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
