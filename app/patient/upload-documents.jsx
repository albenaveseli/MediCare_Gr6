import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UploadDocuments() {
  const [documents, setDocuments] = useState([]);

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        const newDocument = {
          id: Date.now().toString(),
          name: result.name,
          type: result.mimeType || result.name.split(".").pop(),
          date: new Date().toLocaleDateString(),
        };
        setDocuments((prev) => [...prev, newDocument]);
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  const handleUpload = () => {
    if (documents.length === 0) {
      Alert.alert("No documents selected", "Please choose at least one file before uploading.");
      return;
    }
    Alert.alert("Success", "Your documents have been successfully uploaded!");
    setDocuments([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.title}>Upload Medical Documents</Text>

        <TouchableOpacity style={styles.button} onPress={handleChooseFile}>
          <Text style={styles.buttonText}>Choose File</Text>
        </TouchableOpacity>

        {documents.length > 0 && (
          <>
            <FlatList
              style={{ marginTop: 15, width: "100%" }}
              data={documents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.docName}>{item.name}</Text>
                  <Text style={styles.docType}>Type: {item.type}</Text>
                  <Text style={styles.docDate}>Date: {item.date}</Text>
                </View>
              )}
            />

            <TouchableOpacity
              style={[styles.button, { marginTop: 20, backgroundColor: "#28a745" }]}
              onPress={handleUpload}
            >
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 },
  centerContent: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 15, 
    textAlign: "center" },
  button: { 
    backgroundColor: "#007bff", 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center", 
    width: "80%" },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold" },
  card: { 
    backgroundColor: "#f5f5f5",
    borderRadius: 10, 
    padding: 12, 
    marginVertical: 5, 
    width: "100%" },
  docName: { 
    fontWeight: "600", 
    fontSize: 16 },
  docType: { 
    fontSize: 14, 
    color: "#555", 
    marginTop: 2 },
  docDate: { 
    fontSize: 13, 
    color: "#555", 
    marginTop: 2 },
});