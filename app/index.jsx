import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const [isPressed, setIsPressed] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>MediCare</Text>
          <View style={styles.underline} />
          <Text style={styles.subtitle}>
            Your health, our priority{"\n"}Connecting patients & doctors
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Image
              source={require("../assets/images/logo.jpg")}
              style={styles.medicalImage}
              resizeMode="contain"
              fadeDuration={120}                 //  MIN CHANGE (Android perf)
              shouldRasterizeIOS                 //  MIN CHANGE (iOS perf)
              accessible={false}                 //  MIN CHANGE
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.loginButton,
              isPressed === "login" && styles.buttonPressed,
            ]}
            onPress={() => router.push("/(auth)/login")}
            onPressIn={() => setIsPressed("login")}
            onPressOut={() => setIsPressed(null)}
            activeOpacity={0.9}
          >
            <Text style={styles.loginButtonText}>Welcome Back</Text>
            <Text style={styles.buttonSubtext}>Sign in to your account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.signupButton,
              isPressed === "signup" && styles.buttonPressed,
            ]}
            onPress={() => router.push("/(auth)/signup")}
            onPressIn={() => setIsPressed("signup")}
            onPressOut={() => setIsPressed(null)}
            activeOpacity={0.9}
          >
            <Text style={styles.signupButtonText}>Get Started</Text>
            <Text style={styles.buttonSubtext}>Create new account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          Trusted by thousands of patients and doctors
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#007ea7",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0, 126, 167, 0.2)",
    textShadowRadius: 4,
  },
  underline: {
    width: 60,
    height: 4,
    backgroundColor: "#007ea7",
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 16,
    color: "#4a6572",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  medicalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  loginButton: {
    backgroundColor: "#ffffff",
  },
  signupButton: {
    backgroundColor: "#007ea7",
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.05,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007ea7",
    textAlign: "center",
    marginBottom: 4,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 14,
    color: "#4a6572",
    textAlign: "center",
    fontWeight: "400",
  },
  footerText: {
    fontSize: 13,
    color: "#4a6572",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
