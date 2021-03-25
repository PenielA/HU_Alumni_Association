import React, {useRef, useState} from "react";
import bison from "../bison.png";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { makeStyles, fade } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import firebase from "firebase";
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

function LoginPage() {
  const classes = useStyles();
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [loggedIn, setLoggedIn] = useState(false)

  function signOut() {
    auth.signOut();
  }

  const login = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
    ).then(user => {
        console.log(user)
        setLoggedIn(true)
        console.log('Welcome back fellow Bison, we love you')
    }).catch(err => {
        setLoggedIn(false)
        console.log(err)
        if (err.code == 'auth/wrong-password'){
          console.log('Your password is wrong')
        }else if(err.code == 'auth/user-not-found'){
          console.log('This account does not exist')
        }
        
    })
  }

  return (
    <div className="App">
      <header className="login-header">
        {/* <img src={bison} /> */}
        {loggedIn?
          <Redirect to="/profile"/>
        :
          <div>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField required inputRef={emailRef} id="standard-basic" label="Email" />
              <br></br>
              <TextField required inputRef={passwordRef} id="standard-basic" label="Password" />
            </form>
            
            <div style={{ margin: "10px" }}>
              <Button 
              onClick={login}
              variant="outlined">LOGIN</Button>
            </div>
          </div>
        }
        
        
      </header>
    </div>
  );
}
export default LoginPage;
