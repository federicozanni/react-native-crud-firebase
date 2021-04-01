import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from './screens/UserList';
import UserDetailScreen from './screens/UserDetailScreen';
import CreateUserScreen from './screens/CreateUserScreen';

const Stack = createStackNavigator()

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{ title: 'Lista de ususarios' }}/> 
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ title: 'Crear nuevo usuario' }}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'información del usuario' }}/>  
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
