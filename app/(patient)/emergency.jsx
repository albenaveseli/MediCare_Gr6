import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const emergencyNumbers = [
  { label: "Police", number: "192", color: "#4da294" },
  { label: "Fire Dept", number: "193", color: "#1da593" },
  { label: "Ambulance", number: "194", color: "#38737b" },
];

const quickSteps = [
  "Stay calm and assess the situation",
  "Call the appropriate emergency service immediately",
  "Provide your location clearly",
  "Follow instructions from the dispatcher",
  "Assist the victim if safe until help arrives",
];

export default function Emergency() {
  const handleSOS = () =>
    alert("SOS Activated! Emergency services will be contacted.");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        <Text style={styles.description}>Press in case of emergency</Text>

        
        <View style={styles.cards}>
          {emergencyNumbers.map((item, i) => (
            <View
              key={i}
              style={[styles.card, { borderLeftColor: item.color }]}
            >
              <Text style={[styles.cardLabel, { color: item.color }]}>
                {item.label}
              </Text>
              <Text style={[styles.cardNumber, { color: item.color }]}>
                {item.number}
              </Text>
            </View>
          ))}
        </View>

        
        <View style={styles.steps}>
          <Text style={styles.stepsTitle}>Quick Steps in Emergency</Text>
          {quickSteps.map((step, i) => (
            <View key={i} style={styles.stepItem}>
              <View style={styles.bullet} />
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
  content: { alignItems: "center", padding: 20 },

  sosButton: {
    marginTop: 50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#d9534f",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  sosText: { color: "#fff", fontSize: 36, fontWeight: "700" },
  description: {
    fontSize: 16,
    color: "#033d49",
    textAlign: "center",
    marginBottom: 25,
  },

  cards: { width: "100%", marginBottom: 30 },
  card: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    backgroundColor: "#fff",
    borderLeftWidth: 6,
    elevation: 3,
  },
  cardLabel: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  cardNumber: { fontSize: 16, fontWeight: "600" },

  steps: { width: "100%" },
  stepsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginRight: 10,
    backgroundColor: "#007ea7",
  },
  stepText: { fontSize: 16, color: "#033d49", flexShrink: 1 },
});
