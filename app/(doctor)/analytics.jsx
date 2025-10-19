import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";

const MONTH_DATA = [
  { month: "Jan", visits: 23 },
  { month: "Feb", visits: 41 },
  { month: "Mar", visits: 32 },
  { month: "Apr", visits: 46 },
  { month: "May", visits: 35 },
  { month: "Jun", visits: 27 },
  { month: "Jul", visits: 43 },
  { month: "Aug", visits: 35 },
  { month: "Sep", visits: 29 },
  { month: "Oct", visits: 48 },
  { month: "Nov", visits: 22 },
  { month: "Dec", visits: 40 },
];

export default function Analytics() {
  return (
    <View style={styles.container}>
      <Header
        title="Patient Analytics"
        onBack={() => router.push("/(doctor)/home")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Monthly Patient Visits</Text>

        {MONTH_DATA.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.month}>{item.month}</Text>
            <Text style={styles.visits}>Visits: {item.visits}</Text>
          </View>
        ))}

        <View style={styles.insightCard}>
          <Text style={styles.title}>Insights & Observations</Text>
          <Text style={styles.text}>
            Patient visits are higher in mid-year (Mar–Oct). November shows a
            drop, possibly due to seasonal changes.
          </Text>
          <Text style={styles.highlight}>
            💡 Suggestion: Schedule awareness campaigns early winter to maintain
            engagement.
          </Text>
        </View>

        <Text style={styles.footer}>
          Data from MediCare system reports · Last updated: October 2025
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8" },
  content: { padding: 20 },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#033d49",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  month: { fontSize: 16, fontWeight: "700", color: "#007ea7" },
  visits: { fontSize: 14, color: "#064663", marginTop: 4 },
  insightCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#045d75", marginBottom: 6 },
  text: { fontSize: 14, color: "#064663", lineHeight: 20, marginBottom: 6 },
  highlight: { fontSize: 14, color: "#0369a1", fontWeight: "600" },
  footer: {
    fontSize: 12,
    color: "#0f4c5c",
    fontStyle: "italic",
    marginTop: 20,
    textAlign: "center",
  },
});
