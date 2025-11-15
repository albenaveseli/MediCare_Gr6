import { router } from "expo-router";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import { auth, db } from "../../firebase";

export default function Analytics() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const doctorQuery = query(
          collection(db, "doctors"),
          where("email", "==", user.email)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (doctorSnapshot.empty) {
          console.warn("⚠️ Doctor profile not found for analytics.");
          setLoading(false);
          return;
        }

        const doctorDoc = doctorSnapshot.docs[0];
        const doctorId = doctorDoc.id;

        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("doctorId", "==", doctorId)
        );

        const unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
          const monthlyCounts = {
            Jan: 0,
            Feb: 0,
            Mar: 0,
            Apr: 0,
            May: 0,
            Jun: 0,
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0,
          };

          snapshot.forEach((docSnap) => {
            const data = docSnap.data();

            if (data.status?.toLowerCase() === "approved" && data.date) {
              try {
                const dateObj = new Date(data.date);
                const monthName = dateObj.toLocaleString("en-US", {
                  month: "short",
                });
                if (monthlyCounts[monthName] !== undefined) {
                  monthlyCounts[monthName] += 1;
                }
              } catch (err) {
                console.log("Invalid date format:", data.date);
              }
            }
          });

          const formattedData = Object.entries(monthlyCounts).map(
            ([month, visits]) => ({
              month,
              visits,
            })
          );

          setMonthlyData(formattedData);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#007ea7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Patient Analytics"
        onBack={() => router.push("/(doctor)/home")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Monthly Patient Visits</Text>

        {monthlyData.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.month}>{item.month}</Text>
            <Text style={styles.visits}>Visits: {item.visits}</Text>
          </View>
        ))}

        <View style={styles.insightCard}>
          <Text style={styles.title}>Insights & Observations</Text>
          <Text style={styles.text}>
            Data shows monthly distribution of patient visits based on real
            appointment records.
          </Text>
          <Text style={styles.highlight}>
            💡 Keep track of your busiest months to manage your schedule
            effectively!
          </Text>
        </View>

        <Text style={styles.footer}>
          Data from MediCare system · Updates automatically when appointments
          are approved ✅
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8" },
  content: { padding: 20 },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#033d49",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  month: { fontSize: 16, fontWeight: "700", color: "#007ea7" },
  visits: { fontSize: 14, color: "#064663", marginTop: 4 },
  insightCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#045d75", marginBottom: 6 },
  text: { fontSize: 14, color: "#064663", lineHeight: 20, marginBottom: 6 },
  highlight: { fontSize: 14, color: "#0369a1", fontWeight: "600" },
  footer: {
    fontSize: 12,
    color: "#0f4c5c",
    fontStyle: "italic",
    marginTop: 20,
    textAlign: "center",
  },
});
