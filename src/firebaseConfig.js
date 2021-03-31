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

export const getUserData = userUID => {
  var docRef = db.collection("users").doc(userUID);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("There is no data for this user in our database");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}

export const setUserData = (userUID,fname, lname,email, phone_number, password) => {
  db.collection("users").doc(userUID).set({
      first_name: fname,
      last_name:lname,
      email: email,
      phone_number: phone_number,
      password: password,
  })
  .then(() => {
      console.log("User successfully stored to firebase. Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}