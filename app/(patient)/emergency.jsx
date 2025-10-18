import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Emergency() {
  const handleSOS = () => {
    Alert.alert("SOS Activated!", "Emergency services will be contacted.");
  };

  const emergencyNumbers = [
    { label: "Police", number: "192", color: "#4da294ff" },
    { label: "Fire Dept", number: "193", color: "#1da593ff" },
    { label: "Ambulance", number: "194", color: "#38737bff" },
  ];

  const callNumber = (num) => Linking.openURL(`tel:${num}`);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        <Text style={styles.description}>Press in case of emergency</Text>

        {/* Emergency Numbers */}
        <View style={styles.cardsContainer}>
          {emergencyNumbers.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { borderLeftColor: item.color }]}
              onPress={() => callNumber(item.number)}
            >
              <Text style={[styles.cardText, { color: item.color }]}>
                {item.label}
              </Text>
              <Text style={[styles.cardNumber, { color: item.color }]}>
                {item.number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Steps */}
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>Quick Steps in Emergency</Text>
          {[
            "Stay calm and assess the situation",
            "Call the appropriate emergency service immediately",
            "Provide your location clearly",
            "Follow instructions from the dispatcher",
            "Assist the victim if safe until help arrives",
          ].map((step, idx) => (
            <View key={idx} style={styles.stepItem}>
              <View style={[styles.stepBullet, { backgroundColor: "#007ea7" }]} />
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8" },
  contentContainer: { alignItems: "center", paddingHorizontal:20},

  sosButton: {
    marginTop: 50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#d9534f",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 15,
  },
  sosText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: 1,
  },
  description: {
    fontSize: 16,
    color: "#033d49",
    textAlign: "center",
    marginBottom: 25,
  },

  cardsContainer: { width: "100%", marginBottom: 30 },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    backgroundColor: "#fff",
    borderLeftWidth: 6,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  cardNumber: { fontSize: 16, fontWeight: "600" },

  stepsContainer: { width: "100%" },
  stepsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stepBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginRight: 10,
  },
  stepText: { fontSize: 16, color: "#033d49", flexShrink: 1 },
});
