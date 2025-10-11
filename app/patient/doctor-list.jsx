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
    {
      id: 3,
      name: "Dr. Erzana Beqaj",
      specialty: "Neurologist",
      rating: 4.7,
      experience: "15 years",
      description: "Neurology expert with extensive experience in treating neurological disorders, epilepsy, and stroke patients. Researcher in neurodegenerative diseases.",
      image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&h=400&fit=crop",
      education: "MD Neurology, Harvard Medical School",
      languages: ["Albanian", "English", "French"],
      location: "University Clinical Center",
      reviews: 124,
      availability: ["08:30 AM", "11:00 AM", "01:30 PM", "03:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Artan Krasniqi",
      specialty: "Cardiologist",
      rating: 4.6,
      experience: "10 years",
      description: "Interventional cardiologist specializing in angioplasty, stenting, and cardiac catheterization. Focus on minimally invasive procedures.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      education: "MD Cardiology, University of Tirana",
      languages: ["Albanian", "English", "Turkish"],
      location: "City Heart Hospital",
      reviews: 56,
      availability: ["09:30 AM", "12:00 PM", "02:30 PM", "04:45 PM"]
    },
    {
      id: 5,
      name: "Dr. Lirije Morina",
      specialty: "Pediatrician",
      rating: 4.9,
      experience: "14 years",
      description: "Pediatric specialist with focus on child development, vaccinations, and childhood diseases. Passionate about preventive pediatric care.",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
      education: "MD Pediatrics, University of Skopje",
      languages: ["Albanian", "English", "Macedonian"],
      location: "Children's Health Center",
      reviews: 145,
      availability: ["08:00 AM", "10:15 AM", "01:00 PM", "03:30 PM"]
    },
    {
      id: 6,
      name: "Dr. Besnik Aliu",
      specialty: "Dermatologist",
      rating: 4.5,
      experience: "7 years",
      description: "Dermatology and venereology specialist with expertise in acne treatment, skin cancer screening, and aesthetic procedures.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      education: "MD Dermatology, University of Belgrade",
      languages: ["Albanian", "English", "Serbian"],
      location: "Skin Care Specialists",
      reviews: 42,
      availability: ["09:45 AM", "11:15 AM", "02:45 PM", "04:00 PM"]
    },
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

   const renderDoctorCard = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      router.push({
        pathname: "/patient/doctor-details",
        params: { 
          id: item.id.toString(),
          name: item.name, 
          specialty: item.specialty,
          rating: item.rating.toString(),
          experience: item.experience,
          description:item.description,
          image:item.image,
          education: item.education,
          languages: item.languages.join(','),
          location: item.location, 
          reviews:item.reviews,
          availability:item.availability.join('|'),
          price: getDoctorPrice(item.specialty) 
        }
      })
    }
    activeOpacity={0.7}
  >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.experience}>• {item.experience}</Text>
        </View>
      </View>

      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );
const getDoctorPrice = (specialty) => {
  const prices = {
    "Cardiologist": "$150",
    "Dermatologist": "$120", 
    "Neurologist": "$180",
    "Pediatrician": "$100"
  };
  return prices[specialty] || "$120";
};
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
    card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 6,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "600",
    marginLeft: 2,
  },
  experience: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  arrowContainer: {
    padding: 4,
  },
});