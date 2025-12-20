import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const AppointmentCard = ({ item, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY, index]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{item.doctorName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{item.time}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.status,
            item.status === "approved"
              ? styles.completed
              : item.status === "cancelled"
              ? styles.cancelled
              : styles.pending,
          ]}
        >
          {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
        </Text>
      </View>

      {item.notes ? (
        <View style={styles.row}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.value}>{item.notes}</Text>
        </View>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    color: "#4a6572",
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    color: "#1f3c88",
    fontWeight: "500",
    maxWidth: "60%",
  },
  status: {
    fontWeight: "bold",
    fontSize: 15,
  },
  completed: { color: "#28a745" },
  cancelled: { color: "#dc3545" },
  pending: { color: "#ffb300" },
});

export default AppointmentCard;