import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase";

export default function ProfileCard({ roleType = "Patient" }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("Female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("No");

  
  const [doctorDetails, setDoctorDetails] = useState(null);

  const role = roleType;
  
  const getPatientAvatar = () => {
    if (gender === "F") {
      return "https://www.w3schools.com/howto/img_avatar2.png"; 
    } else if (gender === "M") {
      return "https://www.w3schools.com/howto/img_avatar.png"; 
    } else {
      return "https://www.w3schools.com/howto/img_avatar.png"; 
    }
  };

  
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        if (role === "doctor") {
          const doctorsRef = collection(db, "doctors");
          const q = query(doctorsRef, where("email", "==", user.email));
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const docData = snapshot.docs[0].data();
            setName(docData.name || "");
            setEmail(docData.email || "");
            setBirthdate("");
            setGender("");
            setHeight("");
            setWeight("");
            setAllergies("");

            setDoctorDetails({
              description: docData.description,
              education: docData.education,
              experience: docData.experience,
              image: docData.image,
              languages: docData.languages,
              rating: docData.rating,
              price: docData.price,
              speciality: docData.specialty,
            });
          }
          setLoading(false);
        } else {
          
          const usersQuery = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const usersSnapshot = await getDocs(usersQuery);
          let fullName = "";
          if (!usersSnapshot.empty) {
            fullName = usersSnapshot.docs[0].data().fullName || "";
          }

          const patientsQuery = query(
            collection(db, "patients"),
            where("userId", "==", user.uid)
          );
          const unsubscribe = onSnapshot(patientsQuery, (querySnapshot) => {
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
            const data = lastDoc?.data();

            setName(fullName); 
            setEmail(data?.email || user.email || "");
            setBirthdate(data?.birthDate || "");
            setGender(data?.gender || "Female");
            setHeight(data?.height?.toString() || "");
            setWeight(data?.weight?.toString() || "");
            setAllergies(data?.hasAllergy ? "Yes" : "No");

            setDocId(lastDoc?.id || null);
            setLoading(false);
          });

          return () => unsubscribe();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007ea7" />
      </View>
    );
  }

  const handleSave = async () => {
    if (!docId) {
      Alert.alert("Error", "Document not found");
      return;
    }

    setIsEditing(false);
    try {
      const user = auth.currentUser;
      if (!user) return;

      await setDoc(
        doc(db, "patients", docId),
        {
          name,
          email,
          birthDate: birthdate,
          gender,
          height: Number(height),
          weight: Number(weight),
          hasAllergy: allergies === "Yes",
        },
        { merge: true }
      );

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been logged out successfully!");
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView   style={{ flex: 1, backgroundColor: "#E9F8F9" }}
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
    >
      <View style={styles.infoCard}>
        {role === "doctor" && doctorDetails ? (
          <>
            <Image
              source={{ uri: doctorDetails.image }}
              style={styles.profileImage}
            />
            <Text style={styles.label}>👨‍⚕️ Name: {name}</Text>
            <Text style={styles.label}>📧 Email: {email}</Text>
            <Text style={styles.label}>🏥 Speciality: {doctorDetails.speciality}</Text>
            <Text style={styles.label}>💰 Price: {doctorDetails.price}</Text>
            <Text style={styles.label}>⭐ Rating: {doctorDetails.rating}</Text>
            <Text style={styles.label}>🎓 Education: {doctorDetails.education}</Text>
            <Text style={styles.label}>🩺 Experience: {doctorDetails.experience}</Text>
            <Text style={styles.label}>🌍 Languages: {doctorDetails.languages.join(", ")}</Text>
            <Text style={styles.label}>📝 Description: {doctorDetails.description}</Text>
          </>
        ) : (
          <>
            
            <Image
              source={{ uri: getPatientAvatar() }}
              style={styles.profileImage}
            />

            {isEditing ? (
              <>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#007ea7"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Full Name"
                    editable={false} 
                  />
                </View>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#007ea7"
                    style={styles.icon}
                  />
                  <TextInput
                   style={[styles.input, { backgroundColor: "#e6ecee" }]} 
                   value={email}
                   editable={false}       
                   selectTextOnFocus={false} 
                   placeholder="Email"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#007ea7"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    value={birthdate}
                    onChangeText={setBirthdate}
                    placeholder="Birthdate (YYYY-MM-DD)"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="male-female-outline"
                    size={20}
                    color="#007ea7"
                    style={styles.icon}
                  />
                  <View style={styles.pickerContainer}>
                    <Picker selectedValue={gender} onValueChange={setGender}>
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="resize-outline"
                    size={20}
                    color="#007ea7"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={setHeight}
                    placeholder="Height (cm)"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="barbell-outline"
                    size={20}
                    color="#007ea7"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Weight (kg)"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Ionicons
                    name="medkit-outline"
                    size={20}
                    color="#007ea7"
                    style={styles.icon}
                  />
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={allergies}
                      onValueChange={setAllergies}
                    >
                      <Picker.Item label="Yes" value="Yes" />
                      <Picker.Item label="No" value="No" />
                    </Picker>
                  </View>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>👤 Name: {name}</Text>
                <Text style={styles.label}>📧 Email: {email}</Text>
                <Text style={styles.label}>🎂 Birth Date: {birthdate}</Text>
                <Text style={styles.label}>⚧ Gender: {gender}</Text>
                <Text style={styles.label}>📏 Height: {height} cm</Text>
                <Text style={styles.label}>⚖️ Weight: {weight} kg</Text>
                <Text style={styles.label}>🤧 Medication Allergy: {allergies}</Text>
              </>
            )}
          </>
        )}

        <View style={styles.buttonsContainer}>
          {role !== "doctor" && (
            <>
              {isEditing ? (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEdit}
                >
                  <Text style={styles.editText}>Edit Profile</Text>
                </TouchableOpacity>
              )}
            </>
          )}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   paddingVertical: 20,
   paddingHorizontal: 10,
   backgroundColor: "#E9F8F9",
  },

  infoCard: {
    width: "92%",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 25,

    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,

    borderWidth: 1,
    borderColor: "#dff6ff",
    alignSelf: "center",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,

   
    borderWidth: 3,
    borderColor: "#c8f1ff",
    shadowColor: "#5cd6ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  label: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 14,
    color: "#033d49",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f6fdff",
    borderRadius: 10,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  icon: {
    marginRight: 12,
  },

  pickerContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f2f9fb",
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },

  input: {
    flex: 1,
    backgroundColor: "#f2f9fb",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },

  buttonsContainer: {
    marginTop: 25,
    gap: 14,
  },

  editButton: {
    backgroundColor: "#4DB8FF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#4DB8FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  saveButton: {
    backgroundColor: "#007ea7",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  logoutButton: {
    backgroundColor: "#d9f6ff",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#007ea7",
    fontSize: 16,
    fontWeight: "700",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
