import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { Redirect } from "react-router-dom";
import bison from "../images/bison.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
    backgroundColor: "#395386",
    color: "white",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isInvalid = password === "" || email === "" || password.length < 6;

  const login = (e) => {
    e.preventDefault();

    if (email === "") setEmailError("Must not be empty");
    else setEmailError("");

    if (password === "") {
      setPasswordError("Must not be empty");
    } else if (password.length < 6) {
      //default firebase auth password length is 6.
      //By default, anything less than 6 is incorrect.
      setPasswordError("Incorrect password");
    } else setPasswordError("");

    if (isInvalid) return;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setLoggedIn(true);
        console.log("Welcome back fellow Bison, we love you");
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
        if (err.code === "auth/wrong-password") {
          setPasswordError("Incorrect password");
        } else if (err.code === "auth/user-not-found") {
          alert("This account does not exist");
        }
      });
  };

  function forgotPassword(emailAddress){
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      alert('Password reset email sent');
    }).catch((error) => {
      if (error.code === "auth/invalid-email"){
        alert('Please enter a valid email address');
      } else if(error.code === "auth/user-not-found"){
        alert("This user does not exist in our system");
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      {loggedIn ? (
        <Redirect to="/profile" />
      ) : (
        <div className={classes.paper}>
          <img src={bison} alt="bison logo" />
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={emailError ? true : false}
              helperText={emailError}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              helperText={passwordError}
              error={passwordError ? true : false}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              onClick={login}
              variant="contained"
              color="#395386"
              className={classes.submit}
            >
              LOGIN
            </Button>
            <div style={{ marginBottom: "15px" }}>
              <div>
                <Link href="#" variant="body2" onClick={()=>forgotPassword(email)}>
                  Forgot password?
                </Link>
              </div>
              <Link href="./signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
}
export default LoginPage;
