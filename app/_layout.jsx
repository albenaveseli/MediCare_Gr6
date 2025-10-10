import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { color: "#333" },
          headerBackTitleVisible: false,
        }}
      />
    </>
  );
}
