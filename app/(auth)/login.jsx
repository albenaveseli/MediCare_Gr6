import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import AuthForm from "../../components/AuthForm";
import AuthInput from "../../components/AuthInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please fill in both email and password!");
      return;
    }

    try {
      const data = await AsyncStorage.getItem(email);
      if (!data) {
        Alert.alert("Account not found. Please sign up first!");
        return;
      }

      const user = JSON.parse(data);
      if (user.password !== password) {
        Alert.alert("Incorrect password!");
        return;
      }

      if (user.role === "patient") router.replace("/(patient)/home");
      else if (user.role === "doctor") router.replace("/(doctor)/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthForm
      title="Welcome Back!"
      buttonText="Login"
      onSubmit={handleLogin}
      linkText="Don’t have an account? Sign Up"
      onLinkPress={() => router.push("/(auth)/signup")}
    >
      <AuthInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AuthInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
    </AuthForm>
  );
}
