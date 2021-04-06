import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBM3OU5OtHmkwHPWPHCM93En5h9YMnjjjM',
  authDomain: 'finalproject-79343.firebaseapp.com',
  databaseURL: 'https://finalproject-79343-default-rtdb.firebaseio.com/',
  projectId: 'finalproject-79343',
  storageBucket: 'finalproject-79343.appspot.com',
  messagingSenderId: '320997423518',
  appId: '1:320997423518:web:492bf1a65d1b162210be8f',
  measurementId: 'G-QXQ1JX3M1Q',
};

firebase.initializeApp(firebaseConfig);
// console.log(firebase);
const loginDb = firebase.database();

export default loginDb;
