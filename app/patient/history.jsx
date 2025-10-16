import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

export default function History() {
  const [appointments] = useState([
    {
      doctorName: "Dr. Arben Krasniqi",
      date: "2025-09-10",
      status: "Completed",
    },
    { doctorName: "Dr. Elira Gashi", date: "2025-08-22", status: "Cancelled" },
    { doctorName: "Dr. Besnik Hoxha", date: "2025-07-15", status: "Completed" },
  ]);

  const [documents] = useState([
    { type: "Blood Test Report", date: "2025-09-11" },
    { type: "X-Ray Result", date: "2025-08-25" },
    { type: "Prescription File", date: "2025-07-20" },
  ]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header title="History" />

      <Text style={styles.title}>Your Past Visits</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appointments</Text>
        {appointments.length > 0 ? (
          <FlatList
            data={appointments}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.label}>Doctor:</Text>
                  <Text style={styles.value}>{item.doctorName}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>{item.date}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Status:</Text>
                  <Text
                    style={[
                      styles.status,
                      item.status === "Completed"
                        ? styles.completed
                        : styles.cancelled,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>No past appointments yet.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uploaded Documents</Text>
        {documents.length > 0 ? (
          <FlatList
            data={documents}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.label}>Type:</Text>
                  <Text style={styles.value}>{item.type}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>No uploaded documents yet.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
    paddingVertical: 20,
  },
  title: {
    marginTop:30,
    fontSize: 22,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f3c88",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    color: "#4a6572",
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: "#1f3c88",
    fontWeight: "500",
  },
  status: {
    fontWeight: "bold",
    fontSize: 15,
  },
  completed: {
    color: "#28a745",
  },
  cancelled: {
    color: "#dc3545",
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 10,
  },
});
