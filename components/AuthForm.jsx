import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AuthForm({
  title,
  children,
  buttonText,
  onSubmit,
  linkText,
  onLinkPress,
  buttonColor = "#007ea7", 
}) {
  return (
    <View style={styles.container}>
    
      <Image
        source={require("../assets/images/logo.jpg")}
        style={styles.logo}
      />

      <Text style={styles.title}>{title}</Text>

      <View style={styles.formContent}>{children}</View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={onSubmit}
      >
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
  formContent: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
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
