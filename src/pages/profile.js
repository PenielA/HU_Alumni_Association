import React from "react";
import { auth } from "../firebaseConfig";
import Button from "@material-ui/core/Button";
// import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
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
  // const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  function signOut() {
    auth.signOut();
    console.log("Successful Sign Out");
  }
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
            <ListItemText primary="Peniel Abebe" />
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
    // <Link href="/" onClick={signOut} style={{ textDecoration: "none" }}>
    //   <Button >Sign Out</Button>
    // </Link>
  );
}
export default ProfilePage;
