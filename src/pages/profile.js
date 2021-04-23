import React, { useContext, useEffect, useRef } from "react";
import {
  auth,
  db,
  editUserProfileFirebaseData,
  updateFirebasePhoneNumber,
} from "../firebaseConfig";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import { groupLogo } from "../components/groupLogo.js";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import { UserContext } from "../UserContext";
import QrCode from "../components/qrcode";
import Avatar from "@material-ui/core/Avatar";
import bison from "../images/bison.png";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/Phone";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: "10px auto 10px auto",
    marginRight: 10,
    // display: "block",
  },
  root: {
    flexGrow: 1,
    justify: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(6),
    },
  },
  paper: {
    height: 200,
    width: 200,
  },
  // control: {
  //   padding: theme.spacing(50),
  // },
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
    // marginLeft: 200,
    "& > *": {
      margin: theme.spacing(8),
    },
  },
  form: {
    textAlign: "center",
  },
}));

function ProfilePage() {
  const [spacing, setSpacing] = React.useState(8);
  const classes = useStyles();

  const {
    newUser,
    alumniID,
    firstName,
    lastName,
    email,
    phoneNumber,
    associatedOrgs,
    setNewUser,
    setAlumniID,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    setGradYear,
    setAssociatedOrg,
    setPassword,
    logout,
  } = useContext(UserContext);

  function signOut() {
    auth.signOut();
    logout();
    console.log("Successful Sign Out");
  }

  function editProfileData(
    fname,
    lname,
    phone_number,
    graduated_in,
    email,
    password,
    associated_orgs
  ) {
    editUserProfileFirebaseData(
      auth.currentUser.uid,
      fname,
      lname,
      phone_number,
      graduated_in,
      email,
      password,
      associated_orgs
    );
    editUserProfileContextData(
      fname,
      lname,
      phone_number,
      graduated_in,
      email,
      password,
      associated_orgs
    );
  }

  function editUserProfileContextData(
    fname,
    lname,
    phone_number,
    graduated_in,
    email,
    password,
    associated_orgs
  ) {
    setFirstName(fname);
    setLastName(lname);
    setPhoneNumber(phone_number);
    setGradYear(graduated_in);
    setEmail(email);
    setPassword(password);
    setAssociatedOrg(associated_orgs);
  }

  const getUserDataFromFirebase = async (userUID) => {
    setNewUser(false);

    let docRef = db.collection("users").doc(userUID);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setAlumniID(doc.data().alumni_id);
          setFirstName(doc.data().first_name);
          setLastName(doc.data().last_name);
          setEmail(doc.data().email);
          setPassword(doc.data().password);
          setPhoneNumber(doc.data().phone_number);
          setAssociatedOrg(doc.data().associated_orgs);
          setGradYear(doc.data().graduated_in);
          console.log("retrieved from firebase & Context saved");
        } else {
          console.log("There is no data for this user in our database");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  /**
   * this function create the qrcode url that displays the users first and last name.
   * TODO: swap user's names out for a unique Alumni ID
   * @returns url as aa string
   */
  function constructQrCodeUrl() {
    let base_url =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=0b3c61&data=";
    return base_url + " @" + alumniID + " - " + firstName + " " + lastName;
  }

  useEffect(() => {
    if (!newUser) {
      getUserDataFromFirebase(auth.currentUser.uid);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    updateFirebasePhoneNumber(auth.currentUser.uid, phoneNumber);
    alert("Updated phone number");
  }

  return (
    <div>
      <div>
        <center>
          <Avatar
            alt="Remy Sharp"
            src={bison}
            className={classes.large}
            style={{
              height: "160px",
              width: "160px",
              borderRadius: "80px",
              marginBottom: "20px",
            }}
          />
        </center>
        <h1>
          {firstName} {lastName}{" "}
        </h1>
        <h6>@{alumniID}</h6>
      </div>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <Button type="submit" variant="contained" color="#395386" href="./ID">
          MEMBERSHIP ID
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            id="email"
            name="email"
            type="text"
            label="Email"
            disabled
            className={classes.textField}
            style={{ width: 300 }}
            value={email}
          />
          <TextField
            variant="outlined"
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            label="Phone Number"
            placeholder="124-456-7891"
            className={classes.textField}
            style={{ width: 300 }}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <Button type="submit" variant="contained" color="#395386">
            Update{" "}
          </Button>
        </form>
      </div>
      <div>
        <h1>Associated Organizations</h1>
        <Grid container className={classes.root} spacing={2}>
          <Grid container justify="center" spacing={spacing}>
            {groupLogo
              .filter((group) => associatedOrgs.includes(group.abbreviation))
              .map((group, key) => (
                <Grid key={key} item>
                  <Paper className={classes.paper}>
                    <img width="100%" height="100%" src={group.logo} />
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </div>

      <Link href="/" onClick={signOut} style={{ textDecoration: "none" }}>
        <Button>Sign Out</Button>
      </Link>
    </div>
    /* <QrCode qrcode_url={constructQrCodeUrl()}/> */
  );
}
export default ProfilePage;
