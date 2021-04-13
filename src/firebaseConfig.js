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
export { auth, db };

export const initUserProfileFirebaseData = (userUID,alum_id,fname, lname,email, password) => {
  db.collection("users").doc(userUID).set({
      alumni_id: alum_id,
      first_name: fname,
      last_name:lname,
      phone_number: '',
      graduated_in: '',
      email: email,
      password: password,
      associated_orgs: [],
  })
  .then(() => {
      console.log("User successfully stored to firebase. Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

    // TODO: grad year being editable is a potential security bug further down the line and should be collected upon signup
export const editUserProfileFirebaseData = (userUID,fname,lname,phone_number,graduated_in,email, password, associated_orgs) => {
    db.collection("users").doc(userUID).update({
        first_name: fname,
        last_name:lname,
        phone_number: phone_number,
        graduated_in: graduated_in, 
        email: email,
        password: password,
        associated_orgs: associated_orgs,
    })
    .then(() => {
        console.log("Profile Edited!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }

export const updateFirebasePhoneNumber = (userUID,phone_num) => {
  db.collection("users").doc(userUID).update({
      phone_number: phone_num,
  })
  .then(() => {
      console.log("Phone number successfully updated!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export const updateFirebaseGraduationDate = (userUID,year) => {
  db.collection("users").doc(userUID).update({
      graduated_in: year,
  })
  .then(() => {
      console.log("Graduation Year successfully updated!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export const addFirebaseAssociatedOrg = (userUID, associatedOrg) => {
  db.collection("users").doc(userUID).update({
      associated_orgs: firebase.firestore.FieldValue.arrayUnion(associatedOrg),
  })
  .then(() => {
      console.log("Associated Org successfully Added!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

export const removeFirebaseAssociatedOrg = (userUID, associatedOrg) => {
  db.collection("users").doc(userUID).update({
      associated_orgs: firebase.firestore.FieldValue.arrayRemove(associatedOrg),
  })
  .then(() => {
      console.log("Associated Org successfully Removed!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}