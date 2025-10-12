import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HospitalFinder() {
  const hospitals = [
    { name: "Regional Medical Center", distance: "0.8 km away", waitTime: "15 min" },
    { name: "City General Hospital", distance: "1.2 km away", waitTime: "25 min" },
    { name: "Community Health Clinic", distance: "1.5 km away", waitTime: "10 min" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Nearby Hospitals</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {hospitals.map((hospital, index) => (
          <View key={index} style={styles.hospitalCard}>
            <View style={styles.hospitalHeader}>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <View style={styles.waitTimeBadge}>
                <Text style={styles.waitTimeText}>{hospital.waitTime}</Text>
              </View>
            </View>
            <Text style={styles.distance}> {hospital.distance}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}> +1 555-0123</Text>
              <Text style={styles.contactText}> 24/7 Emergency</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff", 
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#2c5aa0", 
    textShadowColor: "rgba(44, 90, 160, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollView: {
    width: "100%",
  },
  hospitalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1e3ff",
    shadowColor: "#2c5aa0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  hospitalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a3a6e",
    flex: 1,
    marginRight: 10,
  },
  waitTimeBadge: {
    backgroundColor: "#e8f4ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2c5aa0",
  },
  waitTimeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2c5aa0",
  },
  distance: {
    fontSize: 15,
    color: "#4a6fa5",
    fontWeight: "600",
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  contactText: {
    fontSize: 12,
    color: "#6b8cba",
    fontWeight: "500",
  },
});