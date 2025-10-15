import { ScrollView, StyleSheet, Text, View } from "react-native";
import InfoSection from "../../components/InfoSection";

export default function About() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>About MediCare</Text>

        <InfoSection title="What is MediCare?">
          <Text style={styles.description}>
            MediCare is a mobile application developed for comprehensive management
            of patient-doctor relationships and all hospital services. The platform
            provides a simple and secure way for booking appointments, online consultations,
            and accessing medical documents.
          </Text>
        </InfoSection>

        <InfoSection title="Key Features">
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

        <InfoSection title="Who is MediCare For?">
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

        <InfoSection title="Development Team">
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

        <InfoSection title="Contact">
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
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c5aa0",
    marginBottom: 25,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4a5568",
    textAlign: "justify",
  },
  featureList: {
    marginTop: 5,
  },
  feature: {
    fontSize: 14,
    color: "#2d3748",
    marginBottom: 6,
    lineHeight: 20,
  },
  audienceContainer: {
    flexDirection: "column",
    gap: 12,
  },
  audienceBox: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2c5aa0",
  },
  audienceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a3a6e",
    marginBottom: 5,
  },
  audienceText: {
    fontSize: 13,
    color: "#4a5568",
    lineHeight: 18,
  },
  teamText: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 10,
    lineHeight: 20,
  },
  teamList: {
    marginLeft: 10,
  },
  teamMember: {
    fontSize: 13,
    color: "#2d3748",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 22,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#718096",
    marginTop: 10,
    marginBottom: 20,
    fontStyle: "italic",
  },
});
