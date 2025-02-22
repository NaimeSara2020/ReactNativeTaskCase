import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function Update() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1/api/index.php?id=${id}`)
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
        setAge(response.data.age.toString());
      })
      .catch(() => {
        Alert.alert('Hata', 'Öğrenci bilgileri yüklenemedi.');
      });
  }, [id]);

  const handleSubmit = () => {
    axios
      .put('http://127.0.0.1/api/index.php', {
        id,
        name,
        surname,
        age: parseInt(age),
      })
      .then(() => {
        console.warn('Başarılı! Öğrenci güncellendi.');
        Alert.alert('Başarılı!', 'Öğrenci güncellendi.');
       // router.back();
      })
      .catch(() => {
        Alert.alert('Hata', 'Güncelleme başarısız.');
      });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Öğrenciyi Güncelle</Text>
      <TextInput
        placeholder="İsim"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Soyisim"
        value={surname}
        onChangeText={setSurname}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Yaş"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />
      <Button title="Güncelle" onPress={handleSubmit} />
    </View>
  );
}
