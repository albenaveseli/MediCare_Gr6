import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";

export default function HospitalFinder() {
  const hospitals = [
    {
      name: "Regional Medical Center",
      distance: "0.8 km away",
      waitTime: "15 min",
    },
    {
      name: "City General Hospital",
      distance: "1.2 km away",
      waitTime: "25 min",
    },
    {
      name: "Community Health Clinic",
      distance: "1.5 km away",
      waitTime: "10 min",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header title="Hospital Finder" />

      <Text style={styles.title}>Nearby Hospitals</Text>

      {hospitals.map((hospital, index) => (
        <View key={index} style={styles.hospitalCard}>
          <View style={styles.hospitalHeader}>
            <Text style={styles.hospitalName}>{hospital.name}</Text>
            <View style={styles.waitTimeBadge}>
              <Text style={styles.waitTimeText}>{hospital.waitTime}</Text>
            </View>
          </View>
          <Text style={styles.distance}>{hospital.distance}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>+1 555-0123</Text>
            <Text style={styles.contactText}>24/7 Emergency</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    marginTop:30,
    fontSize: 22,
    fontWeight: "700",
    color: "#1f3c88",
    marginBottom: 20,
    textAlign: "center",
  },
  hospitalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#1f3c88",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f3c88",
    flex: 1,
    marginRight: 10,
  },
  waitTimeBadge: {
    backgroundColor: "#e6f0ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f3c88",
  },
  waitTimeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f3c88",
  },
  distance: {
    fontSize: 15,
    color: "#4a4a4a",
    fontWeight: "600",
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  contactText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
});
