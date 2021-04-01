import React, { useState, useEffect } from 'react';
import { ScrollView, Button, StyleSheet } from 'react-native';
import firebase from '../dataBase/firebase';
import { ListItem, Avatar, Header } from 'react-native-elements';

const UserList = (props) => {

  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    firebase.db.collection('users').onSnapshot(querySnapshot => {
      const users = []

        querySnapshot.docs.forEach(doc => {
          const {name, email, phone} = doc.data()
          users.push({
            id: doc.id,
            name,
            email,
            phone
          })
        });
        setUsers(users);
    })
  }, []);

  return(
    <ScrollView>
        <Button 
          title='Crear usuario' 
          onPress={() => props.navigation.navigate('CreateUserScreen')}
        />
        {users.map((user) => {
          return(
            <ListItem key={user.id} bottomDivider onPress={() => {
              props.navigation.navigate('UserDetailScreen', {
                userId: user.id
              })
            }}>
                <Avatar
                  rounded
                  source={ require('../assets/avatar-icon.png') }
                />
              <ListItem.Content>
                  <ListItem.Title>{user.name}</ListItem.Title>
                  <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })}

    </ScrollView>
  )
}

export default UserList;