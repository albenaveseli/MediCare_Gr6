import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
   const pages = [
    { title: "My Appointments", icon: "calendar-outline", path: "/doctor/my-appointments" },
    { title: "Analytics", icon: "bar-chart-outline", path: "/doctor/analytics" },
    { title: "E-Recipe", icon: "medkit-outline", path: "/doctor/erecipe" },
    { title: "Profile", icon: "person-circle-outline", path: "/doctor/profile" },
    { title: "About App", icon: "information-circle-outline", path: "../common/about" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>MediCare Dashboard</Text>
      <Text style={styles.subtitle}>Select a section to continue</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {pages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => router.push(item.path)}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={28} color="#1a73e8" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={22} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a73e8",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconContainer: {
    backgroundColor: "#e0edff",
    borderRadius: 12,
    padding: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 13,
    color: "#64748b",
  },
});
