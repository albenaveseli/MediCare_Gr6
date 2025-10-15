import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const MyAppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([
    
    {
      id: '1',
      patientName: 'John Doe',
      patientAge: '35',
      date: new Date('2024-02-15'),
      time: '10:00',
      reason: 'Routine checkup',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      patientAge: '28',
      date: new Date('2024-02-15'),
      time: '11:30',
      reason: 'Headache consultation',
      status: 'approved'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      patientAge: '45',
      date: new Date('2024-02-16'),
      time: '09:15',
      reason: 'Blood test results',
      status: 'pending'
    },
    {
      id: '4',
      patientName: 'Sarah Wilson',
      patientAge: '32',
      date: new Date('2024-02-16'),
      time: '14:00',
      reason: 'Annual physical',
      status: 'approved'
    },
    {
      id: '5',
      patientName: 'Robert Brown',
      patientAge: '50',
      date: new Date('2024-02-17'),
      time: '16:30',
      reason: 'Back pain consultation',
      status: 'pending'
    }
  ]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };
  const groupAppointmentsByDate = (appointmentsList) => {
    const grouped = {};
    appointmentsList.forEach(apt => {
      const dateKey = apt.date.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(apt);
    });
    return grouped;
  };
return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
       {Object.keys(groupedAppointments).length > 0 ? (
    Object.entries(groupedAppointments).map(([dateKey, dayAppointments]) => (
      <View key={dateKey} style={styles.daySection}>
        <Text style={styles.dayHeader}>
          {new Date(dateKey).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        
        {dayAppointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentItem}>
            {/* Left: Patient Info */}
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>
                {appointment.patientName}
              </Text>
              <Text style={styles.patientAge}>
                {appointment.patientAge} years
              </Text>
              <Text style={styles.appointmentTime}>
                <Ionicons name="time-outline" size={12} color="#666" />
                {' '}{appointment.time}
              </Text>
              <Text style={styles.reason} numberOfLines={1}>
                {appointment.reason}
              </Text>
            </View>

            {/* Right: Status and Actions */}
            <View style={styles.rightSection}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(appointment.status) }
              ]}>
                <Text style={styles.statusText}>
                  {getStatusText(appointment.status)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    ))
  ) : (
    <View style={styles.emptyState}>
      <Ionicons name="calendar-outline" size={48} color="#ccc" />
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  daySection: {
  marginBottom: 24,
},
dayHeader: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 12,
  paddingHorizontal: 8,
},
appointmentItem: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  padding: 16,
  borderRadius: 12,
  marginBottom: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
  alignItems: 'center',
},
patientInfo: {
  flex: 1,
},
patientName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  marginBottom: 2,
},
patientAge: {
  fontSize: 14,
  color: '#666',
  marginBottom: 4,
},
appointmentTime: {
  fontSize: 13,
  color: '#666',
  marginBottom: 4,
},
reason: {
  fontSize: 12,
  color: '#999',
  fontStyle: 'italic',
},
rightSection: {
  alignItems: 'flex-end',
  gap: 8,
},
statusBadge: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 6,
  minWidth: 70,
},
statusText: {
  color: '#fff',
  fontSize: 11,
  fontWeight: '600',
  textAlign: 'center',
},
});

export default MyAppointmentsScreen;