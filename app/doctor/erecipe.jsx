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

export default function ERecipeScreen() {
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

  const handleSend = () => {
    setSendModal(true);
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      {showForm && (
        <View>
          <Text style={styles.title}>Create Prescription</Text>

          <TextInput
            placeholder="Patient Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={patient}
            onChangeText={setPatient}
          />

          <TextInput
            placeholder="Diagnosis"
            placeholderTextColor="#999"
            style={styles.input}
            value={diagnosis}
            onChangeText={setDiagnosis}
          />

          <TextInput
            placeholder="Medications"
            placeholderTextColor="#999"
            style={styles.input}
            value={medications}
            onChangeText={setMedications}
          />

          <TextInput
            placeholder="Treatment Steps"
            placeholderTextColor="#999"
            style={styles.input}
            value={steps}
            onChangeText={setSteps}
          />

          <TextInput
            placeholder="Additional Notes"
            placeholderTextColor="#999"
            style={[styles.input, { height: 80 }]}
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <Text style={styles.label}>Urgency Level</Text>
          <View style={styles.urgencyContainer}>
            {["Normal", "Medium", "Emergency"].map((level) => {
              const colors = {
                Normal: "#2ecc71",
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
                style={[styles.halfButton, { backgroundColor: "#007bff" }]}
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

      {/* Prescription View */}
      {viewRecipe && (
        <View style={styles.detailsContainer}>
          <ScrollView contentContainerStyle={styles.detailsContent}>
            {/* Header */}
            <View style={styles.detailsHeaderRow}>
              <View>
                <Text style={styles.detailsDoctor}>Dr. Ardit Hyseni</Text>
                <Text style={styles.detailsProfession}>Cardiologist</Text>
              </View>
              <Text style={styles.detailsDate}>{new Date().toLocaleDateString()}</Text>
            </View>

            {/* Separator with urgency color */}
            <View
              style={[
                styles.separator,
                urgency === "Emergency"
                  ? { backgroundColor: "#e74c3c" }
                  : urgency === "Medium"
                  ? { backgroundColor: "#f1c40f" }
                  : { backgroundColor: "#2ecc71" },
              ]}
            />

            {/* Card Sections */}
            <View style={styles.cardSection}>
              <Text style={styles.label}>Diagnosis</Text>
              <Text style={styles.value}>{diagnosis}</Text>
            </View>

            <View style={styles.cardSection}>
              <Text style={styles.label}>Medications</Text>
              {medications.split(",").map((m, i) => (
                <Text key={i} style={styles.value}>• {m.trim()}</Text>
              ))}
            </View>

            <View style={styles.cardSection}>
              <Text style={styles.label}>Treatment Steps</Text>
              <Text style={styles.value}>{steps}</Text>
            </View>

            {notes ? (
              <View style={styles.cardSection}>
                <Text style={styles.label}>Additional Notes</Text>
                <Text style={styles.value}>{notes}</Text>
              </View>
            ) : null}

            {/* Send to Patient Button */}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#28a745", marginBottom: 10 }]}
              onPress={handleSend}
            >
              <Text style={styles.modalButtonText}>Send to Patient</Text>
            </TouchableOpacity>

            {/* Delete / Back Buttons 50/50 */}
            <View style={styles.dualButtonContainer}>
              <TouchableOpacity
                style={[styles.halfButton, { backgroundColor: "#e74c3c" }]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete Recipe</Text>
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

      {/* Generate Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successText}>
              Medical prescription generated successfully!
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#007bff" }]}
                onPress={handleViewRecipe}
              >
                <Text style={styles.modalButtonText}>View Prescription</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#28a745" }]}
                onPress={() => {
                  setModalVisible(false);
                  setGenerated(true);
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Send Modal */}
      <Modal visible={sendModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successText}>
              Recipe was successfully sent to {patient || "the patient"}!
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#28a745" }]}
              onPress={() => {
                setSendModal(false);
                handleClear();
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal visible={deleteModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successText}>Recipe was successfully deleted!</Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
              onPress={() => {
                setDeleteModal(false);
                handleClear();
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f9", padding: 10 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f3c88",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  label: { fontWeight: "bold", fontSize: 18, color: "#1f3c88" },
  urgencyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  urgencyButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
  },
  urgencyText: { color: "#000000ff", fontWeight: "bold", textAlign: "center" },
  dualButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  halfButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  recipeContainer: { marginTop: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  doctorName: { fontSize: 20, fontWeight: "bold" },
  specialization: { fontSize: 16, color: "#555" },
  date: { fontSize: 16, color: "#777" },
  divider: {
    height: 5,
    borderRadius: 10,
    marginVertical: 15,
  },
  card: { backgroundColor: "#f8f9fa", borderRadius: 15, padding: 20 },
  value: { fontSize: 16, marginTop: 4 },
  actionsContainer: { marginTop: 20, gap: 10 },
  actionButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "80%",
    alignItems: "center",
  },
  successText: { fontSize: 16, fontWeight: "600", marginBottom: 15, textAlign: "center" },
  modalButtons: { flexDirection: "row", gap: 10 },
  modalButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold" },

  // Styles për pjesën e detajuar
  detailsContainer: { flex: 1, 
    backgroundColor: "#eef2f9", 
    paddingTop: 40,
    margin: 0 },
  detailsContent: { paddingHorizontal: 20, paddingBottom: 40 },
  detailsHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 },
  detailsDoctor: { fontSize: 26, fontWeight: "bold", color: "#1f3c88" },
  detailsProfession: { fontSize: 18, color: "#4a4a4a", marginTop: 4 },
  detailsDate: { fontSize: 16, color: "#333", marginTop: 4 },
  separator: { height: 6, borderRadius: 3, marginVertical: 20 },
  cardSection: { backgroundColor: "#fff", borderRadius: 12, padding: 15, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
});
