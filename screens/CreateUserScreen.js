import React, {useState} from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import firebase from '../dataBase/firebase';

const CreateUserScreen = (props) => {

  const [state, setState] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const handleChangeText = (name, value) => {
    setState({
      ...state, [name]:value
    });
  }

  const AddNewUser = async () => {
    if(
      state.name === '',
      state.email === '',
      state.phone === ''
    ) {
      alert('Campo vacio')
    } else {
      try {
        await firebase.db.collection('users').add({
          name: state.name,
          email: state.email,
          phone: state.phone
        })
        props.navigation.navigate('UserList');
      } catch (error) {
        alert('Hubo un error!!')
      }
    }
  }

  return(
    <ScrollView style={styles.container}>
       <View style={styles.inputGroup}>
            <TextInput 
              placeholder="Nombre" 
              onChangeText={(value) => handleChangeText('name', value)}
            />
        </View>

        <View style={styles.inputGroup}>
            <TextInput 
              placeholder="Email" 
              onChangeText={(value) => handleChangeText('email', value)}
            />
        </View>

        <View style={styles.inputGroup}>
            <TextInput 
              placeholder="Teléfono"
              onChangeText={(value) => handleChangeText('phone', value)}
            />
        </View>

        <View>
            <Button 
              title="Guardar usuario" 
              onPress={() => AddNewUser() }
            />
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:35
  },

  inputGroup:{
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1
  }
})
export default CreateUserScreen;