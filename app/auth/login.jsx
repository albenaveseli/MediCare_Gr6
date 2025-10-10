import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Plotëso email dhe fjalëkalimin!");
      return;
    }

    try {
      const data = await AsyncStorage.getItem(email);
      if (!data) {
        Alert.alert("Nuk ekziston llogaria, regjistrohu më parë!");
        return;
      }

      const user = JSON.parse(data);
      if (user.password !== password) {
        Alert.alert("Fjalëkalimi është i pasaktë!");
        return;
      }

      if (user.role === "patient") router.replace("/patient/home");
      else if (user.role === "doctor") router.replace("/doctor/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kyçu</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Vazhdo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.link}>Nuk ke llogari? Regjistrohu</Text>
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
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { color: "#007AFF", marginTop: 20 },
});
