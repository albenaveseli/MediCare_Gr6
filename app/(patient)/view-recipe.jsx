import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../components/firebase";
import Header from "../../components/Header";

export default function ViewRecipeScreen() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "prescriptions"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrescriptions(data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        Alert.alert("Error", "Failed to load prescriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleCopy = (prescription) => {
    const message = `Prescription from ${prescription.doctorName} copied successfully.`;
    Alert.alert("Copied", message);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e8f6f8" }}>
      <Header
        title={selectedRecipe ? "Prescription Details" : "My Prescriptions"}
        onBack={selectedRecipe ? () => setSelectedRecipe(null) : undefined}
      />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {!selectedRecipe ? (
          <View style={styles.listWrapper}>
            {loading ? (
              <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>
            ) : prescriptions.length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 50 }}>No prescriptions found.</Text>
            ) : (
              prescriptions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.listItem,
                    item.urgency === "Emergency" && styles.urgentBorder,
                    item.urgency === "Normal" && styles.normalBorder,
                    item.urgency === "Medium" && styles.monitorBorder,
                  ]}
                  onPress={() => setSelectedRecipe(item)}
                >
                  <View style={styles.listTextContainer}>
                    <Text style={styles.doctorName}>{item.doctorName}</Text>
                    <Text style={styles.profession}>{item.profession}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      item.urgency === "Emergency"
                        ? styles.badgeUrgent
                        : item.urgency === "Medium"
                        ? styles.badgeMonitor
                        : styles.badgeNormal,
                    ]}
                  >
                    <Text style={styles.badgeText}>{item.urgency}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        ) : (
          <View style={styles.detailsWrapper}>
            <View style={styles.detailsHeaderRow}>
              <View>
                <Text style={styles.detailsDoctor}>{selectedRecipe.doctorName}</Text>
                <Text style={styles.detailsProfession}>{selectedRecipe.profession}</Text>
              </View>
              <Text style={styles.detailsDate}>{selectedRecipe.date}</Text>
            </View>

            <View
              style={[
                styles.separator,
                selectedRecipe.urgency === "Emergency"
                  ? { backgroundColor: "#d9534f" }
                  : selectedRecipe.urgency === "Medium"
                  ? { backgroundColor: "#f1c40f" }
                  : { backgroundColor: "#4CAF50" },
              ]}
            />

            <View style={styles.cardSection}>
              <Text style={styles.label}>Diagnosis</Text>
              <Text style={styles.value}>{selectedRecipe.diagnosis}</Text>
            </View>

            <View style={styles.cardSection}>
              <Text style={styles.label}>Medications</Text>
              {selectedRecipe.medications?.map((m, i) => (
                <Text key={i} style={styles.value}>
                  • {m}
                </Text>
              ))}
            </View>

            <View style={styles.cardSection}>
              <Text style={styles.label}>Treatment Steps</Text>
              <Text style={styles.value}>{selectedRecipe.steps}</Text>
            </View>

            {selectedRecipe.notes && (
              <View style={styles.cardSection}>
                <Text style={styles.label}>Additional Notes</Text>
                <Text style={styles.value}>{selectedRecipe.notes}</Text>
              </View>
            )}

            {/* <TouchableOpacity
              style={styles.copyButton}
              onPress={() => handleCopy(selectedRecipe)}
            >
              <Text style={styles.copyButtonText}>Copy Prescription</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listWrapper: { paddingHorizontal: 20, paddingTop: 20 },
  listItem: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
  },
  urgentBorder: { borderLeftColor: "#d9534f" },
  normalBorder: { borderLeftColor: "#4CAF50" },
  monitorBorder: { borderLeftColor: "#f1c40f" },
  listTextContainer: { flex: 1 },
  doctorName: { fontSize: 18, fontWeight: "700", color: "#007ea7" },
  profession: { fontSize: 15, color: "#4a6572", marginVertical: 2 },
  dateText: { fontSize: 14, color: "#555" },
  badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 10 },
  badgeUrgent: { backgroundColor: "#ffe6e6" },
  badgeMonitor: { backgroundColor: "#fff7e0" },
  badgeNormal: { backgroundColor: "#e6ffe6" },
  badgeText: { fontWeight: "600", color: "#333" },

  detailsWrapper: { paddingHorizontal: 20, paddingTop: 20 },
  detailsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  detailsDoctor: { fontSize: 24, fontWeight: "bold", color: "#007ea7" },
  detailsProfession: { fontSize: 18, color: "#4a6572", marginTop: 4 },
  detailsDate: { fontSize: 16, color: "#333", marginTop: 4 },
  separator: { height: 6, borderRadius: 3, marginVertical: 20 },
  cardSection: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#007ea7",
    marginBottom: 6,
  },
  value: { fontSize: 16, color: "#4a6572", lineHeight: 22 },
  copyButton: {
    marginTop: 25,
    backgroundColor: "#007ea7",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  copyButtonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});