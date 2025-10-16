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
    <ScrollView style={styles.container}>
      <Header
        title="Create Prescription"
        onBack={() => router.push("/doctor/home")}
      />

      {showForm && (
        <View>
          <Text style={styles.title}>Prescription Details</Text>

          {[
            "Patient Name",
            "Diagnosis",
            "Medications",
            "Treatment Steps",
            "Additional Notes",
          ].map((placeholder, idx) => (
            <TextInput
              key={idx}
              placeholder={placeholder}
              style={[
                styles.input,
                placeholder === "Additional Notes" ? { height: 80 } : {},
              ]}
              value={
                placeholder === "Patient Name"
                  ? patient
                  : placeholder === "Diagnosis"
                  ? diagnosis
                  : placeholder === "Medications"
                  ? medications
                  : placeholder === "Treatment Steps"
                  ? steps
                  : notes
              }
              onChangeText={
                placeholder === "Patient Name"
                  ? setPatient
                  : placeholder === "Diagnosis"
                  ? setDiagnosis
                  : placeholder === "Medications"
                  ? setMedications
                  : placeholder === "Treatment Steps"
                  ? setSteps
                  : setNotes
              }
              multiline={placeholder === "Additional Notes"}
            />
          ))}

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
              <TouchableOpacity
                style={[styles.halfButton, { backgroundColor: "#007ea7" }]}
                onPress={handleViewRecipe}
              >
                <Text style={styles.buttonText}>View Prescription</Text>
              </TouchableOpacity>
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

      {viewRecipe && (
        <View style={styles.detailsContainer}>
          <ScrollView contentContainerStyle={styles.detailsContent}>
            <Text style={styles.title}>Prescription Details</Text>
            <Text style={styles.label}>Patient: {patient}</Text>
            <Text style={styles.label}>Diagnosis: {diagnosis}</Text>
            <Text style={styles.label}>Medications: {medications}</Text>
            <Text style={styles.label}>Treatment Steps: {steps}</Text>
            {notes ? <Text style={styles.label}>Notes: {notes}</Text> : null}
            <Text style={styles.label}>Urgency: {urgency}</Text>

            <View style={styles.dualButtonContainer}>
              <TouchableOpacity
                style={[styles.halfButton, { backgroundColor: "#28a745" }]}
                onPress={handleSend}
              >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.halfButton, { backgroundColor: "#6c757d" }]}
                onPress={() => {
                  setViewRecipe(false);
                  setShowForm(true);
                }}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Modals */}
      {[
        {
          modal: modalVisible,
          set: setModalVisible,
          text: "Prescription generated successfully!",
          color: "#007ea7",
          action: handleViewRecipe,
        },
        {
          modal: sendModal,
          set: setSendModal,
          text: "Sent to patient successfully!",
          color: "#28a745",
          action: handleClear,
        },
        {
          modal: deleteModal,
          set: setDeleteModal,
          text: "Deleted successfully!",
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
  button: {
    backgroundColor: "#48c774",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#48c774",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  label: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 6,
    color: "#033d49",
    textShadowColor: "rgba(0,0,0,0.05)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  urgencyText: {
    fontWeight: "700",
    textAlign: "center",
    color: "#033d49",
    fontSize: 15,
  },
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
    backgroundColor: "#f7f9fb",
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
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
