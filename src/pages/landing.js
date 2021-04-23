import React, {useState, useEffect}from "react";
import "firebase/auth";
import bison from "../images/bison.png";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { auth } from "../firebaseConfig";


const useStyles = makeStyles((theme) => ({
  Lbutton: {
    fontSize: 19,
    fontWeight: 800,
    fontFamily: "Roboto",
    height: 55,
    width: 350,
    color: "#FFFFFF",
    backgroundColor: fade("#86A9C2", 0.7),
    "&:hover": {
      backgroundColor: fade("#86A9C2", 0.8),
    },
    borderRadius: 20,
    margin: 5,
  },
  Sbutton: {
    fontSize: 19,
    fontWeight: 800,
    fontFamily: "Roboto",
    height: 55,
    width: 350,
    color: "#FFFFFF",
    borderRadius: 20,
    margin: 5,
    borderColor: "white",
  },
}));

function Landing() {
  const classes = useStyles();
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email
      }
      if (userAuth) {
        console.log(userAuth)
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])
    
  return (
    <div className="App">
      <header className="App-header">
      {
        user?
          <Redirect to="/profile" />
        :
          <div>
             <h1>HOWARD UNIVERSITY ALUMNI</h1>
            <img src={bison} className="App-logo" alt="logo" />

            <Link to={{ pathname: "/ID" }} style={{ textDecoration: "none" }}>
              <Button className={classes.Lbutton}>LOGIN</Button>
            </Link>
            
            <Link to={{ pathname: "/signup" }} style={{ textDecoration: "none" }}>
              <Button className={classes.Sbutton} variant="outlined">
                SIGNUP
              </Button>
            </Link>
          </div>
        }
      </header>
    </div>
  );
}
export default Landing;
