
import React, {useContext, useEffect} from "react";
import {auth, db} from "../firebaseConfig";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import {UserContext} from '../UserContext';


function ProfilePage() {
  const {
    newUser,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    logout,
  } = useContext(UserContext);
  
  function signOut() {
    auth.signOut();
    logout();
    console.log('Successful Sign Out');
  }

  const getUserDataFromFirebase = userUID => {
    let docRef = db.collection("users").doc(userUID);
  
    docRef.get().then((doc) => {
        if (doc.exists) {
          setFirstName(doc.data().first_name);
          setLastName(doc.data().last_name);
          setEmail(doc.data().email);
          setPassword(doc.data().password);
          console.log('retrieved from firebase & Context saved');
        } else {
            // doc.data() will be undefined in this case
            console.log("There is no data for this user in our database");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  useEffect(() => {
    if (!newUser){
      getUserDataFromFirebase(auth.currentUser.uid);
    }
    
  }, [])

  return (
    <div>
      <h1>Profile Page</h1>
      <Link href="/" onClick={signOut} style={{ textDecoration: "none" }}>
        <Button >Sign Out</Button>
      </Link>

    </div>
    );

}
export default ProfilePage;