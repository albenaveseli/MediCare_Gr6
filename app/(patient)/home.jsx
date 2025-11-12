import DashboardLayout from "../../components/DashboardLayout";

export default function Home() {
  const pages = [
    { title: "Doctor List", icon: "people-outline", path: "/(patient)/doctor-list" },
    { title: "View E-Recipe", icon: "medkit-outline", path: "/(patient)/view-recipe" },
    { title: "Reminder", icon: "alarm-outline", path: "/(patient)/reminder" },
    { title: "History", icon: "person-circle-outline", path: "/(patient)/history" },
    { title: "Hospital Finder", icon: "location-outline", path: "/(patient)/hospital-finder" },
  ];

  return (
    <DashboardLayout
      title="MediCare Dashboard"
      subtitle="Select a section to continue"
      welcomeTitle="Welcome 🌿"
      welcomeText="Manage your appointments, view prescriptions, and stay connected with your doctors anytime, anywhere."
      pages={pages}
    />
  );
}
