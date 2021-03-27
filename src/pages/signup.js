import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles, fade } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import "firebase/auth";
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
  const [signedUp, setSignedUp] = useState(false)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)

  const signUp = e =>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
    .then(userCredential => {
      // Signed in 
      console.log(userCredential)
      setSignedUp(true)
      // var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      setSignedUp(false)
      var errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });
  }

  return (
    <div className="App">
      <header className="login-header">
        {
          signedUp?
            <Redirect to="/profile"/>
          :
          <div>
            <form className={classes.root} noValidate autoComplete="off">
              {/* <TextField required inputRef={firstNameRef} id="standard-basic" label="First Name" />
              <TextField required inputRef={lastNameRef} id="standard-basic" label="Last Name" /> */}

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
          </div>
        }  
      </header>
    </div>
  );
}
export default SignupPage;
