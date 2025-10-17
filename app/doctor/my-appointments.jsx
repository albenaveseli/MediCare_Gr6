import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const MyAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patientName: "John Doe",
      patientAge: "35",
      date: new Date("2024-02-15"),
      time: "10:00",
      reason: "Routine checkup",
      status: "pending",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      patientAge: "28",
      date: new Date("2024-02-15"),
      time: "11:30",
      reason: "Headache consultation",
      status: "approved",
    },
    {
      id: "3",
      patientName: "Mike Johnson",
      patientAge: "45",
      date: new Date("2024-02-16"),
      time: "09:15",
      reason: "Blood test results",
      status: "pending",
    },
    {
      id: "4",
      patientName: "Sarah Wilson",
      patientAge: "32",
      date: new Date("2024-02-16"),
      time: "14:00",
      reason: "Annual physical",
      status: "approved",
    },
    {
      id: "5",
      patientName: "Robert Brown",
      patientAge: "50",
      date: new Date("2024-02-17"),
      time: "16:30",
      reason: "Back pain consultation",
      status: "pending",
    },
  ]);

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

  const handleApprove = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "approved" } : apt))
    );
    Alert.alert("Success", "Appointment approved successfully");
  };

  const handleCancel = (id) => {
    Alert.alert("Cancel Appointment", "Are you sure?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () =>
          setAppointments((prev) =>
            prev.map((apt) =>
              apt.id === id ? { ...apt, status: "cancelled" } : apt
            )
          ),
      },
    ]);
  };

  const groupAppointmentsByDate = (list) => {
    const grouped = {};
    list.forEach((apt) => {
      const key = apt.date.toDateString();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(apt);
    });
    return grouped;
  };

  const filteredAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled"
  );
  const groupedAppointments = groupAppointmentsByDate(filteredAppointments);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {Object.keys(groupedAppointments).length > 0 ? (
          Object.entries(groupedAppointments).map(
            ([dateKey, dayAppointments]) => (
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
                        <Text style={styles.patientAge}>
                          {appointment.patientAge} years
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
                            onPress={() => handleApprove(appointment.id)}
                          >
                            <Ionicons name="checkmark" size={16} color="#fff" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.actionButton, styles.cancelButton]}
                            onPress={() => handleCancel(appointment.id)}
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
                          onPress={() => handleCancel(appointment.id)}
                        >
                          <Ionicons name="close" size={16} color="#fff" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )
          )
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#a0c4c7" />
            <Text style={styles.emptyStateText}>No appointments scheduled</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
    paddingTop: 80,
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
  patientAge: {
    fontSize: 13,
    color: "#4a6572",
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
});

export default MyAppointmentsScreen;
