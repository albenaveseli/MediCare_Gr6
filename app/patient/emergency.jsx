import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Emergency() {

  const handleSOS = () => {
    Alert.alert("SOS Activated!", "Emergency services will be contacted.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
      <Text style={styles.description}>Press in case of emergency</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  sosButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset:{width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sosText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    color:"#555",
  },
});
