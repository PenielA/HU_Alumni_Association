
import React from "react";
import {auth} from "../firebaseConfig";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";


function ProfilePage() {
  function signOut() {
    auth.signOut();
    console.log('Successful Sign Out');
  }
  return (
    <div>
      <h1>Profile Page</h1>
      <Link href="/" onClick={signOut} style={{ textDecoration: "none" }}>
        <Button >Sign Out</Button>
      </Link>

    </div>
    );

}
export default ProfilePage;