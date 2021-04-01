import React, { useEffect, useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  ScrollView,
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import firebase from '../dataBase/firebase';

const UserDetailScreen = (props) => {

  const initialState = ({
    name: '',
    email: '',
    phone: ''
  });

  const [users, setUsers] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUsers = async(id) => {
    const dbRef = firebase.db.collection('users').doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUsers({
      ...user,
      id: doc.id
    });

    setLoading(false);
  }

  const handleChangeText = (name, value) => {
    setUsers({
      ...users, [name]:value
    });
  }

  const updateUser = async() => {
    const dbRef = firebase.db.collection('users').doc(users.id);
    await dbRef.set({
      name: users.name,
      email: users.email,
      phone: users.phone
    });

    setUsers(initialState);
    props.navigation.navigate('UserList');
  }

  const delateUser = async () => {
    const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate('UserList');
  }

  const confirmationDeleting = () => {
    Alert.alert('Eliminar usuario', 'Desea eliminarlo?', [
      {text: 'Si', onPress: ( () => { delateUser() } )},
      {text: 'No', onPress: ( () => { console.log(false) } )}
    ]);
  }

  useEffect(() => {
    getUsers(props.route.params.userId);
  }, []);

  if(loading) {
    return(
      <View>
        <ActivityIndicator size="large" color="#9e9e9e"/>
      </View>
    )
  }

  return(
    <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput 
              placeholder="Nombre" 
              value={users.name}
              onChangeText={(value) => handleChangeText('name', value)}
            />
        </View>

        <View style={styles.inputGroup}>
            <TextInput 
              placeholder="Email"
              value={users.email}
              onChangeText={(value) => handleChangeText('email', value)}
            />
        </View>

        <View style={styles.inputGroup}>
            <TextInput 
              placeholder="Teléfono"
              value={users.phone}
              onChangeText={(value) => handleChangeText('phone', value)}
            />
        </View>

        <View style={styles.Button}>
            <Button 
              title="Guardar usuario"
              color="#19AC52"
              onPress={() => updateUser() }
            />
        </View>

        <View style={styles.Button}>
            <Button 
              title="Eliminar usuario"
              color="#E37399"
              onPress={() => confirmationDeleting() }
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
  },

  Button:{
    flex: 1,
    margin:3
  }
})

export default UserDetailScreen;