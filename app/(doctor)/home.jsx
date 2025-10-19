import DashboardLayout from "../../components/DashboardLayout";

export default function Home() {
  const pages = [
    { title: "Analytics", icon: "bar-chart-outline", path: "/(doctor)/analytics" },
    { title: "E-Recipe", icon: "medkit-outline", path: "/(doctor)/erecipe" },
  ];

  return (
    <DashboardLayout
      welcomeTitle="Welcome Doctor 🌿"
      welcomeText="Monitor patient data, create prescriptions, and manage analytics all in one place. Your digital clinic companion is here."
      pages={pages}
      quoteText="The art of medicine consists of amusing the patient while nature cures the disease."
      quoteAuthor="– Voltaire"
      footerText="Stay healthy with MediCare 💙"
    />
  );
}
