import React, { useRef, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import "firebase/auth";
import { auth, initUserProfileFirebaseData } from "../firebaseConfig";
import bison from "../images/bison.png";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { UserContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
    backgroundColor: "#395386",
    color: "white",
  },
}));

function SignupPage() {
  const classes = useStyles();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const gradYearRef = useRef(null);
  const [signedUp, setSignedUp] = useState(false);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const {
    setNewUser,
    setAlumniID,
    setFirstName,
    setLastName,
    setEmail,
    setGradYear,
  } = useContext(UserContext);

  const generateID = (length) => {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };

  const storeUser = (
    alum_id,
    first_name,
    last_name,
    email,
    gradYear
  ) => {
    storeUserInContext(
      true,
      alum_id,
      first_name,
      last_name,
      email,
      gradYear
    );
    storeUserInFirebase(
      auth.currentUser.uid,
      alum_id,
      first_name,
      last_name,
      email,
      gradYear
    );
  };

  const storeUserInFirebase = (
    userUID,
    alum_id,
    first_name,
    last_name,
    email,
    gradYear
  ) => {
    initUserProfileFirebaseData(
      userUID,
      alum_id,
      first_name,
      last_name,
      email,
      gradYear
    );
  };

  const storeUserInContext = (
    status,
    alum_id,
    first_name,
    last_name,
    email,
    gradYear
  ) => {
    // Save User data in global context
    setNewUser(status);
    setAlumniID(alum_id);
    setFirstName(first_name);
    setLastName(last_name);
    setEmail(email);
    setGradYear(gradYear);
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredential) => {
        // Signed in
        let alum_id = generateID(8);
        // userCredential.user.uid
        storeUser(
          alum_id,
          firstNameRef.current.value,
          lastNameRef.current.value,
          emailRef.current.value,
          gradYearRef.current.value
        );

        setSignedUp(true);
      })
      .catch((error) => {
        setSignedUp(false);
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {signedUp ? (
        <Redirect to="/profile" />
      ) : (
        <div className={classes.paper}>
          <img src={bison} alt="bison logo" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  inputRef={firstNameRef}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  inputRef={lastNameRef}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  inputRef={emailRef}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  inputRef={passwordRef}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  inputRef={gradYearRef}
                  fullWidth
                  name="year"
                  label="Graduation year"
                  type="year"
                  id="year"
                  autoComplete="year"
                />
              </Grid>
            </Grid>
            <div style={{ marginTop: "15px" }}>
              <Button
                type="submit"
                fullWidth
                onClick={signUp}
                variant="contained"
                color="#395386"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <Link href="./login" variant="body2">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
}
export default SignupPage;
