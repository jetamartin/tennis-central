import React, { useEffect, useContext, useState } from "react";
import "./Home.css";
import UserContext from "./UserContext";
import NotLoggedInHomePage from "./NotLoggedInHomePage";
import LoggedInHomePage from "./LoggedInHomePage";

const Home = () => {
  const userInfo = useContext(UserContext);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (userInfo?.token) {
      setIsLoading(false);
    }
  }, [userInfo]);

  if (isLoading) {
    return <p>Is loading ....</p>;
  }
  return (
    <>{!userInfo?.firstName ? 
    <NotLoggedInHomePage /> 
    : 
    <LoggedInHomePage />}</>
  );
};
export default Home;
