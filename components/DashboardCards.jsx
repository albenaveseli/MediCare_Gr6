import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashboardCards({ pages }) {
  return (
    <View style={styles.gridContainer}>
      {pages.map((item, index) => (
        <TouchableOpacity
          key={index}
          testID={`dashboard-card-${index}`}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => router.push(item.path)}
        >
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={28} color="#007ea7" />
            </View>
          </View>

          <Text testID={`dashboard-card-title-${index}`} style={styles.cardTitle}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 26,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },
  iconWrapper: {
    backgroundColor: "#e0f7fa",
    borderRadius: 50,
    padding: 12,
    marginBottom: 12,
  },
  iconCircle: {
    backgroundColor: "#b9ecf0",
    borderRadius: 50,
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#033d49",
    textAlign: "center",
    marginTop: 4,
  },
});
