import React, { useEffect, useState } from 'react';
import { Modal, View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import axios from 'axios';

export default function Index() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1/api/index.php')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Hata:', error);
        setLoading(false);
      });
  }, []);

  const deleteStudent = (id) => {
    axios
      .delete('http://127.0.0.1/api/index.php', {
        data: { id },
      })
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
        setModalVisible(false);
      })
      .catch((error) => {
        console.error('Silme hatası:', error);
        setModalVisible(false);
      });
  };

  const showDeleteModal = (id) => {
    setStudentIdToDelete(id);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Öğrenci Listesi</Text>
      
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text style={styles.studentName}>{item.name}</Text>
            <Text style={styles.studentEmail}>{item.email}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => showDeleteModal(item.id)}
              >
                <Ionicons name="trash-bin" size={24} color="white" />
              </TouchableOpacity>
              <Link href={`/update/${item.id}`}>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome name="pencil" size={24} color="white" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        )}
      />
    
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Silmekten emin misiniz?</Text>
            <Button title="Evet" onPress={() => deleteStudent(studentIdToDelete)} />
            <Button title="Hayır" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      
      <Link href="/create">
        <Text style={styles.createText}>Yeni Öğrenci Ekle</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  studentItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    elevation: 2,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentEmail: {
    fontSize: 16,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
});
