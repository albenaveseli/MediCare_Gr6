import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

export default function UploadDocuments() {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ],
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (result.canceled) return;
      const pickedFiles = result.assets || [result];
      const newDocs = pickedFiles.map((file) => {
        const name = file.name || "Unnamed file";
        const type = (name.split(".").pop()?.toUpperCase() || "Unknown")
          .replace("APPLICATION/", "")
          .replace("IMAGE/", "");
        return {
          id: Date.now().toString() + Math.random(),
          name,
          type,
          date: new Date().toLocaleDateString(),
        };
      });
      setDocuments((prev) => [...prev, ...newDocs]);
    } catch (error) {
      console.log("Error picking document:", error);
      setModalMessage("There was an error choosing the document.");
      setShowModal(true);
    }
  };

  const handleUpload = () => {
    if (documents.length === 0) {
      setModalMessage("Please choose at least one file before uploading.");
      setShowModal(true);
      return;
    }
    setModalMessage(`${documents.length} document(s) uploaded successfully!`);
    setShowModal(true);
    setDocuments([]);
  };

  return (
    <View style={styles.container}>
     
      <Header
        title="Upload Documents"
      />

      <View style={styles.cardWrapper}>
        <Text style={styles.title}>Upload Medical Documents</Text>

        <TouchableOpacity onPress={handleChooseFile} style={{ width: "80%" }}>
          <LinearGradient
            colors={["#007ea7", "#00cfff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Choose File</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          {documents.length > 0
            ? documents.length === 1
              ? "1 document selected"
              : `${documents.length} documents selected`
            : "No documents selected yet"}
        </Text>

        <View style={styles.listContainer}>
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.docCard}>
                <Text style={styles.docName}>{item.name}</Text>
                <Text style={styles.docDetails}>
                  {item.type} • {item.date}
                </Text>
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          onPress={handleUpload}
          disabled={documents.length === 0}
          style={[
            styles.uploadWrapper,
            { opacity: documents.length === 0 ? 0.6 : 1 },
          ]}
        >
          <LinearGradient
            colors={["#28a745", "#00e676"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f6f8" },
  cardWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#007ea7",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#007ea7",
    textAlign: "center",
  },
  gradientButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  infoText: {
    marginTop: 14,
    color: "#007ea7",
    fontWeight: "500",
    fontSize: 15,
  },
  listContainer: { width: "100%", marginTop: 12, maxHeight: 220 },
  docCard: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  docName: { fontWeight: "600", fontSize: 16, color: "#007ea7" },
  docDetails: { fontSize: 13, color: "#555", marginTop: 2 },
  uploadWrapper: { width: "80%", marginTop: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007ea7",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modalButtonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
