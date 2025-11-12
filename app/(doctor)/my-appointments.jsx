import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";

import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../components/firebase";

export default function MyAppointmentsScreen() {
  const router = useRouter();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return Alert.alert("Error", "You must be logged in.");

        // 🔹 Merr doktorin sipas email-it
        const doctorQuery = query(
          collection(db, "doctors"),
          where("email", "==", user.email)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (doctorSnapshot.empty) {
          Alert.alert("Error", "Doctor profile not found.");
          setLoading(false);
          return;
        }

        const doctorData = {
          id: doctorSnapshot.docs[0].id,
          ...doctorSnapshot.docs[0].data(),
        };
        setDoctor(doctorData);

        // 🔹 Merr të gjitha rezervimet për këtë doktor
        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("doctorId", "==", doctorData.id)
        );
        const snapshot = await getDocs(appointmentsQuery);

        const fetchedAppointments = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
        Alert.alert("Error", "Could not load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // 🔹 Përditëson statusin e rezervimit
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: newStatus,
      });
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId ? { ...a, status: newStatus } : a
        )
      );
      Alert.alert(
        "Success",
        `Appointment ${
          newStatus === "approved" ? "confirmed" : "cancelled"
        } successfully!`
      );
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "#48c774";
      case "pending":
        return "#ffcc00";
      case "cancelled":
        return "#e63946";
      default:
        return "#6c757d";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const groupAppointmentsByDate = (list) => {
    const grouped = {};
    list.forEach((apt) => {
      const key =
        apt.date instanceof Date
          ? apt.date.toDateString()
          : new Date(apt.date).toDateString();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(apt);
    });
    return grouped;
  };

  const filteredAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled"
  );
  const groupedAppointments = groupAppointmentsByDate(filteredAppointments);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007ea7" />
        <Text style={{ marginTop: 10 }}>Loading appointments...</Text>
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle" size={40} color="gray" />
        <Text style={{ marginTop: 10 }}>
          No doctor profile found for this account.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>My Appointments</Text>

      <ScrollView style={styles.content}>
        {Object.keys(groupedAppointments).length > 0 ? (
          Object.entries(groupedAppointments)
            .sort(
              ([dateA], [dateB]) => new Date(dateA) - new Date(dateB) // nga më e hershmja tek më e vona
            )
            .map(([dateKey, dayAppointments]) => (
              <View key={dateKey} style={styles.daySection}>
                <Text style={styles.dayHeader}>
                  {new Date(dateKey).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>

                {dayAppointments.map((appointment) => (
                  <View key={appointment.id} style={styles.appointmentCard}>
                    <View style={styles.leftSection}>
                      <View style={styles.iconCircle}>
                        <Ionicons
                          name="person-circle-outline"
                          size={28}
                          color="#007ea7"
                        />
                      </View>
                      <View>
                        <Text style={styles.patientName}>
                          {appointment.patientName}
                        </Text>
                        <Text style={styles.appointmentTime}>
                          <Ionicons
                            name="time-outline"
                            size={12}
                            color="#007ea7"
                          />{" "}
                          {appointment.time}
                        </Text>
                        <Text style={styles.reason} numberOfLines={1}>
                          {appointment.reason}
                        </Text>
                        {appointment.notes && (
                          <Text
                            style={[
                              styles.reason,
                              { color: "#005f73", marginTop: 4 },
                            ]}
                          >
                            <Ionicons
                              name="chatbubble-ellipses-outline"
                              size={12}
                              color="#007ea7"
                            />{" "}
                            {appointment.notes}
                          </Text>
                        )}
                        <TouchableOpacity
                          style={styles.createRecipeButton}
                          onPress={() =>
                            router.push({
                              pathname: "/erecipe",
                              params: {
                                appointmentId: appointment.id,
                                patientName: appointment.patientName,
                                 patientId: appointment.patientId, 
                              },
                            })
                          }
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={16}
                            color="#fff"
                          />
                          <Text style={styles.createRecipeText}>
                            Create Recipe
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.rightSection}>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor: getStatusColor(appointment.status),
                          },
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {getStatusText(appointment.status)}
                        </Text>
                      </View>

                      {appointment.status === "pending" && (
                        <View style={styles.actionButtons}>
                          <TouchableOpacity
                            style={[styles.actionButton, styles.approveButton]}
                            onPress={() =>
                              handleStatusChange(appointment.id, "approved")
                            }
                          >
                            <Ionicons name="checkmark" size={16} color="#fff" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.actionButton, styles.cancelButton]}
                            onPress={() =>
                              handleStatusChange(appointment.id, "cancelled")
                            }
                          >
                            <Ionicons name="close" size={16} color="#fff" />
                          </TouchableOpacity>
                        </View>
                      )}

                      {appointment.status === "approved" && (
                        <TouchableOpacity
                          style={[
                            styles.actionButton,
                            styles.cancelButton,
                            styles.singleButton,
                          ]}
                          onPress={() =>
                            handleStatusChange(appointment.id, "cancelled")
                          }
                        >
                          <Ionicons name="close" size={16} color="#fff" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#a0c4c7" />
            <Text style={styles.emptyStateText}>No appointments scheduled</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
    paddingTop: 30,
  },
  content: {
    padding: 16,
  },
  daySection: {
    marginBottom: 24,
  },
  dayHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  appointmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    backgroundColor: "#b9ecf0",
    borderRadius: 50,
    padding: 8,
  },
  patientName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#033d49",
  },
  appointmentTime: {
    fontSize: 13,
    color: "#007ea7",
    marginTop: 2,
  },
  reason: {
    fontSize: 12,
    color: "#6c757d",
    fontStyle: "italic",
    marginTop: 2,
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  approveButton: {
    backgroundColor: "#4db8ff",
  },
  cancelButton: {
    backgroundColor: "#007ea7",
  },
  singleButton: {
    marginTop: 4,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#4a6572",
    marginTop: 12,
    textAlign: "center",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 16,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f6f8",
  },
  createRecipeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b4d8",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  createRecipeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
});