import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
import AboutMe from "./components/myProfile/AboutMe";
import AboutMeTest from "./components/myProfile/AboutMe";
import SkillsPrefs from "./components/myProfile/SkillsPrefs";
import MatchAvail from "./components/myProfile/MatchAvail";
import FindAPartner from "./components/FindAPartner";
import Messages from "./components/Messages";
import Partners from "./components/Partners";
import NotFound from "./components/NotFound";

import isNil from "lodash/isNil";

import "./App.css";

const App = () => {
  const [token, setToken] = useState("123");
  console.log("App.js isNil? result =", isNil(token));
  const [username, setUsername] = useState("JetM");

  const logoutUser = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <div>
      <BrowserRouter>
        <NavBar token={token} username={username} logoutUser={logoutUser} />
        <Switch>
          <Route exact path="/">
            <Home username={username} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route exact path="/AboutMe">
            <AboutMe />
          </Route>
          <Route exact path="/SkillsPrefs">
            <SkillsPrefs />
          </Route>
          <Route exact path="/MatchAvail">
            <MatchAvail />
          </Route>
          <Route exact path="/Messages">
            <Messages />
          </Route>
          <Route exact path="/Partners">
            <Partners />
          </Route>
          <Route exact path="/Find-A-Partner">
            <FindAPartner />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
