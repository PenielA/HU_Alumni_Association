
import React, {useContext, useEffect, useRef} from "react";
import {auth, db, updateGraduationDate, addAssociatedOrg, removeAssociatedOrg} from "../firebaseConfig";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import {UserContext} from '../UserContext';
import QrCode from '../components/qrcode';

function ProfilePage() {
  const {
    newUser,
    alumniID,
    firstName,
    lastName,
    setNewUser,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    logout,
  } = useContext(UserContext);

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  function signOut() {
    auth.signOut();
    logout();
    console.log('Successful Sign Out');
  }

  const getUserDataFromFirebase = async (userUID) => {
    setNewUser(false);
    
    let docRef = db.collection("users").doc(userUID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        setFirstName(doc.data().first_name);
        setLastName(doc.data().last_name);
        setEmail(doc.data().email);
        setPassword(doc.data().password);
        console.log('retrieved from firebase & Context saved');
      } else {
        console.log("There is no data for this user in our database");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  /**
   * this function create the qrcode url that displays the users first and last name.
   * TODO: swap user's names out for a unique Alumni ID
   * @returns url as aa string
   */
   function constructQrCodeUrl(){
    let base_url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=0b3c61&data='
    return base_url + ' @' + alumniID + ' - ' + firstName + ' ' + lastName;
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

      <QrCode qrcode_url={constructQrCodeUrl()}/>

      <p>Look in Chrome console to see logs from firebase functions</p>

      <br></br>

      <Button onClick={() => addAssociatedOrg(auth.currentUser.uid,'JHUAN')}>
      Add JHUAN as associated org
      </Button>

      <br></br>

      <Button onClick={() => removeAssociatedOrg(auth.currentUser.uid,'JHUAN')}>
      Remove JHUAN as associated org
      </Button>

      <br></br>

      <Button onClick={() => updateGraduationDate(auth.currentUser.uid,'2021')}>
      Set Graduation date to 2021
      </Button>

      <br></br>

      <Link href="/" onClick={signOut} style={{ textDecoration: "none" }}>
        <Button >Sign Out</Button>
      </Link>

    </div>
    );

}
export default ProfilePage;