import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}> About MediCare</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is MediCare?</Text>
          <Text style={styles.description}>
            MediCare is a mobile application developed for comprehensive management of patient-doctor relationships 
            and all hospital services. The platform provides a simple and secure way for booking appointments, 
            online consultations, and accessing medical documents.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>✓ Secure Registration & Login</Text>
            <Text style={styles.feature}>✓ Online appointment booking</Text>
            <Text style={styles.feature}>✓ Personalized dashboard</Text>
            <Text style={styles.feature}>✓ Medical document management</Text>
            <Text style={styles.feature}>✓ GPS & Hospital Finder</Text>
            <Text style={styles.feature}>✓ Electronic Prescription (E-Recipe)</Text>
            <Text style={styles.feature}>✓ Notifications and reminders</Text>
            <Text style={styles.feature}>✓ Emergency / SOS</Text>
            <Text style={styles.feature}>✓ Medication reminders</Text>
            <Text style={styles.feature}>✓ Analytics for doctors</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who is MediCare For?</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Development Team</Text>
          <Text style={styles.teamText}>
            This application was developed by a team of students from the Faculty of Electrical and Computer Engineering (FIEK):
          </Text>
          <View style={styles.teamList}>
            <Text style={styles.teamMember}>• Albena Veseli</Text>
            <Text style={styles.teamMember}>• Amela Syla</Text>
            <Text style={styles.teamMember}>• Anita Cacaj</Text>
            <Text style={styles.teamMember}>• Ardit Hyseni</Text>
            <Text style={styles.teamMember}>• Dua Gashi</Text>
            <Text style={styles.teamMember}>• Erzana Beqaj</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.contactText}>
            For any questions or assistance, please contact us at:{"\n"}
             support@medicare.com{"\n"}
             +355 123 456 789
          </Text>
        </View>

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
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a3a6e",
    marginBottom: 12,
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