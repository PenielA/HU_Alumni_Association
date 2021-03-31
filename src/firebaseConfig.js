import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyATIGkvru36xGPUMwQlsK0LkC4gsNOfmAc",
  authDomain: "hu-alum.firebaseapp.com",
  databaseURL: "https://hu-alum-default-rtdb.firebaseio.com",
  projectId: "hu-alum",
  storageBucket: "hu-alum.appspot.com",
  messagingSenderId: "670710270259",
  appId: "1:670710270259:web:5e5fb4fb63f255bc8c1646",
  measurementId: "G-HGGWNS3R00"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;