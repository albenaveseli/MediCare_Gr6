import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import { db } from "../../firebase";

const PAGE_SIZE = 8;

export default function History() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const user = getAuth().currentUser;

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchAppointments = async () => {
    try {
      if (!user) {
        setLoading(false);
        return;
      }

      const appointmentsRef = collection(db, "appointments");
      const q = query(
        appointmentsRef,
        where("patientId", "==", user.uid),
        orderBy("date", "desc"),
        limit(PAGE_SIZE)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreAppointments = async () => {
    if (!hasMore || loadingMore || !lastDoc) return;

    try {
      setLoadingMore(true);

      const appointmentsRef = collection(db, "appointments");
      const q = query(
        appointmentsRef,
        where("patientId", "==", user.uid),
        orderBy("date", "desc"),
        startAfter(lastDoc),
        limit(PAGE_SIZE)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments((prev) => [...prev, ...data]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading more appointments:", error);
    } finally {
      setLoadingMore(false);
    }
  };

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
        contentContainerStyle={styles.scrollContainer}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Your Past Appointments</Text>
            <Text style={styles.sectionTitle}>Appointments</Text>
          </>
        }
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
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.value}>{item.time}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text
                style={[
                  styles.status,
                  item.status === "completed"
                    ? styles.completed
                    : item.status === "cancelled"
                    ? styles.cancelled
                    : styles.pending,
                ]}
              >
                {item.status?.charAt(0).toUpperCase() +
                  item.status?.slice(1)}
              </Text>
            </View>
            {item.notes ? (
              <View style={styles.row}>
                <Text style={styles.label}>Notes:</Text>
                <Text style={styles.value}>{item.notes}</Text>
              </View>
            ) : null}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            You have no booked appointments yet.
          </Text>
        }
        onEndReached={fetchMoreAppointments}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              style={{ marginVertical: 20 }}
              color="#007ea7"
            />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 20,
    textAlign: "center",
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
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { fontSize: 15, color: "#4a6572", fontWeight: "500" },
  value: { fontSize: 15, color: "#1f3c88", fontWeight: "500", maxWidth: "60%" },
  status: { fontWeight: "bold", fontSize: 15 },
  completed: { color: "#28a745" },
  cancelled: { color: "#dc3545" },
  pending: { color: "#ffb300" },
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
