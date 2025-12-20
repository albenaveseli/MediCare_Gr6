import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import { db } from "../../firebase";

export default function History() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getAuth().currentUser;

  const renderAppointment = useCallback(({ item, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          delay: index * 80,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
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
            {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
          </Text>
        </View>

        {item.notes ? (
          <View style={styles.row}>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{item.notes}</Text>
          </View>
        ) : null}
      </Animated.View>
    );
  }, []);

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
        renderItem={renderAppointment}
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
  label: {
    fontSize: 15,
    color: "#4a6572",
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: "#1f3c88",
    fontWeight: "500",
    maxWidth: "60%",
  },
  status: {
    fontWeight: "bold",
    fontSize: 15,
  },
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

