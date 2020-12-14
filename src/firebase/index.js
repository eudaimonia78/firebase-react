import firebase from 'firebase/app';
import 'firebase/storage';

// Inicializar Firebase
var config = {
  apiKey: "AIzaSyCZpAQyExCuENk_2RFAVZ2BLwXCiqj7bMQ",
  authDomain: "react-drawer.firebaseapp.com",
  databaseURL: "https://react-firebase.firebaseio.com",
  projectId: "react-firebase",
  storageBucket: "react-firebase.appspot.com",
  messagingSenderId: "796376704829"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
