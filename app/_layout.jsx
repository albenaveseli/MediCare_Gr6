
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { db } from "../firebase";

function RootNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const { user, loading } = useAuth();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);


  const path = useMemo(() => `/${segments.join("/")}`, [segments]);

  useEffect(() => {
    let cancelled = false;

    const loadRole = async () => {
      if (!user) {
        setRole(null);
        setRoleLoading(false);
        return;
      }

      setRoleLoading(true);

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const r = snap.exists() ? snap.data()?.role : null;
        if (!cancelled) setRole(r || "patient"); // fallback te patient
      } catch (e) {
        if (!cancelled) setRole("patient");
      } finally {
        if (!cancelled) setRoleLoading(false);
      }
    };

    loadRole();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inDoctorGroup = segments[0] === "(doctor)";
    const inPatientGroup = segments[0] === "(patient)";

   
    const isOnboarding = path === "/(auth)/onboarding";

 
    if (!user) {
      if (!inAuthGroup) router.replace("/");
      return;
    }

   
    if (roleLoading) return;

   
    if (inAuthGroup && !isOnboarding) {router.replace("/(patient)/home");
      return;
    }

   
    if (role === "doctor" && inPatientGroup) {
      router.replace("/(doctor)/home");
      return;
    }

    if (role === "patient" && inDoctorGroup) {
      router.replace("/(patient)/home");
      return;
    }
  }, [user, loading, role, roleLoading, segments, router, path]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, gestureEnabled: false }} />
    </>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
