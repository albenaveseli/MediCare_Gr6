import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Reminder() {

  const [medicines, setMedicines] = useState([
    {id: '1', name: 'Paracetamol', time: '08:00 AM'},
    {id: '2', name: 'Ibuprofen', time: '02:00 PM'},
  ]);

  const [newMedicineName, setNewMedicineName] = useState('');
  const [newMedicineTime, setNewMedicineTime] = useState('');

  const addMedicine = () => {
    if(!newMedicineName || !newMedicineTime){
      Alert.alert("Please enter both medicine name and time");
      return;
    }

    const newMedicine = {
      id: (medicines.length + 1).toString(),
      name: newMedicineName,
      time: newMedicineTime,
    };

    setMedicines([...medicines, newMedicine]);
    setNewMedicineName('');
    setNewMedicineTime('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text style={styles.medicineTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
      data={medicines}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />

      <TextInput 
      style={styles.input}
      placeholder="Medicine Name"
      value={newMedicineName}
      onChangeText={setNewMedicineName}
      />

      <TextInput 
      style={styles.input}
      placeholder="Time (e.g., 08:00 AM)"
      value={newMedicineTime}
      onChangeText={setNewMedicineTime}
      />

      <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
        <Text style={styles.addButtonText}>Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor:'#000',
    shadowOffset:{width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicineTime: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  addButton:{
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems:'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
