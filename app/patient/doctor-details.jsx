import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DoctorDetails() {
  const { 
    id,
    name, 
    specialty, 
    experience,
    rating ,
    reviews ,
    description ,
    image,
    education,
    languages,
    location,
    availability,
    price 
  } = useLocalSearchParams();

  const getAvailabilityArray = () => {
  if (!availability) return [];
  
  if (typeof availability === 'string' && availability.includes('|')) {
   return availability.split('|');
  }
  
  if (Array.isArray(availability)) {
   return availability;
  }
    
  return [availability];
  };

  const isWeekend = () => {
    const today = new Date();
    const day = today.getDay();
    return day === 0 || day === 6; // 0 = e Diel, 6 = e Shtunë
  };
  const doctor = {
    id: id || "1",
    name: name || "Dr. Unknown",
    specialty: specialty || "General Practitioner",
    experience,
    rating,
    reviews,
    description: description || `Experienced ${specialty} with over ${experience} in medical care.`,
    image,
    education,
    languages: typeof languages === 'string' ? languages.split(',') : ['English'],
    location,
    availability: getAvailabilityArray(),
    price
  };
  
  const features = [
    { icon: 'school', text: doctor.education },
    { icon: 'location-on', text: doctor.location },
    { icon: 'language', text: doctor.languages.join(', ') },
    { icon: 'attach-money', text: `Consultation: ${doctor.price}` }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Doctor Photo and Basic Info */}
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
        </View>

        {/* Short Description */}
        <View style={styles.descriptionCard}>
        <Text style={styles.descriptionText}>{doctor.description}</Text>
        </View>
        
        {/* Features */}
        <View style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>Details</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <MaterialIcons name={feature.icon} size={20} color="#007AFF" />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

         {/* Availability */}
        <View style={styles.availabilityCard}>
          <Text style={styles.sectionTitle}>
            {isWeekend() ? "Available Hours (Next Week)" : "Available Hours"}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.timeSlotsContainer}
          >
            {doctor.availability.map((time, index) => (
              <TouchableOpacity key={index} style={styles.timeSlot}>
                <Text style={styles.timeText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.availabilityNote}>
            {isWeekend() 
              ? "Today is weekend. Available hours for next working days." 
              : "For today: doctor's specific availability. For other days: 08:00-16:00"}
          </Text>
        </View>

        {/* Spacer for button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Book Appointment Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
          <FontAwesome5 name="calendar-check" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
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
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  spacer: {
    height: 100,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  descriptionCard: {
  backgroundColor: '#fff',
  margin: 16,
  padding: 20,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
descriptionText: {
  fontSize: 15,
  lineHeight: 22,
  color: '#555',
  textAlign: 'center',
},
featuresCard: {
  backgroundColor: '#fff',
  margin: 16,
  padding: 20,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#333',
  marginBottom: 15,
},
featureItem: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 12,
},
featureText: {
  fontSize: 14,
  color: '#555',
  marginLeft: 12,
  flex: 1,
  lineHeight: 20,
},
availabilityCard: {
  backgroundColor: '#fff',
  margin: 16,
  padding: 20,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
timeSlotsContainer: {
  paddingVertical: 10,
},
timeSlot: {
  backgroundColor: '#007AFF',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 8,
  marginRight: 10,
},
timeText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 14,
},
availabilityNote: {
  fontSize: 12,
  color: '#666',
  marginTop: 10,
  fontStyle: 'italic',
},
});