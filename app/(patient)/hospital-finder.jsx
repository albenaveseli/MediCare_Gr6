import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { app } from "../../components/firebase";
import Header from "../../components/Header";

const db = getFirestore(app);


const STATIC_HOSPITALS = [
  {
    id: 1,
    code: "H001",
    name: "Central Hospital",
    state: "NSW",
    region: "Sydney",
    type: "Public",
    latitude: "-33.8688",
    longitude: "151.2093",
    status: "Open",
    description: "A major hospital located in the city center.",
  },
  {
    id: 2,
    code: "H002",
    name: "Westside Clinic",
    state: "VIC",
    region: "Melbourne",
    type: "Private",
    latitude: "-37.8136",
    longitude: "144.9631",
    status: "Closed",
    description: "Private clinic with specialist services.",
  },
];

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      if (Platform.OS === "web") {
        try {
          const snapshot = await getDocs(collection(db, "hospitals"));
          const data = snapshot.docs.map((doc) => doc.data());
          setHospitals(data);
        } catch (error) {
          console.log("Firestore fetch failed, using static data:", error);
          setHospitals(STATIC_HOSPITALS);
        }
      } else {
       
        setHospitals(STATIC_HOSPITALS);
      }
      setLoading(false);
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <View style={[styles.wrapper, styles.center]}>
        <Text style={styles.loadingText}>Loading hospitals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Header title="Hospital Finder" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {hospitals.map((h) => (
          <View key={h.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{h.name}</Text>
              <View
                style={[
                  styles.statusBadge,
                  h.status === "Closed" ? styles.closedBadge : styles.openBadge,
                ]}
              >
                <Text style={styles.statusText}>{h.status}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>State</Text>
                <Text style={styles.detailValue}>{h.state}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Region</Text>
                <Text style={styles.detailValue}>{h.region}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text
                  style={[
                    styles.detailValue,
                    h.type === "Public"
                      ? styles.publicText
                      : styles.privateText,
                  ]}
                >
                  {h.type}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Coordinates</Text>
                <Text style={styles.detailValue}>
                  {h.latitude}, {h.longitude}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Code</Text>
                <Text style={styles.detailValue}>{h.code}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>ID</Text>
                <Text style={styles.detailValue}>{h.id}</Text>
              </View>
            </View>
            {h.description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Description</Text>
                <Text style={styles.descriptionText}>{h.description}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#f8fdff" },
  center: { justifyContent: "center", alignItems: "center", flex: 1 },
  loadingText: { fontSize: 16, fontStyle: "italic", color: "#007ea7" },
  scroll: { flex: 1 },
  scrollContent: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#007ea7",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#006d8c", flex: 1 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
  },
  openBadge: { backgroundColor: "#e8f7f0" },
  closedBadge: { backgroundColor: "#ffe8e8" },
  statusText: { fontSize: 12, fontWeight: "700", color: "#555" },
  divider: { height: 1, backgroundColor: "#e1f5fe", marginBottom: 16 },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailItem: { width: "48%", marginBottom: 12 },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007ea7",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2c3e50",
    lineHeight: 18,
  },
  publicText: { color: "#27ae60", fontWeight: "600" },
  privateText: { color: "#e74c3c", fontWeight: "600" },
  descriptionContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007ea7",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    fontStyle: "italic",
  },
});
