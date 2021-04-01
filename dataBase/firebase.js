import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCdZz3-8CPvDpRJbdmIqc7KzJFqZVaG1uk",
  authDomain: "react-native-crud-a7295.firebaseapp.com",
  projectId: "react-native-crud-a7295",
  storageBucket: "react-native-crud-a7295.appspot.com",
  messagingSenderId: "687324077466",
  appId: "1:687324077466:web:a03e5288c8b3814be4ee23"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db
}