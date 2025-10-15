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
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>No appointments scheduled</Text>
        </View>
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
});

export default MyAppointmentsScreen;