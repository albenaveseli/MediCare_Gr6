import { ScrollView, StyleSheet, Text, useWindowDimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function Analytics() {
  const data = {
    labels: ["Janary", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    datasets: [
      {
        data: [23, 41, 32, 46, 35, 27, 43, 35, 29, 48, 22, 40],
      },
    ],
  };

  const {width: screenWidth} = useWindowDimensions();

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <Text style={styles.title}>Patient Analytics</Text>
      <Text style={styles.subtitle}>Monthly Patient Visits</Text>

      <BarChart
      data={data}
      width={screenWidth - 40}
      height={250}
      fromZero
      showValuesOnTopOfBars
      chartConfig={{
        backgroundColor: "#e0f2fe",
        backgroundGradientFrom: "#f0f9ff",
        backgroundGradientTo: "#e0f2fe",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(26, 115, 232, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
        barPercentage: 0.6,
      }}
      style = {styles.chart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a73e8",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 20,
  },
  chart: {
    bordwrRadius: 16,
  },
});
