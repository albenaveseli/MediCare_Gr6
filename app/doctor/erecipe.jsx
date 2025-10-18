import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

export default function ERecipeScreen() {
  const router = useRouter();

  const [patient, setPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState("");
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [urgency, setUrgency] = useState("Normal");

  const [generated, setGenerated] = useState(false);
  const [viewRecipe, setViewRecipe] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [sendModal, setSendModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleGenerate = () => {
    if (!diagnosis || !medications || !steps) return;
    setGenerated(true);
    setModalVisible(true);
  };

  const handleViewRecipe = () => {
    setModalVisible(false);
    setShowForm(false);
    setViewRecipe(true);
  };

  const handleClear = () => {
    setPatient("");
    setDiagnosis("");
    setMedications("");
    setSteps("");
    setNotes("");
    setUrgency("Normal");
    setGenerated(false);
    setViewRecipe(false);
    setShowForm(true);
  };

  const handleSend = () => setSendModal(true);
  const handleDelete = () => setDeleteModal(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#e8f6f8" }}>
      <Header
        title={viewRecipe ? "View Prescription" : "Create Prescription"}
        onBack={() => {
          if (viewRecipe) {
            setViewRecipe(false);
            setShowForm(true);
          } else {
            router.push("/doctor/home");
          }
        }}
      />

      <ScrollView style={styles.container}>
        {/* FORM VIEW */}
        {showForm && (
          <View>
            <Text style={styles.title}>Prescription Details</Text>

            {[
              {
                placeholder: "Patient Name",
                value: patient,
                setter: setPatient,
              },
              {
                placeholder: "Diagnosis",
                value: diagnosis,
                setter: setDiagnosis,
              },
              {
                placeholder: "Medications (separate with commas)",
                value: medications,
                setter: setMedications,
              },
              {
                placeholder: "Treatment Steps",
                value: steps,
                setter: setSteps,
              },
            ].map((field, idx) => (
              <TextInput
                key={idx}
                placeholder={field.placeholder}
                placeholderTextColor="#9fb3bd"
                style={styles.input}
                value={field.value}
                onChangeText={field.setter}
              />
            ))}

            <TextInput
              placeholder="Additional Notes"
              placeholderTextColor="#9fb3bd"
              style={[styles.input, { height: 80 }]}
              multiline
              value={notes}
              onChangeText={setNotes}
            />

            <Text style={styles.label}>Urgency Level</Text>
            <View style={styles.urgencyContainer}>
              {["Normal", "Medium", "Emergency"].map((level) => {
                const colors = {
                  Normal: "#48c774",
                  Medium: "#f1c40f",
                  Emergency: "#e74c3c",
                };
                return (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.urgencyButton,
                      { borderColor: colors[level] },
                      urgency === level && { backgroundColor: colors[level] },
                    ]}
                    onPress={() => setUrgency(level)}
                  >
                    <Text style={styles.urgencyText}>{level}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGenerate}>
              <Text style={styles.buttonText}>Generate Prescription</Text>
            </TouchableOpacity>

            {generated && (
              <View style={styles.dualButtonContainer}>
                {/* <TouchableOpacity
                  style={[styles.halfButton, { backgroundColor: "#007ea7" }]}
                  onPress={handleViewRecipe}
                >
                  <Text style={styles.buttonText}>View Prescription</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={[styles.halfButton, { backgroundColor: "#6c757d" }]}
                  onPress={handleClear}
                >
                  <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* VIEW PRESCRIPTION */}
        {viewRecipe && (
          <View style={styles.detailsContainer}>
            <ScrollView contentContainerStyle={styles.detailsContent}>
              <View style={styles.detailsHeaderRow}>
                <View>
                  <Text style={styles.detailsDoctor}>Dr. Ardit Hyseni</Text>
                  <Text style={styles.detailsProfession}>Cardiologist</Text>
                </View>
                <Text style={styles.detailsDate}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>

              <View
                style={[
                  styles.separator,
                  urgency === "Emergency"
                    ? { backgroundColor: "#e74c3c" }
                    : urgency === "Medium"
                    ? { backgroundColor: "#f1c40f" }
                    : { backgroundColor: "#48c774" },
                ]}
              />

              {[
                { label: "Patient", value: patient },
                { label: "Diagnosis", value: diagnosis },
                {
                  label: "Medications",
                  value: medications
                    .split(",")
                    .map((m, i) => `• ${m.trim()}`)
                    .join("\n"),
                },
                { label: "Treatment Steps", value: steps },
                notes && { label: "Additional Notes", value: notes },
              ]
                .filter(Boolean)
                .map((section, idx) => (
                  <View key={idx} style={styles.cardSection}>
                    <Text style={styles.label}>{section.label}</Text>
                    <Text style={styles.value}>{section.value}</Text>
                  </View>
                ))}

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: "#28a745", marginBottom: 10 },
                ]}
                onPress={handleSend}
              >
                <Text style={styles.modalButtonText}>Send to Patient</Text>
              </TouchableOpacity>

              <View style={styles.dualButtonContainer}>
                <TouchableOpacity
                  style={[styles.halfButton, { backgroundColor: "#e74c3c" }]}
                  onPress={handleDelete}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[styles.halfButton, { backgroundColor: "#6c757d" }]}
                  onPress={() => {
                    setViewRecipe(false);
                    setShowForm(true);
                  }}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity> */}
              </View>
            </ScrollView>
          </View>
        )}

        {/* MODALS */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.successText}>
                Prescription generated successfully!
              </Text>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#007ea7" }]}
                  onPress={handleViewRecipe}
                >
                  <Text style={styles.modalButtonText}>View Prescription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#48c774" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* OTHER MODALS */}
        {[
          {
            modal: sendModal,
            set: setSendModal,
            text: `Prescription successfully sent to ${
              patient || "the patient"
            }!`,
            color: "#28a745",
            action: handleClear,
          },
          {
            modal: deleteModal,
            set: setDeleteModal,
            text: "Prescription deleted successfully!",
            color: "#e74c3c",
            action: handleClear,
          },
        ].map((m, idx) => (
          <Modal key={idx} visible={m.modal} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.successText}>{m.text}</Text>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: m.color }]}
                  onPress={() => {
                    m.set(false);
                    m.action();
                  }}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8", padding: 15 },
  title: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 15,
    marginTop: 30,
    color: "#007ea7",
    textAlign: "center",
    textShadowColor: "rgba(0, 126, 167, 0.3)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cfdce6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    fontSize: 16,
    color: "#033d49",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 6,
    color: "#2b8fb0ff",
  },
  button: {
    backgroundColor: "#48c774",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  urgencyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  urgencyButton: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderWidth: 2,
  },
  urgencyText: { fontWeight: "700", textAlign: "center", color: "#033d49" },
  dualButtonContainer: { flexDirection: "row", gap: 12, marginTop: 12 },
  halfButton: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#e8f6f8",
    marginVertical: 10,
    borderRadius: 16,
    padding: 15,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  detailsContent: { padding: 10 },
  detailsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailsDoctor: { fontSize: 25, fontWeight: "900", color: "#007ea7" },
  detailsProfession: { fontSize: 20, color: "#033d49" },
  detailsDate: { fontSize: 15, color: "#033d49" },
  separator: { height: 5, borderRadius: 3, marginVertical: 20 },
  cardSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  value: { fontSize: 16, color: "#000000ff", marginTop: 4 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#007ea7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  successText: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#033d49",
  },
  modalButtonRow: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
