import React, { useEffect, useState } from "react";
import { useHistory, Switch, BrowserRouter, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Join from "./components/Join";
import AboutMe from "./components/myProfile/AboutMe";
import SkillsPrefs from "./components/myProfile/SkillsPrefs";
import MatchAvail from "./components/myProfile/MatchAvail";
import FindAPartner from "./components/FindAPartner";
import Messages from "./components/Messages";
import Partners from "./components/Partners";
import NotFound from "./components/NotFound";
import TennisCentralAPI from "./TennisCentralAPI";
import isNil from "lodash/isNil";
import UserContext from "./components/UserContext";

import "./App.css";

const App = () => {
  
  // {userInfo: {token: token, userId: userId, username: username}}
  const [userInfo, setUserInfo] = useState({});

  const history = useHistory();

  useEffect(() => {
    const loadFromLocalStorage = () => {
      // Retrieve the object from storage
      const lsUserInfo = localStorage.getItem('userInfo');
      setUserInfo(JSON.parse(lsUserInfo));
      }
    loadFromLocalStorage()
  }, [])

  const updateUserInfo = (userRegInfo) => {
    setUserInfo(userRegInfo);
    localStorage.setItem('userInfo', JSON.stringify(userRegInfo));

  }

  const logoutUser = (e) => {
    console.log("****logoutUser Method***")
    setUserInfo(null);
    localStorage.setItem('userInfo', null);
    
  };

  const registerUser = async (userRegInfo) => {
    let results = await TennisCentralAPI.registerUser(userRegInfo);
    updateUserInfo(results.userinfo);
    // localStorage.setItem('userInfo', JSON.stringify(results.userInfo));
    return results;
   }

  // Edit later
  const loginUser = async (userCredentials) => {
    console.log('App.js loginUser: ', userCredentials)
    let results = await TennisCentralAPI.loginUser(userCredentials)
    setUserInfo(results.userinfo);
    localStorage.setItem('userInfo', JSON.stringify(results.userinfo));
    return results; 
  }

  const updateUserRecord = async (userRecord, userId) => {
    console.log('App.js userRecord: ', userRecord)
    let results = await TennisCentralAPI.updateUserRecord(userRecord, userId)
    return results; 
  }


  return (
    <div className="base">
      <BrowserRouter>
      <UserContext.Provider value={userInfo}>
        <NavBar userInfo={userInfo}  logoutUser={logoutUser} />
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
            <SkillsPrefs />
          </Route>
          <Route exact path="/MatchAvail">
            <MatchAvail updateUserRecord={updateUserRecord} />
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
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
