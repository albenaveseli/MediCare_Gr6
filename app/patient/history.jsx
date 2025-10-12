import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function History() {
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem("appointments");
        const storedDocuments = await AsyncStorage.getItem("documents");
        if (storedAppointments) setAppointments(JSON.parse(storedAppointments));
        if (storedDocuments) setDocuments(JSON.parse(storedDocuments));
      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
                      item.status === "Completed" ? styles.completed : styles.cancelled,
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
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  status: {
    fontWeight: "bold",
    fontSize: 15,
  },
  completed: {
    color: "#16A34A",
  },
  cancelled: {
    color: "#DC2626",
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 10,
  },
});
