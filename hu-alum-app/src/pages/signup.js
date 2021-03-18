import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles, fade } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import firebase from "firebase";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import { auth } from "../firebaseConfig";

const useStyles = makeStyles((theme) => ({
  Sbutton: {
    fontSize: 19,
    fontWeight: 800,
    fontFamily: "Roboto",
    height: 55,
    width: 350,
    color: "black",
    borderRadius: 20,
    margin: 5,
    borderColor: fade("#395386", 0.5),
  },
}));

function SignupPage() {
  const classes = useStyles();
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const signUp = e =>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    .then(userCredential => {
      // Signed in 
      console.log(userCredential)
      // var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
      // ..
    });
  }

  return (
    <div className="App">
      <header className="login-header">
        
        <form className={classes.root} noValidate autoComplete="off">
          <TextField required inputRef={emailRef} id="standard-basic" label="Email" />
          <br></br>
          <TextField required inputRef={passwordRef} id="standard-basic" label="Password" />
        </form>
        
        <div style={{ margin: "10px" }}>
          <Link style={{ textDecoration: "none" }}>
            <Button 
              onClick={signUp}
              variant="outlined">
              SIGN UP
            </Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
export default SignupPage;
