import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";

export default function PatientProfile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E9F8F9" }}>
      <ProfileCard roleType="Pacient" homePath="/(patient)/home" />
    </SafeAreaView>
  );
}
