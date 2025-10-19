import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";
export default function DoctorProfile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E9F8F9" }}>
      <ProfileCard roleType="Doctor" homePath="/(doctor)/home" />
    </SafeAreaView>
  );
}
