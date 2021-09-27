import React, { useState } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
import AboutMe from "./components/myProfile/AboutMe";
import SkillsPrefs from "./components/myProfile/SkillsPrefs";
import MatchAvail from "./components/myProfile/MatchAvail";
import PartnerSearchForm from "./components/partnerSearch/PartnerSearchForm";
import PartnerList from "./components/PartnerList";
import NotFound from "./components/NotFound";
import TennisCentralAPI from "./TennisCentralAPI";
import UserContext from "./components/UserContext";

import "./App.css";

const App = () => {
  const storageKey = "userInfo";
  const initialState = JSON.parse(localStorage.getItem(storageKey));
  const [userInfo, setUserInfo] = useState(initialState);

  const updateUserInfo = (userRegInfo) => {
    setUserInfo(userRegInfo);
    localStorage.setItem("userInfo", JSON.stringify(userRegInfo));
  };

  const logoutUser = (e) => {
    setUserInfo(null);
    localStorage.setItem("userInfo", null);
  };

  const registerUser = async (userRegInfo) => {
    let results = await TennisCentralAPI.registerUser(userRegInfo);
    updateUserInfo(results.userinfo);
    return results;
  };

  const loginUser = async (userCredentials) => {
    let results = await TennisCentralAPI.loginUser(userCredentials);
    setUserInfo(results.userinfo);
    localStorage.setItem("userInfo", JSON.stringify(results.userinfo));
    return results;
  };

  const updateUserRecord = async (userRecord, userId, token) => {
    let results = await TennisCentralAPI.updateUserProfile(
      userRecord,
      userId,
      token
    );
    return results;
  };

  return (
    <div className="base">
      <UserContext.Provider value={userInfo}>
        <NavBar userInfo={userInfo} logoutUser={logoutUser} />
        <Switch>
          <Route exact path="/">
            <Home userInfo={userInfo} />
          </Route>
          <Route exact path="/login">
            <Login loginUser={loginUser} />
          </Route>
          <Route exact path="/join">
            <Join registerUser={registerUser} />
          </Route>
          <Route exact path="/AboutMe">
            <AboutMe updateUserRecord={updateUserRecord} />
          </Route>
          <Route exact path="/SkillsPrefs">
            <SkillsPrefs updateUserRecord={updateUserRecord} />
          </Route>
          <Route exact path="/MatchAvail">
            <MatchAvail updateUserRecord={updateUserRecord} />
          </Route>
          <Route exact path="/PartnerList">
            <PartnerList />
          </Route>
          <Route exact path="/Find-A-Partner">
            <PartnerSearchForm />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default App;
