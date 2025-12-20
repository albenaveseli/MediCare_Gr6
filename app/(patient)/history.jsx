import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import AppointmentCard from "../../components/AppointmentCard";
import Header from "../../components/Header";
import { db } from "../../firebase";

export default function History() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getAuth().currentUser;


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const appointmentsRef = collection(db, "appointments");
        const q = query(appointmentsRef, where("patientId", "==", user.uid));

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007ea7" />
        <Text style={styles.loadingText}>Loading your appointments...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#e8f6f8" }}>
      <Header title="History" />

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <AppointmentCard item={item} index={index} />
        )}
        contentContainerStyle={styles.scrollContainer}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Your Past Appointments</Text>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Appointments</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            You have no booked appointments yet.
          </Text>
        }
        removeClippedSubviews
        initialNumToRender={8}
        windowSize={7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f3c88",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f6f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007ea7",
    fontWeight: "500",
  },
});

