import * as React from "react";
import firebase from "firebase";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import { firebaseConfig } from "../firebaseConfig";
import "../App.css";
import IDtemplate from "../IDtemplate.jpg";
import QRtemplate from "../QRtemplate.jpg";




function IDPage() {
  return (
    <div>
      <header className="App-header">
        <Member name="Name Here"/>
        
      
        <IDCardFront />
      </header>
      
             
    </div>
  
  );
}

function Member(member){
  return (
    <div>
      <header>
        <h1>Hello {member.name}!</h1>
      </header>
             
    </div>
  );
}

function IDCardFront() {
  return (
    <div>
      <header >
        <img src={IDtemplate} className="ID" />
        <img src={QRtemplate} className="ID" />
      </header>
      
             
    </div>
  
  );
}
export default IDPage;
