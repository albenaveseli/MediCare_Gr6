import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/Card";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import TimeSlots from "../../components/TimeSlots";
import { db } from "../../components/firebase";

export default function DoctorDetails() {
  const params = useLocalSearchParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const LIKE_KEY = `doctor_${params.id}_liked`;

  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (params.id) {
          const docRef = doc(db, "doctors", params.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             const data = docSnap.data();
            setDoctor({ id: docSnap.id, ...data });

            const likedBy = data.likedBy || [];
            setLikesCount(likedBy.length);
            setIsLiked(currentUserId ? likedBy.includes(currentUserId) : false);
          }
          else {
            console.warn("Doctor not found in Firestore");
          }
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [params.id, currentUserId]);

   const toggleLike = async () => {
    if (!currentUserId) return; 
    try {
      const docRef = doc(db, "doctors", params.id);
      const newStatus = !isLiked;
      setIsLiked(newStatus);

      if (newStatus) {
        await updateDoc(docRef, { likedBy: arrayUnion(currentUserId) });
        setLikesCount(prev => prev + 1);
      } else {
        await updateDoc(docRef, { likedBy: arrayRemove(currentUserId) });
        setLikesCount(prev => prev - 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#007ea7" />
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>No doctor found.</Text>
      </View>
    );
  }

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  };

  const features = [
    { icon: "school", text: doctor.education },
    { icon: "location-on", text: doctor.location },
    { icon: "language", text: doctor.languages.join(", ") },
    { icon: "attach-money", text: `Consultation: ${doctor.price}` },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Doctor Profile"
        onBack={() => router.push("/doctor-list")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.profileSection}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{doctor.rating}</Text>
              <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={toggleLike} style={styles.heartButton}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "#FF3B30" : "#007ea7"}
            />
          </TouchableOpacity>
            <Text style={styles.likeCount}>{likesCount}</Text>
        </View>
        </View>

        <Card style={styles.card}>
          <Text style={styles.descriptionText}>{doctor.description}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Details</Text>
          {features.map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <MaterialIcons name={f.icon} size={20} color="#007ea7" />
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Available Hours</Text>

          {isWeekend() ? (
            <Text style={styles.unavailableText}>Unavailable</Text>
          ) : (
            <TimeSlots
              slots={doctor.availability || []}
              selected={selectedTime}
              onSelect={setSelectedTime}
            />
          )}
          <Text style={styles.availabilityNote}>
            {isWeekend()
              ? "Today is weekend — the doctor is unavailable. On workdays: 08:00-16:00"
              : "For today: doctor's specific availability. For other days: 08:00-16:00"}
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Book Appointment"
          onPress={() =>
            router.push({
              pathname: "/book-appointment",
              params: {
                doctorId: doctor.id,
                doctorName: doctor.name,
                doctorSpecialty: doctor.specialty,
                doctorPrice: doctor.price,
                doctorImage: doctor.image,
                doctorAvailability: doctor.availability.join("|"),
              },
            })
          }
          icon={() => (
            <FontAwesome5 name="calendar-check" size={20} color="#fff" />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8" },
  scrollView: { flex: 1 },
  profileSection: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  doctorImage: { width: 100, height: 100, borderRadius: 50, marginRight: 15 },
  infoContainer: { flex: 1 },
  doctorName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 2,
  },
  specialty: {
    fontSize: 16,
    color: "#007ea7",
    fontWeight: "600",
    marginBottom: 6,
  },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: { fontSize: 14, color: "#666" },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007ea7",
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  availabilityNote: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    fontStyle: "italic",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#e8f6f8",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#d0e8f2",
  },
  heartButton: { padding: 4 },
  unavailableText: {
  fontSize: 16,
  color: "#FF3B30",
  textAlign: "center",
  fontWeight: "600",
  marginVertical: 10,
},
});
