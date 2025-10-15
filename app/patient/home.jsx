import { StyleSheet, Text, View } from "react-native";
import DashboardCards from "../../components/DashboardCards";

export default function Home() {
  const pages = [
    { title: "Upload Documents", icon: "document-text-outline", path: "/patient/upload-documents" },
    { title: "View E-Recipe", icon: "medkit-outline", path: "/patient/view-recipe" },
    { title: "Reminder", icon: "alarm-outline", path: "/patient/reminder" },
    { title: "Emergency", icon: "alert-circle-outline", path: "/patient/emergency" },
    { title: "History", icon: "person-circle-outline", path: "/patient/history" },
    { title: "Hospital Finder", icon: "location-outline", path: "/patient/hospital-finder" },
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
