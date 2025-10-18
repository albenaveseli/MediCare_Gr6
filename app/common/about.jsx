import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import InfoSection from "../../components/InfoSection";

export default function About() {
  const { role } = useLocalSearchParams();


  const handleBack = () => {
    if (role === "doctor") router.replace("/doctor/profile");
    else router.replace("/patient/profile");
  };
  return (
    <View style={styles.container}>
      <Header title="About MediCare" onBack={handleBack} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <InfoSection title="What is MediCare?" style={styles.card}>
          <Text style={styles.description}>
            MediCare is a mobile application developed for comprehensive management
            of patient-doctor relationships and all hospital services. The platform
            provides a simple and secure way for booking appointments, online consultations,
            and accessing medical documents.
          </Text>
        </InfoSection>

        <InfoSection title="Key Features" style={styles.card}>
          <View style={styles.featureList}>
            {[
              "✓ Secure Registration & Login",
              "✓ Online appointment booking",
              "✓ Personalized dashboard",
              "✓ Medical document management",
              "✓ GPS & Hospital Finder",
              "✓ Electronic Prescription (E-Recipe)",
              "✓ Notifications and reminders",
              "✓ Emergency / SOS",
              "✓ Medication reminders",
              "✓ Analytics for doctors",
            ].map((feature, index) => (
              <Text key={index} style={styles.feature}>
                {feature}
              </Text>
            ))}
          </View>
        </InfoSection>

        <InfoSection title="Who is MediCare For?" style={styles.card}>
          <View style={styles.audienceContainer}>
            <View style={styles.audienceBox}>
              <Text style={styles.audienceTitle}>For Doctors</Text>
              <Text style={styles.audienceText}>
                Manage your schedule, monitor patients, and improve work efficiency.
              </Text>
            </View>
            <View style={styles.audienceBox}>
              <Text style={styles.audienceTitle}>For Patients</Text>
              <Text style={styles.audienceText}>
                Manage your health in an organized way and receive personalized care.
              </Text>
            </View>
          </View>
        </InfoSection>

        <InfoSection title="Development Team" style={styles.card}>
          <Text style={styles.teamText}>
            This application was developed by a team of students from the Faculty of
            Electrical and Computer Engineering (FIEK):
          </Text>
          <View style={styles.teamList}>
            {[
              "Albena Veseli",
              "Amela Syla",
              "Anita Cacaj",
              "Ardit Hyseni",
              "Dua Gashi",
              "Erzana Beqaj",
            ].map((member, index) => (
              <Text key={index} style={styles.teamMember}>
                • {member}
              </Text>
            ))}
          </View>
        </InfoSection>

        <InfoSection title="Contact" style={styles.card}>
          <Text style={styles.contactText}>
            For any questions or assistance, please contact us at:{"\n"}
            support@medicare.com{"\n"}+355 123 456 789
          </Text>
        </InfoSection>

        <Text style={styles.version}>Version 1.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6f8",
  },
  scrollView: {
    width: "100%",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#033d49",
    textAlign: "justify",
  },
  featureList: {
    marginTop: 5,
  },
  feature: {
    fontSize: 14,
    color: "#007ea7",
    marginBottom: 6,
    lineHeight: 20,
  },
  audienceContainer: {
    flexDirection: "column",
    gap: 12,
  },
  audienceBox: {
    backgroundColor: "#b9ecf0",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  audienceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#033d49",
    marginBottom: 5,
  },
  audienceText: {
    fontSize: 13,
    color: "#4a6572",
    lineHeight: 18,
  },
  teamText: {
    fontSize: 14,
    color: "#4a6572",
    marginBottom: 10,
    lineHeight: 20,
  },
  teamList: {
    marginLeft: 10,
  },
  teamMember: {
    fontSize: 13,
    color: "#033d49",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: "#4a6572",
    lineHeight: 22,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#6c757d",
    marginTop: 10,
    marginBottom: 20,
    fontStyle: "italic",
  },
});
