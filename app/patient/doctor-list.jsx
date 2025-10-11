import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function DoctorList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const doctors = [
    {
      id: 1,
      name: "Dr. Ardit Hyseni",
      specialty: "Cardiologist",
      rating: 4.8,
      experience: "12 years",
      description: "Experienced cardiologist specializing in heart diseases, cardiac surgery, and preventive cardiology. Certified by European Society of Cardiology.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      education: "MD Cardiology, University of Prishtina",
      languages: ["Albanian", "English", "Italian"],
      location: "Prishtina Medical Center",
      reviews: 89,
      availability: ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM"]
    },
    {
      id: 2,
      name: "Dr. Dua Gashi",
      specialty: "Dermatologist",
      rating: 4.9,
      experience: "8 years",
      description: "Dermatology specialist with expertise in skin diseases, cosmetic dermatology, and laser treatments. Member of American Academy of Dermatology.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      education: "MD Dermatology, University of Vienna",
      languages: ["Albanian", "English", "German"],
      location: "Prishtina Dermatology Clinic",
      reviews: 67,
      availability: ["10:00 AM", "11:30 AM", "04:00 PM", "05:15 PM"]
    },
    // ... other doctors data
  ];

  const specialties = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Doctors</Text>
        <Text style={styles.subtitle}>Choose your specialist</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#64748b"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors by name or specialty..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94a3b8"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDoctorCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  header: {
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
});