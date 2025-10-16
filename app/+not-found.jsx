import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Page Not Found</Text>
      <Text style={styles.description}>
        The URL you are trying to access does not exist or has been moved.
      </Text>

      <Link href="/">
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go Back to Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#007ea7",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#007ea7",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
