import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UploadDocuments() {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*", // çdo lloj fotoje (jpg, png, heic, etj)
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ],
        copyToCacheDirectory: true,
        multiple: true, // lejon zgjedhjen e disa file-ve njeheresh 
      });

      if (result.canceled) return;

      // Ruaj listën e file-ve nga assets ose nga vetë rezultati (varet nga platforma)
      const pickedFiles = result.assets || [result];
      const newDocs = pickedFiles.map((file) => {
        const name = file.name || "Unnamed file";
        const type =
          (name.split(".").pop()?.toUpperCase() ||
            "Unknown").replace("APPLICATION/", "").replace("IMAGE/", "");

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
      Alert.alert("Error", "There was an error choosing the document.");
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
    setDocuments([]); // Clear list after upload
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <Text style={styles.title}>Upload Medical Documents</Text>

        {/* Choose File Button */}
        <TouchableOpacity onPress={handleChooseFile} style={{ width: "80%" }}>
          <LinearGradient
            colors={["#007bff", "#00c6ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Choose File</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Info Text */}
        <Text style={styles.infoText}>
          {documents.length > 0
            ? documents.length === 1
              ? "1 document selected"
              : `${documents.length} documents selected`
            : "No documents selected yet"}
        </Text>

        {/* File List */}
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

        {/* Upload Button */}
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
        animationType="fade"
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
  container: {
    flex: 1,
    backgroundColor: "#f2f7ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardWrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1a237e",
    textAlign: "center",
  },
  gradientButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoText: {
    marginTop: 12,
    color: "#0066cc",
    fontWeight: "500",
    fontSize: 15,
  },
  listContainer: {
    width: "100%",
    marginTop: 10,
    maxHeight: 220,
  },
  docCard: {
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  docName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#0d47a1",
  },
  docDetails: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  uploadWrapper: {
    width: "80%",
    marginTop: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 14,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});