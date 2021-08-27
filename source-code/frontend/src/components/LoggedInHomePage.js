import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
  const [isLoading, setIsLoading ] = useState(true)

  useEffect (() => {
    if (userInfo?.token) {
      setIsLoading(false);
    }

  }, []);

  const userInfo = useContext(UserContext);

  return (
    <>
      <div className="image-box">
        <div className="text-center lead ">
          <div className="header-spacing">
            <h1 className="green-yellow">
              {userInfo.firstName}, welcome back to Tennis-Central!{" "}
            </h1>
            <p className="subheader font-weight-light smaller-letters">
              {" "}
              A friendly place to find and connect with other Tennis Players
            </p>
          </div>

          <p className="text-center value-prop-header green-yellow">
            Tennis-Central provides a convienient way to...
          </p>
          <div className="text-center smaller-letters smaller-letter-spacing">
            <ul className="no-bullets text-center mb-2 font-weight-light">
              <li className="bullet-item-margin">
                Find partners with similar skill levels (NTRP rating)
              </li>
              <li className="bullet-item-margin">
                Find partners whose availability matches yours
              </li>
              <li className="bullet-item-margin">
                Easily contact those players and schedule a match
              </li>
              <li className="bullet-item-margin">
                Add players to and maintain your in app partner list
              </li>
            </ul>
          </div>
          <p className="top-spacing bottom-spacing green-yellow">
            And best of all it's <span className="boldIt">FREE</span> to use!!!
          </p>
        </div>
      </div>
      <div></div>
    </>
  );
};
export default Home;
