import { Image, StyleSheet, Text, View } from "react-native";
import DashboardCards from "../../components/DashboardCards";

export default function Home() {
  const pages = [
    {
      title: "Analytics",
      icon: "bar-chart-outline",
      path: "/doctor/analytics",
    },
    { title: "E-Recipe", icon: "medkit-outline", path: "/doctor/erecipe" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/logo.jpg")}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>MediCare Dashboard</Text>
        <Text style={styles.subtitle}>Select a section to continue</Text>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome, doctorName 🌿</Text>
        <Text style={styles.welcomeText}>
          Monitor patient data, create prescriptions, and manage analytics all in one place. Your digital clinic companion is here.
        </Text>
      </View>

      <DashboardCards pages={pages} />

      <View style={styles.quoteCard}>
        <Text style={styles.quoteMark}>“</Text>
        <Text style={styles.quoteText}>
          The art of medicine consists of amusing the patient while nature cures the disease.
        </Text>
        <Text style={styles.quoteAuthor}>– Voltaire</Text>
      </View>

      <Text style={styles.footer}>Stay healthy with MediCare 💙</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 35,
    backgroundColor: "#b9ecf0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#007ea7",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#4a6572",
    textAlign: "center",
  },

  // Welcome card
  welcomeCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 25,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 15,
    color: "#033d49",
    lineHeight: 20,
  },

  quoteCard: {
    marginTop: 30,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteMark: {
    fontSize: 40,
    color: "#52b8c0",
    marginBottom: -10,
  },
  quoteText: {
    fontSize: 15,
    color: "#033d49",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  quoteAuthor: {
    fontSize: 13,
    color: "#007ea7",
    fontWeight: "600",
  },

  // Footer
  footer: {
    textAlign: "center",
    color: "#4a6572",
    fontSize: 13,
    marginTop: 30,
    marginBottom: 10,
  },
});
