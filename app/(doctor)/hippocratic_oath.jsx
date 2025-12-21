import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
//  OPTIMIZIMI 1: Zëvendësojmë ScrollView me FlatList nga react-native
import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";

export default function DoctorOath() {
  const oathSections = [
    {
      icon: "healing",
      text: "I swear by Apollo the physician, by Asclepius, by Hygieia, by Panacea, and by all the gods and goddesses, making them my witnesses, that I will fulfill according to my ability and judgment this oath and this covenant:",
    },
    {
      icon: "school",
      text: "I will respect the hard-won scientific gains of those physicians in whose steps I walk, and gladly share such knowledge as is mine with those who are to follow.",
    },
    {
      icon: "balance",
      text: "I will apply, for the benefit of the sick, all measures which are required, avoiding those twin traps of overtreatment and therapeutic nihilism.",
    },
    {
      icon: "emoji-people",
      text: "I will remember that there is art to medicine as well as science, and that warmth, sympathy, and understanding may outweigh the surgeon's knife or the chemist's drug.",
    },
    {
      icon: "group",
      text: "I will not be ashamed to say 'I know not,' nor will I fail to call in my colleagues when the skills of another are needed for a patient's recovery.",
    },
    {
      icon: "privacy-tip",
      text: "I will respect the privacy of my patients, for their problems are not disclosed to me that the world may know. Most especially must I tread with care in matters of life and death.",
    },
    {
      icon: "public",
      text: "I will remember that I remain a member of society, with special obligations to all my fellow human beings, those sound of mind and body as well as the infirm.",
    },
    {
      icon: "celebration",
      text: "If I do not violate this oath, may I enjoy life and art, respected while I live and remembered with affection thereafter. May I always act so as to preserve the finest traditions of my calling and may I long experience the joy of healing those who seek my help.",
    },
  ];

  // OPTIMIZIMI 2: Krijojmë një funksion RenderItem për FlatList
  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.sectionCard}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={item.icon} size={24} color="#00A3B5" />
      </View>
      <Text style={styles.sectionText}>{item.text}</Text>
    </View>
  );

  // OPTIMIZIMI 3: Krijojmë një Header Component për FlatList
  const ListHeader = () => (
    <View style={styles.headerCard}>
      <MaterialIcons name="medical-services" size={32} color="#00A3B5" />
      <Text style={styles.title}>Hippocratic Oath</Text>
      <Text style={styles.subtitle}>The Physician's Pledge</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Doctor's Oath"
        onBack={() => router.push("/(doctor)/home")}
      />
      
      {/*   OPTIMIZIMI 4: Zëvendësojmë ScrollView me FlatList */}
      <FlatList
        data={oathSections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeader} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FA",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20, 
    shadowColor: "#00A3B5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 163, 181, 0.1)",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#005A78",
    marginTop: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#00A3B5",
    fontWeight: "600",
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16, 
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#00A3B5",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 163, 181, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginTop: 2,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#033D49",
    flex: 1,
    textAlign: "left",
  }
});