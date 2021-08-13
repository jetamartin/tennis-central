import React, { useContext } from "react";
import "./Home.css";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
  const userInfo = useContext(UserContext);
  console.log(userInfo);
  return (
    <>
      <div className="image-box">
        {/* <Jumbotron> */}
        <div className="text-center lead ">
          <div className="header-spacing">
            <h1 className="green-yellow">Welcome to Tennis-Central</h1>
            <p className="subheader font-weight-light smaller-letters"> A friendly place to connect with other Tennis Players</p>
          </div>

          <p className="text-center value-prop-header green-yellow">
            Tennis-Central provides a convienient way to...
          </p>
          <div className="text-center smaller-letters smaller-letter-spacing">
            <ul className="text-left mb-2 font-weight-light">
              <li className="bullet-margin">Find partners with similar skill levels (NTRP rating)</li>
              <li className="bullet-margin">Find partners whose availability matches yours</li>
              <li className="bullet-margin">Easily contact those players and schedule a match</li>
              <li className="bullet-margin">Add players to and maintain your in app partner list</li>
            </ul>
          </div>
          <p className="top-spacing bottom-spacing green-yellow">And best of all it's <span className="boldIt">FREE</span> to use!!!</p>
          <p className="bottom-spacing">Come join us today and start playing more matches</p>

          <Link to="join">
            <Button className="mr-4" variant="outline-primary">Join</Button>
          </Link>
          <Link to="login">
            <Button className="ml-4" variant="outline-primary">Login</Button>
          </Link>
        </div>

        {/* </Jumbotron> */}
      </div>
      <div></div>
    </>
  );
};
export default Home;
