import React, {useContext} from "react";
import "firebase/auth";
import "../App.css";
import Avatar from "@material-ui/core/Avatar";
import {UserContext} from '../UserContext';
import QrCode from "../components/qrcode";
import bison from "../images/bison.png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { fade } from "@material-ui/core/styles/colorManipulator";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    justify: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(6),
    },
  },
  Lbutton: {
    fontSize: 19,
    fontWeight: 800,
    fontFamily: "Roboto",
    height: 55,
    width: 350,
    color: "#FFFFFF",
    backgroundColor: fade("#395386", 0.5),
    "&:hover": {
      backgroundColor: fade("#395386", 0.9),
    },
    borderRadius: 20,
    margin: 5,
  },
  paper: {
    height: 200,
    width: 200,
  },
 
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(40),
  },
  hide: {
    display: "none",
  },
  root1: {
    display: "flex",
    justify: "center",
    marginLeft: 200,
    "& > *": {
      margin: theme.spacing(8),
    },
    marginTop: 50,
  },
}));

function IDPage() {
  const classes = useStyles();
  const {
    alumniID,
    firstName,
    lastName,
  } = useContext(UserContext);

  function IDCardFront() {
    return (
      <div>   
        <QrCode qrcode_url={constructQrCodeUrl()} className="QR"/>      
      </div>   
    );
  }

  function constructQrCodeUrl() {
    let base_url =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=0b3c61&data=";
    return base_url + " @" + alumniID + " - " + firstName + " " + lastName;
  }

  return (
    <div>
      <Avatar
        alt="Remy Sharp"
        src={bison}
        className={classes.large}
        style={{ height: "90px", width: "90px" }}
      />
      <h1>Howard University Alumni Member </h1>

      <div className="centering">
        <IDCardFront align="center" />
      </div>
      <div> </div>

      <h3>
        <Member name="Name Here" />
      </h3>
      <h3>Membership ID: 999999999</h3>

      <div>
        <Link to={{ pathname: "/profile" }} style={{ textDecoration: "none" }}>
          <Button className={classes.Lbutton}>PROFILE</Button>
        </Link>
      </div>
    </div>
  );
}

function Member(member) {
  return <h3>Member Name: {member.name}!</h3>;
}
export default IDPage;
