import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Header from "../../components/Header";

export default function Analytics() {
  const router = useRouter();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{ data: [23, 41, 32, 46, 35, 27, 43, 35, 29, 48, 22, 40] }],
  };

  const { width: screenWidth } = useWindowDimensions();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Patient Analytics" onBack={() => router.push("/doctor/home")} />

      <Text style={styles.subtitle}>Monthly Patient Visits</Text>

      <View style={styles.chartCard}>
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={250}
          fromZero
          showValuesOnTopOfBars
          chartConfig={{
            backgroundColor: "#e8f6f8",
            backgroundGradientFrom: "#f0f9ff",
            backgroundGradientTo: "#e0f2fe",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 126, 167, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(3, 61, 73, ${opacity})`,
            barPercentage: 0.6,
          }}
          style={styles.chart}
        />
      </View>

      {/* 🔹 Seksioni poshtë grafikut */}
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Insights & Observations</Text>
        <Text style={styles.insightText}>
          The number of patient visits shows an upward trend between March and October, 
          suggesting increased activity during mid-year. A noticeable drop appears in November,
          which may be linked to seasonal changes or reduced appointment bookings.
        </Text>
        <Text style={styles.insightHighlight}>
          💡 Recommendation: Consider scheduling awareness campaigns during early winter to 
          maintain steady patient engagement and preventive care visits.
        </Text>
      </View>

      <Text style={styles.footerNote}>
        Data generated from MediCare system reports · Last updated: October 2025
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#e8f6f8",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#033d49",
    marginBottom: 20,
    marginTop: 30,
    fontWeight: "600",
  },
  chartCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 18,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#d4f1f4",
  },
  chart: {
    borderRadius: 16,
  },
  insightCard: {
    marginTop: 25,
    backgroundColor: "#fbfcfcff",
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#007ea7",
    shadowColor: "#007ea7",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#045d75",
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: "#064663",
    lineHeight: 20,
    textAlign: "justify",
    marginBottom: 8,
  },
  insightHighlight: {
    fontSize: 14,
    color: "#0369a1",
    fontWeight: "600",
    lineHeight: 20,
  },
  footerNote: {
    fontSize: 12,
    color: "#0f4c5c",
    marginTop: 30,
    fontStyle: "italic",
  },
});
