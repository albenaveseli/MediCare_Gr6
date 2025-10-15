import { StyleSheet, Text, View } from "react-native";
import DashboardCards from "../../components/DashboardCards";

export default function Home() {
  const pages = [
    { title: "Analytics", icon: "bar-chart-outline", path: "/doctor/analytics" },
    { title: "E-Recipe", icon: "medkit-outline", path: "/doctor/erecipe" },
    { title: "About App", icon: "information-circle-outline", path: "../common/about" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>MediCare Dashboard</Text>
      <Text style={styles.subtitle}>Select a section to continue</Text>

      <DashboardCards pages={pages} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", paddingHorizontal: 20, paddingTop: 60 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#1a73e8", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#64748b", textAlign: "center", marginBottom: 24 },
});
