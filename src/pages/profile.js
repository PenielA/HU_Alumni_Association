import React from "react";
import { auth } from "../firebaseConfig";
import Button from "@material-ui/core/Button";
// import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, {useContext, useEffect, useRef} from "react";
import {auth, db, editUserProfileFirebaseData} from "../firebaseConfig";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import {UserContext} from '../UserContext';
import QrCode from '../components/qrcode';
import Avatar from "@material-ui/core/Avatar";
import bison from "../bison.png";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/Phone";

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
    marginLeft: 200,
    "& > *": {
      margin: theme.spacing(8),
    },
    marginTop: 50,
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
  // const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  function signOut() {
    auth.signOut();
    logout();
    console.log("Successful Sign Out");
  }

  function editProfileData(fname,lname,phone_number,graduated_in,email, password, associated_orgs) {
    editUserProfileFirebaseData(auth.currentUser.uid,fname,lname,phone_number,graduated_in,email, password, associated_orgs);
    editUserProfileContextData(fname,lname,phone_number,graduated_in,email, password, associated_orgs);
  }

  function editUserProfileContextData(fname,lname,phone_number,graduated_in,email, password, associated_orgs) {
    setFirstName(fname);
    setLastName(lname);
    setPhoneNumber(phone_number);
    setGradYear(graduated_in);
    setEmail(email);
    setPassword(password);
    setAssociatedOrg(associated_orgs);
  }

  const getNewUserDataFromFirebase = async (userUID) => {
    setNewUser(false);
    
    let docRef = db.collection("users").doc(userUID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        setAlumniID(doc.data().alumni_id);
        setFirstName(doc.data().first_name);
        setLastName(doc.data().last_name);
        setEmail(doc.data().email);
        setPassword(doc.data().password);
        console.log('retrieved from firebase & Context saved');
      } else {
        console.log("There is no data for this user in our database");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  /**
   * this function create the qrcode url that displays the users first and last name.
   * TODO: swap user's names out for a unique Alumni ID
   * @returns url as aa string
   */
   function constructQrCodeUrl(){
    let base_url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=0b3c61&data='
    return base_url + ' @' + alumniID + ' - ' + firstName + ' ' + lastName;
  }

  useEffect(() => {
    if (!newUser){
      getNewUserDataFromFirebase(auth.currentUser.uid);
    }   
  }, []);

  return (
    <div>
      {/* <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        />
        <MenuIcon />
      </Toolbar> */}
      <div className={classes.root1}>
        <Avatar
          alt="Remy Sharp"
          src={bison}
          className={classes.large}
          style={{ height: "90px", width: "90px" }}
        />
        <div>
          <MenuIcon />
          <Button href="#" size="small" className={classes.margin}>
            EDIT
          </Button>
        </div>
        <List component="nav" aria-label="mailbox folders">
          <ListItem button divider>
            <ListItemText primary="Peniel Abebe"></ListItemText>
          </ListItem>
          <ListItem button>
            <EmailOutlinedIcon />
            <ListItemText primary="  peniel.abebe@bison.howard.edu" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <PhoneIcon />
            <ListItemText primary="240-xxx-xxxx" />
          </ListItem>
        </List>
      </div>
      <div>
        <h1>Associated Organizations</h1>
        <Grid container className={classes.root} spacing={2}>
          <Grid container justify="center" spacing={spacing}>
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
    {/* <QrCode qrcode_url={constructQrCodeUrl()}/> */}
    // <Link href="/" onClick={signOut} style={{ textDecoration: "none" }}>
    //   <Button >Sign Out</Button>
    // </Link>
  );
}
export default ProfilePage;
