import * as React from "react";
import profile from "./pages/profile";
import landing from "./pages/landing";
import login from "./pages/login";
import signup from "./pages/signup";
import ID from "./pages/ID";
import UserContextProvider from './UserContext';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Switch>
            <UserContextProvider>
            <Route exact path="/" component={landing} />
            <Route path="/profile" component={profile} />
            <Route path="/login" component={login} />
            <Route path="/signup" component={signup} />
            <Route path="/ID" component={ID} />
            </UserContextProvider>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
