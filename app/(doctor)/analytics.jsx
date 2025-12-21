import { router } from "expo-router";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

export default function Analytics() {
  const { user, loading: authLoading } = useAuth(); 

  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderedCards = useMemo(
    () =>
      monthlyData.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.month}>{item.month}</Text>
          <Text style={styles.visits}>Visits: {item.visits}</Text>
        </View>
      )),
    [monthlyData]
  );

  const onBack = useCallback(() => {
    router.push("/(doctor)/home");
  }, []);

  useEffect(() => {
    let unsubscribe = null;

    const fetchAnalytics = async () => {
      try {
        if (authLoading) return;

        if (!user) {
          setLoading(false);
          return;
        }

        setLoading(true);

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

        const doctorId = doctorSnapshot.docs[0].id;

        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("doctorId", "==", doctorId)
        );

        unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
          const monthlyCounts = {
            Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
            Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
          };

          snapshot.forEach((docSnap) => {
            const data = docSnap.data();

            if (data.status?.toLowerCase() === "approved" && data.date) {
              try {
                const dateObj = new Date(data.date);
                const monthName = dateObj.toLocaleString("en-US", { month: "short" });
                if (monthlyCounts[monthName] !== undefined) {
                  monthlyCounts[monthName] += 1;
                }
              } catch {
                console.log("Invalid date format:", data.date);
              }
            }
          });

          const formattedData = Object.entries(monthlyCounts).map(
            ([month, visits]) => ({ month, visits })
          );

          setMonthlyData(formattedData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, authLoading]); 

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#007ea7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Patient Analytics" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.content}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.subtitle}>Monthly Patient Visits</Text>

        {renderedCards}

        <View style={styles.insightCard}>
          <Text style={styles.title}>Insights & Observations</Text>
          <Text style={styles.text}>
            Data shows monthly distribution of patient visits based on real
            appointment records.
          </Text>
          <Text style={styles.highlight}>
            💡 Keep track of your busiest months to manage your schedule effectively!
          </Text>
        </View>

        <Text style={styles.footer}>
          Data from MediCare system · Updates automatically when appointments are approved ✅
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
