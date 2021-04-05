
import React, {useContext, useEffect, useRef, useState} from "react";
import {auth, db} from "../firebaseConfig";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import {UserContext} from '../UserContext';
import QrCode from '../components/qrcode';

function ProfilePage() {
  const {
    newUser,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    logout,
  } = useContext(UserContext);
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [qrcode, setQRCode] = useState(null);

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
 

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log()
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          style={{
            display: "none"
          }}
        />
        <div
          style={{
            border: "1px dashed black"
          }}
          onClick={() => imageUploader.current.click()}
        >
          <img
            ref={uploadedImage}
            style={{
              width: "50%",
              height: "50%",
              position: "relative"
            }}
          />
        </div>
        Click to upload Image
      </div>
      <QrCode qrcode_url='https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=0b3c61&data=HelloWorld'/>
      <Link href="/" onClick={signOut} style={{ textDecoration: "none" }}>
        <Button >Sign Out</Button>
      </Link>

    </div>
    );

}
export default ProfilePage;