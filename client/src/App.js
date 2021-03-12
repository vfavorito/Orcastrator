import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UserHomepage from "./components/UserHomepage";
import PodDisplay from "./components/PodDisplay";
import Landing from "./components/Landing";
import Login from "./components/Login/login"
import UserContext from "./utils/userContext";
import axios from "axios";

function App() {

  const [userState, setUserState] = useState({
    id: "",
    firstName: "",
    lastName: "",
    portrait: ""
  });
  // let notLoggedIn = true;

  console.log(userState);
  useEffect(() => {
    settingUser();
  }, []);

  const settingUser = () => {
    axios.get("/User")
      .then((res) => {
        if (res.data.id !== undefined) {
          console.log(res);
          setUserState({
            ...userState,
            id: res.data.id,
            firstName: res.data.name.givenName,
            lastName: res.data.name.familyName,
            portrait: res.data.photos[0].value
          })
          console.log("we are in setting user function at app.js");
        }
        else {
          return;
        }})
      .catch(err => console.log(err));
  };

// { notLoggedIn ? <Redirect to="/login" /> : <UserHomepage setUser={settingUser} /> } 

  return (
    <UserContext.Provider value={userState}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/User">
              <UserHomepage setUser={settingUser}/>
            </Route>
            <Route exact path="/Pod/:id">
              <PodDisplay />
            </Route>
            <Route path="*">
              <Landing />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
