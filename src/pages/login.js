import React, {useRef, useState} from "react";
import bison from "../bison.png";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import "firebase/auth";
import { auth } from "../firebaseConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#395386",
    color: "white",
  },
}));

function LoginPage() {
  const classes = useStyles();

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const login = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
    ).then(user => {
        setLoggedIn(true)
        console.log('Welcome back fellow Bison, we love you')
    }).catch(err => {
        setLoggedIn(false)
        console.log(err)
        if (err.code === 'auth/wrong-password'){
          console.log('Your password is wrong')
        }else if(err.code === 'auth/user-not-found'){
          console.log('This account does not exist')
        }
        
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      {
        loggedIn?
          <Redirect to="/profile"/>
        :
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
              inputRef={emailRef}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              inputRef={passwordRef}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
            <div margin="50000px">
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="./signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      }
    </Container>
  );
}
export default LoginPage;
