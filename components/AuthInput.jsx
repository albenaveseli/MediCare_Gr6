import { StyleSheet, TextInput } from "react-native";

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    marginBottom: 16,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#033d49",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
