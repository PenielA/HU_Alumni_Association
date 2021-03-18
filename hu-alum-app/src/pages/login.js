import react from "react";
import bison from "../bison.png";
import Button from "@material-ui/core/Button";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
        <img src={bison} />
        <Link style={{ textDecoration: "none" }}>
          <Button className={classes.Sbutton} variant="outlined">
            ...
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }}>
          <Button className={classes.Sbutton} variant="outlined">
            ...
          </Button>
        </Link>
        <div>
          <Link style={{ textDecoration: "none" }}>
            <Button variant="outlined">LOGIN</Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
export default LoginPage;