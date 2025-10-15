import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AuthForm({
  title,
  children,
  buttonText,
  onSubmit,
  linkText,
  onLinkPress,
  buttonColor = "#007AFF",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {children}

      <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={onSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      {linkText && (
        <TouchableOpacity onPress={onLinkPress}>
          <Text style={styles.link}>{linkText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#007AFF" },
  button: {
    padding: 14,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  link: { color: "#333", marginTop: 20, fontSize: 15 },
});
