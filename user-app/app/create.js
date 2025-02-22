import React, { useState } from 'react';  
import { View, Text, TextInput, Button, Alert } from 'react-native';  
import { useRouter } from 'expo-router';  
import axios from 'axios';  

export default function Create() {  
  const [name, setName] = useState('');  
  const [surname, setSurname] = useState('');  
  const [age, setAge] = useState('');  
  const router = useRouter();  

  const handleSubmit = async () => { 
 
    if (!name || !surname || !age) {  
      Alert.alert('Hata!', 'Tüm alanlar doldurulmalıdır.');  
      return;  
    }  
   
    try {  
      const response = await axios.post('http://127.0.0.1/api/index.php', {  
        name,  
        surname,  
        age,  
      });  
      if (response.data.message) {  
        Alert.alert('Başarılı!', 'Öğrenci eklendi.');  
        router.back();  
      }  
    } catch (error) {  
      console.error(error);  
      Alert.alert('Hata!', 'Öğrenci eklenirken bir hata oluştu.');  
    }  
  };  

  return (  
    <View style={{ flex: 1, padding: 20 }}>  
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Yeni Öğrenci Ekle</Text>  
      
      <TextInput  
        placeholder="Öğrenci Adı"  
        value={name}  
        onChangeText={setName}  
        style={{  
          borderWidth: 1,  
          borderColor: '#ccc',  
          padding: 10,  
          marginBottom: 20,  
        }}  
      />  

      <TextInput  
        placeholder="Soyisim"  
        value={surname}  
        onChangeText={setSurname}  
        style={{  
          borderWidth: 1,  
          borderColor: '#ccc',  
          padding: 10,  
          marginBottom: 20,  
        }}  
      />  

      <TextInput  
        placeholder="Yaş"  
        value={age}  
        onChangeText={setAge}  
        keyboardType="numeric"  
        style={{  
          borderWidth: 1,  
          borderColor: '#ccc',  
          padding: 10,  
          marginBottom: 20,  
        }}  
      />  

      <Button title="Kaydet" onPress={handleSubmit} />  
    </View>  
  );  
}  