import { ScrollView, Text, View } from "react-native";

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
