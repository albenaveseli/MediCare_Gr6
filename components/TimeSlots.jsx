import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TimeSlots({ slots, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {slots.map((time, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.timeSlot,
            selected === time && styles.selectedSlot,
          ]}
          onPress={() => onSelect && onSelect(time)}
        >
          <Text
            style={[styles.timeText, selected === time && styles.selectedText]}
          >
            {time}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  timeSlot: {
    backgroundColor: "#007ea7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  selectedSlot: { backgroundColor: "#005f80" },
  timeText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  selectedText: { color: "#e8f6f8" },
});
