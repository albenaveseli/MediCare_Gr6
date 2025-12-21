import { Image } from "expo-image";
import { router } from "expo-router";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Alert.alert("Error", "Please enter your email first!");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      Alert.alert(
        "Email Sent",
        "If an account exists for this email, a password reset link has been sent."
      );
    } catch (error) {
      
      Alert.alert(
        "Reset Failed",
        "Unable to send reset email right now. Please try again later."
      );
    }
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert("Error", "Please fill in both email and password!");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const role = trimmedEmail.endsWith("@doctor.com") ? "doctor" : "patient";
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.role !== role) await updateDoc(userRef, { role });
      } else {
        await setDoc(userRef, {
          email: trimmedEmail,
          role,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Something went wrong. Please make sure your email or password is correct and try again."
      );
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
    } catch (error) {
      Alert.alert(
        "Google Sign-In Unavailable",
        "This service is currently not available. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.jpg")}
        style={styles.logo}
        contentFit="cover" // si të përshtatet imazhi
        cachePolicy="memory" // cache për performancë
        transition={300} // efekti fade-in
        quality={0.5} // kompresim 50% të cilësisë
      />

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

      
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotLink}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007ea7" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: "#484848ff", borderWidth: 1, borderColor: "#ddd" },
        ]}
        onPress={handleGoogleLogin}
      >
        <View style={styles.buttonContent}>
          <Image
            source={require("../../assets/images/GoogleLogo.png")}
            style={{ width: 20, height: 20, marginRight: 10 }}
            contentFit="contain"
            cachePolicy="memory"
            transition={200} // efekt i butë kur ngarkohet
            quality={0.5} // kompresim 50% të cilësisë
          />
          <Text style={styles.buttonText}>Login with Google</Text>
        </View>
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
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "#007ea7",
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: "underline",
  },


  forgotLink: {
    color: "#007ea7",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    width: "80%",
    textAlign: "right",
  },
});
