import React from "react";
import bison from "../bison.png";
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
import { firebaseConfig } from "../firebaseConfig";

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
  return (
    <div className="App">
      <header className="login-header">
        {/* <img src={bison} /> */}
        
        <form className={classes.root} noValidate autoComplete="off">
          <TextField required id="standard-basic" label="Email" />
          <br></br>
          <TextField required id="standard-basic" label="Password" />
        </form>
        
        <div style={{ margin: "10px" }}>
          <Link style={{ textDecoration: "none" }}>
            <Button variant="outlined">LOGIN</Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
export default LoginPage;
