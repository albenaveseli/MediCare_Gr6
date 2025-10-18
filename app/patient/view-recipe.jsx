import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

export default function ViewRecipeScreen() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const prescriptions = [
    {
      id: "1",
      doctor: "Dr. Ardit Hyseni",
      profession: "Cardiologist",
      date: "13 Oct 2025",
      medications: ["Amoxicillin 500mg", "Paracetamol 500mg"],
      diagnosis: "Bacterial infection",
      steps: "Take antibiotics for 7 days and get enough rest.",
      notes: "Drink plenty of water. Avoid alcohol.",
      urgency: "Normal",
    },
    {
      id: "2",
      doctor: "Dr. Dua Gashi",
      profession: "Dermatologist",
      date: "05 Oct 2025",
      medications: ["Hydrocortisone Cream 1%"],
      diagnosis: "Allergic dermatitis",
      steps: "Apply the cream twice a day for 5 days.",
      notes: "Avoid direct sun exposure.",
      urgency: "Monitoring",
    },
    {
      id: "3",
      doctor: "Dr. Erzana Beqaj",
      profession: "Neurologist",
      date: "20 Sep 2025",
      medications: ["Ibuprofen 200mg"],
      diagnosis: "Migraine",
      steps: "Use medication only during headache episodes.",
      notes: "Reduce screen time and stay hydrated.",
      urgency: "Urgent",
    },
    {
      id: "4",
      doctor: "Dr. Artan Krasniqi",
      profession: "Cardiologist",
      date: "01 Sep 2025",
      medications: ["Aspirin 100mg", "Atorvastatin 10mg"],
      diagnosis: "Hypertension",
      steps: "Consult every 3 months for a check-up.",
      notes: "Monitor blood pressure regularly.",
      urgency: "Monitoring",
    },
    {
      id: "5",
      doctor: "Dr. Lirije Morina",
      profession: "Pediatrician",
      date: "10 Aug 2025",
      medications: ["Vitamin C syrup 5ml"],
      diagnosis: "Seasonal cold",
      steps: "Give the recommended dosage for 5 days.",
      notes: "Ensure rest and sufficient fluids.",
      urgency: "Normal",
    },
  ];

  const handleCopy = (prescription) => {
    const message = `Prescription from ${prescription.doctor} copied successfully.`;
    Alert.alert("Copied", message);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e8f6f8" }}>
      <Header
        title={selectedRecipe ? "Prescription Details" : "My Prescriptions"}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {!selectedRecipe ? (
          <View style={styles.listWrapper}>
            {prescriptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.listItem,
                  item.urgency === "Urgent" && styles.urgentBorder,
                  item.urgency === "Normal" && styles.normalBorder,
                  item.urgency === "Monitoring" && styles.monitorBorder,
                ]}
                onPress={() => setSelectedRecipe(item)}
              >
                <View style={styles.listTextContainer}>
                  <Text style={styles.doctorName}>{item.doctor}</Text>
                  <Text style={styles.profession}>{item.profession}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <View
                  style={[
                    styles.badge,
                    item.urgency === "Urgent"
                      ? styles.badgeUrgent
                      : item.urgency === "Monitoring"
                      ? styles.badgeMonitor
                      : styles.badgeNormal,
                  ]}
                >
                  <Text style={styles.badgeText}>{item.urgency}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // Details view
          <View style={styles.detailsWrapper}>
            <View style={styles.detailsHeaderRow}>
              <View>
                <Text style={styles.detailsDoctor}>
                  {selectedRecipe.doctor}
                </Text>
                <Text style={styles.detailsProfession}>
                  {selectedRecipe.profession}
                </Text>
              </View>
              <Text style={styles.detailsDate}>{selectedRecipe.date}</Text>
            </View>

            <View
              style={[
                styles.separator,
                selectedRecipe.urgency === "Urgent"
                  ? { backgroundColor: "#d9534f" }
                  : selectedRecipe.urgency === "Monitoring"
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
              {selectedRecipe.medications.map((m, i) => (
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

            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => handleCopy(selectedRecipe)}
            >
              <Text style={styles.copyButtonText}>Copy Prescription</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToListButton}
              onPress={() => setSelectedRecipe(null)}
            >
              <Text style={styles.backToListText}>← Back to List</Text>
            </TouchableOpacity>
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

  backToListButton: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  backToListText: { color: "#007ea7", fontSize: 16, fontWeight: "600" },
});
