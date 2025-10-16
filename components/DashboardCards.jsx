import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashboardCards({ pages }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {pages.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => router.push(item.path)}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={28} color="#1a73e8" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={22} color="#94a3b8" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 40 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconContainer: {
    backgroundColor: "#e0edff",
    borderRadius: 12,
    padding: 10,
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
});
