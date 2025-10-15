import { useState } from "react";
import { Alert, FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    if (Platform.OS === "web") window.alert(message);
    else Alert.alert("Copied", message);
  };

  // List view
  if (!selectedRecipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Prescriptions</Text>

        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
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
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  // Details view
  return (
    <View style={styles.detailsContainer}>
      <TouchableOpacity onPress={() => setSelectedRecipe(null)} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back to List</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.detailsContent}>
        <View style={styles.detailsHeaderRow}>
          <View>
            <Text style={styles.detailsDoctor}>{selectedRecipe.doctor}</Text>
            <Text style={styles.detailsProfession}>{selectedRecipe.profession}</Text>
          </View>
          <Text style={styles.detailsDate}>{selectedRecipe.date}</Text>
        </View>

        {/* Separator with urgency color */}
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
            <Text key={i} style={styles.value}>• {m}</Text>
          ))}
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.label}>Treatment Steps</Text>
          <Text style={styles.value}>{selectedRecipe.steps}</Text>
        </View>

        {selectedRecipe.notes ? (
          <View style={styles.cardSection}>
            <Text style={styles.label}>Additional Notes</Text>
            <Text style={styles.value}>{selectedRecipe.notes}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => handleCopy(selectedRecipe)}
        >
          <Text style={styles.copyButtonText}>Copy Prescription</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f3c88",
    marginBottom: 25,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
  },
  urgentBorder: { 
    borderLeftColor: "#d9534f" 
  },
  normalBorder: { 
    borderLeftColor: "#4CAF50" 
  },
  monitorBorder: { 
    borderLeftColor: "#f1c40f" 
  },
  listTextContainer: { 
    flex: 1 
  },
  doctorName: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#1f3c88" 
  },
  profession: { 
    fontSize: 15, 
    color: "#777", 
    marginVertical: 2 
  },
  dateText: { 
    fontSize: 14, 
    color: "#555" 
  },
  badge: { 
    paddingVertical: 6, 
    paddingHorizontal: 10, 
    borderRadius: 8 
  },
  badgeUrgent: { 
    backgroundColor: "#ffe6e6" 
  },
  badgeMonitor: { 
    backgroundColor: "#fff7e0" 
  },
  badgeNormal: { 
    backgroundColor: "#e6ffe6" 
  },
  badgeText: { 
    fontWeight: "600", 
    color: "#333" 
  },

  // Details
  detailsContainer: { 
    flex: 1, 
    backgroundColor: "#eef2f9", 
    paddingTop: 40 
  },
  backButton: { 
    marginLeft: 15, 
    marginBottom: 10 
  },
  backButtonText: { 
    color: "#1f3c88", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  detailsContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },

  detailsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  detailsDoctor: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#1f3c88" 
  },
  detailsProfession: { 
    fontSize: 18, 
    color: "#4a4a4a", 
    marginTop: 4 
  },
  detailsDate: { 
    fontSize: 16, 
    color: "#333", 
    marginTop: 4 
  },

  separator: {
    height: 6,
    borderRadius: 3,
    marginVertical: 20,
  },

  cardSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { 
    fontSize: 17, 
    fontWeight: "bold", 
    color: "#1f3c88", 
    marginBottom: 5 
  },
  value: { 
    fontSize: 16, 
    color: "#333", 
    lineHeight: 22 
  },

  copyButton: {
    marginTop: 25,
    backgroundColor: "#1f3c88",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  copyButtonText: { 
    color: "#fff", 
    fontSize: 17, 
    fontWeight: "bold" 
  },
});
